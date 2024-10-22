// src/components/ParticlesBackground.jsx
import React, { useEffect } from 'react';
import CanvasParticles from 'canvas-particles'; // Si instalaste con npm

const ParticlesBackground = () => {
  useEffect(() => {
    const options = {
      maxParticles: 100,
      size: 2,
      speed: 1,
      color: '#ffffff',
      background: '#000000', // Cambia el color de fondo según tu preferencia
    };

    // Inicializar CanvasParticles
    const canvasParticles = new CanvasParticles('#particles-canvas', options);
    canvasParticles.start();

    // Cleanup function to stop particles when component unmounts
    return () => {
      canvasParticles.stop();
    };
  }, []);

  return (
    <canvas
      id="particles-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default ParticlesBackground;
