import React, { useRef, useMemo, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { useDeviceType } from "../scripts/useDeviceType";

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
  const [scale, setScale] = useState([0.15, 0.7, 0.3]);
  const deviceType = useDeviceType();
  const { nodes, materials } = useGLTF(url);

  useEffect(() => {
    setScale(scales[deviceType] || scales.else);
  }, [deviceType, scales]);

  return (
    <group {...props} dispose={null} rotation={rotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mball002.geometry}
        material={nodes.Mball002.material}
        // material-color="blue" // Cambia el color del material
        position={[2.777, 2.131, 0]}
        scale={scale}
      >
        <meshStandardMaterial color={"#b2d9f0"} emissive={"#000000"} roughness={0.1} metalness={0.0} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/moon.glb");
