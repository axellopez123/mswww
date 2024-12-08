import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Modelo3D = ({ modeloUrl }) => {
  const canvasRef = useRef();

  // Función para forzar un re-render del canvas después de que se monte
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.style.width = "100%";
        canvasRef.current.style.height = "100%";
      }
    };
    resizeCanvas();

    // Escuchar cambios de tamaño en la ventana
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const Modelo = () => {
    const { scene } = useGLTF(modeloUrl);
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({ color: "white" });
      }
    });

    // Escala adaptativa para dispositivos móviles
    const isMobile = window.innerWidth < 768;
    scene.scale.set(isMobile ? 1.5 : 3, isMobile ? 1.5 : 3, isMobile ? 1.5 : 3);

    return <primitive object={scene} />;
  };

  return (
    <Canvas
      ref={canvasRef}
      dpr={[1, 2]}
      style={{ position: "absolute", top: 0,left: 0, width: "100%", height: "100%",}}
      camera={{
        position: [10, 10, 10], // Configurar la posición de la cámara
        fov: 75,
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enablePan enableZoom enableRotate touchZoom touchRotate />
      <Modelo />
    </Canvas>
  );
};

export default Modelo3D;
