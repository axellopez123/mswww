import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const FaceLivenessMP = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);
  const faceLandmarkerRef = useRef(null);
  const lastBlinkTime = useRef(0);
  const blinkState = useRef("open");

  const calculateEAR = (eye) => {
    const vertical1 = Math.hypot(eye[1].x - eye[5].x, eye[1].y - eye[5].y);
    const vertical2 = Math.hypot(eye[2].x - eye[4].x, eye[2].y - eye[4].y);
    const horizontal = Math.hypot(eye[0].x - eye[3].x, eye[0].y - eye[3].y);
    return (vertical1 + vertical2) / (2.0 * horizontal);
  };

  useEffect(() => {
    let stream = null;
    let animationFrameId = null;
    let isMounted = true;

    const processVideo = async () => {
      if (!faceLandmarkerRef.current || !isMounted) return;

      const video = videoRef.current;
      if (!video || video.paused || video.ended) {
        animationFrameId = requestAnimationFrame(processVideo);
        return;
      }

      try {
        const detections = await faceLandmarkerRef.current.detectForVideo(
          video,
          performance.now()
        );

        if (!detections || !detections.faceLandmarks || detections.faceLandmarks.length === 0) {
          setIsBlinking(false);
          blinkState.current = "open";
        } else {
          const landmarks = detections.faceLandmarks[0];

          const leftEye = [
            landmarks[362],
            landmarks[385],
            landmarks[387],
            landmarks[263],
            landmarks[373],
            landmarks[380],
          ];
          const rightEye = [
            landmarks[33],
            landmarks[160],
            landmarks[158],
            landmarks[133],
            landmarks[153],
            landmarks[144],
          ];

          const leftEAR = calculateEAR(leftEye);
          const rightEAR = calculateEAR(rightEye);
          const EAR_THRESHOLD = 0.25;
          const isClosed = leftEAR < EAR_THRESHOLD && rightEAR < EAR_THRESHOLD;

          if (blinkState.current === "open" && isClosed) {
            console.log("👁️ Ojos cerrados detectados");
            blinkState.current = "closed";
            setIsBlinking(true);
          } else if (blinkState.current === "closed" && !isClosed) {
            console.log("✅ Parpadeo completado");
            blinkState.current = "blinked";

            if (Date.now() - lastBlinkTime.current > 1000) {
              lastBlinkTime.current = Date.now();

              setBlinkCount((count) => count + 1);

              // Captura la imagen
              const canvas = document.createElement("canvas");
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL("image/jpeg");

              setCapturedImage(dataUrl);
              if (onCapture) onCapture(dataUrl);

              // Detener cámara y ciclo
              stream.getTracks().forEach((track) => track.stop());
              isMounted = false;
              return;
            }
          } else if (blinkState.current === "blinked" && !isClosed) {
            blinkState.current = "open";
            setIsBlinking(false);
          }
        }
      } catch (error) {
        console.error("Error en detectForVideo:", error);
      }

      animationFrameId = requestAnimationFrame(processVideo);
    };

    const setup = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: false,
          numFaces: 1,
        });

        faceLandmarkerRef.current = faceLandmarker;

        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 480, height: 360 },
        });

        const video = videoRef.current;
        video.srcObject = stream;

        await new Promise((resolve) => {
          video.onloadedmetadata = () => resolve();
        });

        if (!isMounted) return;

        await video.play();

        animationFrameId = requestAnimationFrame(processVideo);
      } catch (error) {
        console.error("Error en setup:", error);
      }
    };

    setup();

    return () => {
      isMounted = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [onCapture]);

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="480"
        height="360"
        style={{ border: "1px solid black" }}
      />
      <div>
        {isBlinking ? (
          <p>✅ Parpadeo detectado, imagen capturada</p>
        ) : (
          <p>👁️ Parpadea para verificar que estás vivo</p>
        )}
      </div>
      <p>Parpadeos detectados: {blinkCount}</p>
      {capturedImage && (
        <>
          <h3>Imagen capturada:</h3>
          <img src={capturedImage} alt="captura" width="320" />
        </>
      )}
    </div>
  );
};

export default FaceLivenessMP;
