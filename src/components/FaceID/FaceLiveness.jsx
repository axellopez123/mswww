import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const FaceLiveness = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  // Carga los modelos necesarios
  async function loadModels() {
    const MODEL_URL = "/models"; // Asegúrate que están en /public/models
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
  }

  // Inicia la cámara
  async function startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accediendo a la cámara:", err);
    }
  }

  // Detecta si el ojo está cerrado
  function isEyeClosed(eye) {
    const vertical1 = faceapi.euclideanDistance(eye[1], eye[5]);
    const vertical2 = faceapi.euclideanDistance(eye[2], eye[4]);
    const horizontal = faceapi.euclideanDistance(eye[0], eye[3]);
    const ear = (vertical1 + vertical2) / (2.0 * horizontal);
    return ear < 0.28; // Ajuste para que detecte mejor el cierre
  }

  useEffect(() => {
    let blinkDetected = false;
    let blinkStart = null;
    let interval;

    loadModels().then(() => {
      startVideo();

      videoRef.current.addEventListener("play", () => {
        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        canvasRef.current = canvas;
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        videoRef.current.parentNode.appendChild(canvas);

        interval = setInterval(async () => {
          const video = videoRef.current;
          if (!video || video.paused || video.ended) return;

          const result = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();

          if (result) {
            const dims = faceapi.matchDimensions(canvas, video, true);
            const resized = faceapi.resizeResults(result, dims);
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resized);
            faceapi.draw.drawFaceLandmarks(canvas, resized);

            const landmarks = result.landmarks;
            const leftEye = landmarks.getLeftEye();
            const rightEye = landmarks.getRightEye();

            const leftClosed = isEyeClosed(leftEye);
            const rightClosed = isEyeClosed(rightEye);

            if (leftClosed && rightClosed) {
              if (!blinkDetected) {
                blinkDetected = true;
                blinkStart = Date.now();
              } else if (Date.now() - blinkStart > 150) {
                setIsBlinking(true);

                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = video.videoWidth;
                tempCanvas.height = video.videoHeight;
                const ctx = tempCanvas.getContext("2d");
                ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
                const dataUrl = tempCanvas.toDataURL("image/jpeg");
                setCapturedImage(dataUrl);
                if (onCapture) onCapture(dataUrl);

                clearInterval(interval); // Ya capturamos
              }
            } else {
              blinkDetected = false;
              setIsBlinking(false);
            }
          }
        }, 300);
      });
    });

    return () => clearInterval(interval);
  }, [onCapture]);

  return (
    <div style={{ position: "relative", width: 480, height: 360, margin: "auto" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="480"
        height="360"
        style={{ border: "1px solid black" }}
      />
      <div style={{ marginTop: 10 }}>
        {isBlinking ? (
          <p style={{ color: "green" }}>✅ Parpadeo detectado. Imagen capturada.</p>
        ) : (
          <p>👁 Por favor parpadea para verificar que estás presente.</p>
        )}
        {capturedImage && (
          <>
            <h4>Imagen capturada:</h4>
            <img src={capturedImage} alt="captura" width="320" />
          </>
        )}
      </div>
    </div>
  );
};

export default FaceLiveness;
