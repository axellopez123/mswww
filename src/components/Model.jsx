import React, { useRef, useMemo, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

export function Model({
  url = "/moon.glb",
  scales = [{}],
  rotation = [0, 0, 0],
  ...props
}) {
  const [scale, setScale] = useState([0.15, 0.7, 0.3]);
  const [device, setDevice] = useState("mobile");
  const { nodes, materials } = useGLTF(url);
  const isSmall = useMediaQuery({ maxWidth: 440 }); // Dispositivos muy pequeños (ejemplo: teléfonos compactos)
  const isMobile = useMediaQuery({ minWidth: 441, maxWidth: 768 }); // Teléfonos estándar
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 }); // Tablets
  const isLaptop = useMediaQuery({ minWidth: 1025, maxWidth: 1440 }); // Laptops
  const isDesktop = useMediaQuery({ minWidth: 1441 }); // Pantallas de escritorio grandes

  const useDeviceType = (isSmall, isMobile, isTablet, isLaptop, isDesktop) => {
    const deviceType = useMemo(() => {
      if (isSmall) {
        return "small";
      } else if (isMobile) {
        return "mobile";
      } else if (isTablet) {
        return "tablet";
      } else if (isLaptop) {
        return "laptop";
      } else if (isDesktop) {
        return "desktop";
      } else {
        return "else";
      }
    }, [isSmall, isMobile, isTablet, isLaptop, isDesktop]);
    return deviceType;
  };
  
  const whoDevice = useDeviceType(
    isSmall,
    isMobile,
    isTablet,
    isLaptop,
    isDesktop
  );
  useEffect(() => {
    setDevice(whoDevice);
    switch (device) {
      case "small":
        setScale(scales.small);
        break;
      case "mobile":
        setScale(scales.mobile);
        break;
      case "tablet":
        setScale(scales.tablet);
        break;
      case "laptop":
        setScale(scales.laptop);
        break;
      case "desktop":
        setScale(scales.desktop);
        break;
      case "else":
        setScale(scales.else);
        break;
      default:
        break;
    }
  }, [isSmall, isMobile, isTablet, isLaptop, isDesktop, device]);
  return (
    <group {...props} dispose={null} rotation={rotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mball002.geometry}
        material={nodes.Mball002.material}
        // material-color="blue" // Cambia el color del material
        position={[2.777, 2.131, 0]}
        scale={[0.1, 0.7, 0.3]}
      >
        <meshStandardMaterial color="red" roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/moon.glb");
