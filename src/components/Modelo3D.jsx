import React, { useRef, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Modelo3D = ({ modeloUrl }) => {
  const canvasRef = useRef();

  // Manejar tamaño del canvas
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

  // Detectar dispositivo móvil
  const isMobile = useMemo(() => window.innerWidth < 768, [window.innerWidth]);

  const Modelo = () => {
    const { scene } = useGLTF(modeloUrl);

    // Aplicar material y escala inicial
    useEffect(() => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({ color: "white" });
        }
      });

      const scale = isMobile ? 1.5 : 3;
      scene.scale.set(scale, scale, scale);
    }, [scene, isMobile]);

    return <primitive object={scene} />;
  };

  return (
    <Canvas
      ref={canvasRef}
      dpr={[1, 2]}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      camera={{
        position: [10, 10, 10],
        fov: 75,
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Modelo />
    </Canvas>
  );
};

export default Modelo3D;
