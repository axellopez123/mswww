import React, { useRef, useMemo, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

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
  const [device, setDevice] = useState("mobile");
  const { nodes, materials } = useGLTF(url);
  const isSmall = useMediaQuery({ maxWidth: 440 }); // Dispositivos muy pequeños (ejemplo: teléfonos compactos)
  const isMobile = useMediaQuery({ minWidth: 441, maxWidth: 768 }); // Teléfonos estándar
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 }); // Tablets
  const isLaptop = useMediaQuery({ minWidth: 1025, maxWidth: 1440 }); // Laptops
  const isDesktop = useMediaQuery({ minWidth: 1441 }); // Pantallas de escritorio grandes
console.log(scale);


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

  console.log(whoDevice);

  // useEffect(() => {
  //   console.log(scale);
    
  //   setDevice(whoDevice);
  //   switch (device) {
  //     case "small":
  //       setScale(scales.small);
  //       break;
  //     case "mobile":
  //       setScale(scales.mobile);
  //       break;
  //     case "tablet":
  //       setScale(scales.tablet);
  //       break;
  //     case "laptop":
  //       setScale(scales.laptop);
  //       break;
  //     case "desktop":
  //       setScale(scales.desktop);
  //       break;
  //     case "else":
  //       setScale(scales.else);
  //       break;
  //     default:
  //       break;
  //   }
  // }, [isSmall, isMobile, isTablet, isLaptop, isDesktop, device]);

  useEffect(() => {
    setDevice(whoDevice);
    switch (whoDevice) {
      case "small":
        setScale(scales.small || [0.1, 0.1, 0.1]);
        break;
      case "mobile":
        setScale(scales.mobile || [0.2, 0.2, 0.2]);
        break;
      case "tablet":
        setScale(scales.tablet || [0.3, 0.3, 0.3]);
        break;
      case "laptop":
        setScale(scales.laptop || [0.4, 0.4, 0.4]);
        break;
      case "desktop":
        setScale(scales.desktop || [0.5, 0.5, 0.5]);
        break;
      default:
        setScale(scales.else || [0.15, 0.7, 0.3]);
        break;
    }
  }, [whoDevice, scales]);

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
        <meshStandardMaterial color={"#1e83be"} roughness={1} metalness={0.0} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/moon.glb");
