import React, { useRef, useEffect, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./CanvasLoader";
import { Model } from "./Model";
import HeroCamera from "./HeroCamera";

const Modelo3D = ({  modelo }) => {
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
      // ref={canvasRef}
      // dpr={[1, 2]}
      // style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      // camera={{
      //   position: [0, 0, 30],
      //   fov: 75,
      // }}
      className="absolute top-0 left-0 w-full h-full"
    >
      <Suspense fallback={CanvasLoader}>
        <PerspectiveCamera makeDefault position={[0, 0, 30]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <HeroCamera>
          <Model
            url={modelo.url}
            scales = {modelo.scales}    
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