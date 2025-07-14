// src/components/FaceLivenessMesh.jsx
import React, { useEffect, useRef, useState } from "react";
import * as mpFaceMesh from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

export default function FaceLivenessMesh ({ onCapture }) {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);
  const blinkState = useRef("open");
  const lastBlinkTime = useRef(0);

  const EAR = (eye) => {
    const vertical1 = Math.hypot(eye[1].x - eye[5].x, eye[1].y - eye[5].y);
    const vertical2 = Math.hypot(eye[2].x - eye[4].x, eye[2].y - eye[4].y);
    const horizontal = Math.hypot(eye[0].x - eye[3].x, eye[0].y - eye[3].y);
    return (vertical1 + vertical2) / (2.0 * horizontal);
  };

  useEffect(() => {
    let camera = null;

    const onResults = (results) => {
      if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
        setIsBlinking(false);
        blinkState.current = "open";
        return;
      }

      const landmarks = results.multiFaceLandmarks[0];

      const leftEye = [362, 385, 387, 263, 373, 380].map((i) => landmarks[i]);
      const rightEye = [33, 160, 158, 133, 153, 144].map((i) => landmarks[i]);

      const leftEAR = EAR(leftEye);
      const rightEAR = EAR(rightEye);
      const isClosed = leftEAR < 0.25 && rightEAR < 0.25;

      if (blinkState.current === "open" && isClosed) {
        blinkState.current = "closed";
        setIsBlinking(true);
      } else if (blinkState.current === "closed" && !isClosed) {
        blinkState.current = "blinked";

        if (Date.now() - lastBlinkTime.current > 1000) {
          lastBlinkTime.current = Date.now();
          setBlinkCount((count) => count + 1);

          const video = videoRef.current;
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg");

          setCapturedImage(dataUrl);
          if (onCapture) onCapture(dataUrl);

          if (camera) camera.stop();
        }
      } else if (blinkState.current === "blinked" && !isClosed) {
        blinkState.current = "open";
        setIsBlinking(false);
      }
    };

    const init = async () => {
      const faceMesh = new mpFaceMesh.FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults(onResults);

      const videoElement = videoRef.current;

      camera = new Camera(videoElement, {
        onFrame: async () => {
          await faceMesh.send({ image: videoElement });
        },
        width: 480,
        height: 360,
      });

      camera.start();
    };

    init();

    return () => {
      if (camera) camera.stop();
    };
  }, [onCapture]);

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <video ref={videoRef} autoPlay muted playsInline style={{ border: "1px solid black", width: 480, height: 360 }} />
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

