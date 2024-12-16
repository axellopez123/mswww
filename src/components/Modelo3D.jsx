import React, { useRef, useEffect, useMemo, Suspense } from "react";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./CanvasLoader";
import { Model } from "./Model";
import HeroCamera from "./HeroCamera";

const WebGLRendererConfig = () => {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio || 1); // Mejor rendimiento en dispositivos de baja resolución
    gl.setSize(size.width, size.height); 
    gl.setClearColor(0xffaaff, 0); // Fondo transparente con color personalizado
    gl.outputEncoding = THREE.SRGBColorSpace; // Mejor precisión en colores
    gl.toneMapping = THREE.ACESFilmicToneMapping; // Configuración para tonos de alto rango dinámico

    return () => {
      gl.dispose(); // Limpieza del renderer al desmontar el componente
    };
  }, [gl, size]);

  return null;
};


const Modelo3D = ({ modelo }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.style.width = "100%";
        canvasRef.current.style.height = "100%";
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }} // Antialias activado para bordes suaves
      // style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      // camera={{
      //   position: [0, 0, 30],
      //   fov: 75,
      // }}
      className="w-full h-full"
    >
      <Suspense fallback={<CanvasLoader />}>
      <WebGLRendererConfig/>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <HeroCamera>
          <Model
            url={modelo.url}
            scales={modelo.scales}
            rotation={modelo.rotation}
            position={modelo.position}
            color={modelo.color}
          />
        </HeroCamera>
      </Suspense>
    </Canvas>
  );
};



export default Modelo3D;
