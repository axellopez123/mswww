// ParallaxScene.js
import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

const ParallaxScene = () => {
  return (
    <ParallaxProvider>
      <div className="relative h-screen overflow-hidden flex items-center justify-center bg-blue-300">
        {/* Logo grande con parallax hacia arriba */}
        <Parallax speed={-20}>
          <img src="/path/to/logo.svg" alt="Logo" className="absolute w-48 z-30" />
        </Parallax>

        {/* Montañas al frente */}
        <Parallax speed={10}>
          <svg
            className="absolute bottom-0 w-full h-auto z-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 50"
          >
            {/* SVG de montaña frontal */}
            <path d="M0,30 L30,10 L60,30 L100,10 V50 H0 Z" fill="#8B5E3C" />
          </svg>
        </Parallax>

        {/* Montañas de fondo */}
        <Parallax speed={5}>
          <svg
            className="absolute bottom-0 w-full h-auto z-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 50"
          >
            {/* SVG de montaña de fondo */}
            <path d="M0,40 L25,20 L50,40 L75,20 L100,40 V50 H0 Z" fill="#C8A165" />
          </svg>
        </Parallax>
      </div>
    </ParallaxProvider>
  );
};

export default ParallaxScene;
