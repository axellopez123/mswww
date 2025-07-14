import React, { useRef, useEffect, useState } from 'react';
import {
  FaceLandmarker,
  FilesetResolver,
  DrawingUtils
} from '@mediapipe/tasks-vision';

const EAR_THRESHOLD = 0.2;

const FaceLandmarkerApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [blinkCounter, setBlinkCounter] = useState(0);
  const blinkedRef = useRef(false);

  // Eye landmarks (MediaPipe indices)
  const LEFT_EYE_INDEXES = [33, 160, 158, 133, 153, 144];
  const RIGHT_EYE_INDEXES = [362, 385, 387, 263, 373, 380];

  const distance = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  };

  const eyeAspectRatio = (eye) => {
    const A = distance(eye[1], eye[5]);
    const B = distance(eye[2], eye[4]);
    const C = distance(eye[0], eye[3]);
    return (A + B) / (2.0 * C);
  };

  const safeGetPoints = (landmarks, indexes) => {
    return indexes.map(i => landmarks[i]).filter(p => p && typeof p.x === 'number' && typeof p.y === 'number');
  };

  useEffect(() => {
    const initialize = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      const landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/models/face_landmarker.task'
        },
        runningMode: 'VIDEO',
        outputFaceBlendshapes: true
      });

      setFaceLandmarker(landmarker);
    };

    initialize();
  }, []);

  useEffect(() => {
    if (!faceLandmarker) return;

    const drawLoop = async () => {
      if (
        videoRef.current &&
        canvasRef.current &&
        videoRef.current.readyState === 4
      ) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const results = await faceLandmarker.detectForVideo(video, performance.now());

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const drawingUtils = new DrawingUtils(ctx);

        if (results.faceLandmarks) {
          for (const landmarks of results.faceLandmarks) {
            // Dibujo
            drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, {
              color: '#C0C0C070',
              lineWidth: 1
            });
            drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, {
              color: '#FF3030'
            });
            drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, {
              color: '#30FF30'
            });

            // Parpadeo
            const leftEye = safeGetPoints(landmarks, LEFT_EYE_INDEXES);
            const rightEye = safeGetPoints(landmarks, RIGHT_EYE_INDEXES);

            if (leftEye.length === 6 && rightEye.length === 6) {
              const leftEAR = eyeAspectRatio(leftEye);
              const rightEAR = eyeAspectRatio(rightEye);
              const ear = (leftEAR + rightEAR) / 2;

              if (ear < EAR_THRESHOLD && !blinkedRef.current) {
                blinkedRef.current = true;
                setBlinkCounter(prev => prev + 1);
                console.log('¡Parpadeo detectado!');
              } else if (ear >= EAR_THRESHOLD) {
                blinkedRef.current = false;
              }
            }
          }
        }
      }

      requestAnimationFrame(drawLoop);
    };

    drawLoop();
  }, [faceLandmarker]);

  useEffect(() => {
    let stream;

    const initCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current && videoRef.current.srcObject !== stream) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error('Error al acceder a la cámara:', err);
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} style={{ width: '100%' }} playsInline muted />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: '#fff',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '18px'
      }}>
        Parpadeos: {blinkCounter}
      </div>
    </div>
  );
};

export default FaceLandmarkerApp;


//<div>
//      <h1>Face Landmarker</h1>
//      <FaceLandmarkerApp />
//    </div>