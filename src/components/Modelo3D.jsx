import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from 'three';

const Modelo3D = ({ modeloUrl }) => {
  // Carga del modelo 3D usando useGLTF
  const Modelo = () => {
    const { scene } = useGLTF(modeloUrl);
    // Aplicar color/material a todas las partes del modelo
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({ color: "white" });
      }
    });

    scene.scale.set(3, 3, 3); // Aumenta el tamaño del modelo

    return <primitive object={scene}/>;
  };

  return (
    <Canvas
      style={{ position:"absolute", width: "100%", height: "100%" }}
      camera={{
        position: [10, 9, 10], // Subir la cámara en el eje Y (segundo valor)
        fov: 75,
      }}
    >
      {/* Luz ambiental */}
      <ambientLight intensity={0.5} />
      {/* Luz direccional */}
      <directionalLight position={[10, 10, 10]} intensity={1} />
      {/* Controles de cámara */}
      <OrbitControls />
      {/* Modelo 3D */}
      
      <Modelo />
    </Canvas>
  );
};

export default Modelo3D;
