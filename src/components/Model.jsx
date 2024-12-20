import React, { useRef, useMemo, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { useDeviceType } from "../scripts/useDeviceType";
import { Link, scroller } from "react-scroll"; // Importa react-scroll
import * as THREE from "three";

export function Model({
  url = "/moon.glb",
  scales = {
    small: [0.1, 0.1, 0.1],
    mobile: [0.2, 0.2, 0.2],
    tablet: [0.3, 0.3, 0.3],
    laptop: [0.4, 0.4, 0.4],
    desktop: [0.5, 0.5, 0.5],
    else: [0.15, 0.7, 0.3],
  },
  rotation = [0, 0, 0],
  color = "red",
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const deviceType = useDeviceType();
  const { nodes, materials, scene } = useGLTF(url);

useEffect(() => {
  if (scene) {
    setIsLoaded(true);
  }
}, [scene]);

// Hacer scroll cuando el modelo está cargado
useEffect(() => {
  if (isLoaded) {
    window.scrollBy({
      top: 50,
      behavior: "smooth",
    });
  }
}, [isLoaded]);

  const scale = useMemo(
    () => scales[deviceType] || scales.else,
    [deviceType, scales]
  );
  console.log(scale);
  console.log(deviceType);
console.log(rotation);

  const uniformMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color,
      emissive: "#000000",
      roughness: 0.1,
      metalness: 0.0,
    });
  }, [color]);

const meshes = useMemo(() => {
    return Object.keys(nodes).map((key) => {
      const node = nodes[key];
      if (!node.geometry) return null; // Omitir nodos sin geometría
      return (
        <mesh
          key={key}
          castShadow
          receiveShadow
          geometry={node.geometry}
          material={uniformMaterial }
          scale={scale}
        />
      );
    });
  }, [nodes, scale, uniformMaterial ]);

  return (
    <group {...props} dispose={null} rotation={rotation}>
      {meshes}
    </group>
  );
}

useGLTF.preload("/moon.glb");
