import React, { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  PerspectiveCamera,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./CanvasLoader";
import { Model } from "./Model";
import HeroCamera from "./HeroCamera";
import { SceneConfig } from "../scripts/SceneConfig";
import { Lights } from "../scripts/Lights";
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
  const [dpr, setDpr] = useState(1.5); // DPR inicial
  const [quality, setQuality] = useState("high"); // Control de calidad gráfica

  const handleIncline = () => {
    setDpr(2); // Aumentar resolución
    setQuality("ultra"); // Ajustar calidad
  };

  const handleDecline = () => {
    setDpr(1); // Reducir resolución
    setQuality("low"); // Ajustar calidad
  };

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: quality !== "low", alpha: true }}
      // style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      // camera={{
      //   position: [0, 0, 30],
      //   fov: 75,
      // }}
      className="w-full h-full"
    >
      <SceneConfig setDpr={setDpr} setQuality={setQuality} />

      <Suspense fallback={<CanvasLoader />}>
        <WebGLRendererConfig />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />

        <Lights />
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
