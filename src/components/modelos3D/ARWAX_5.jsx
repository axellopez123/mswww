import React, { useEffect, useRef } from 'react';
import { useGLTF, useTexture, useHelper } from '@react-three/drei';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { easing } from 'maath'; // para interpolaciones suaves, npm install maath

import lanyard from '../lanyard.png';

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/ARWAX_5.glb');
  const texture = useTexture(lanyard);

  const rectRef = useRef();
  const textRef = useRef();
  const lightRef = useRef();

  const rectBasePos = new THREE.Vector3(0.048, -0.259, 0.706);
  const rectBaseRot = new THREE.Euler(2.084, 1.546, -2.072);

  const textBasePos = new THREE.Vector3(-0.357, 2.027, 0.541);
  const textBaseRot = new THREE.Euler(-3.092, -1.523, 1.628);
  const textBaseScale = new THREE.Vector3(1.372, 1.093, 1.055);

  useEffect(() => {
  const rectMaterial = materials['Material.009'];
  rectMaterial.map = texture;
  rectMaterial.color = new THREE.Color('#17202a');

  // ✨ Transparencia sutil
  rectMaterial.transparent = true;
  rectMaterial.opacity = 0.45;
  rectMaterial.depthWrite = false;
  rectMaterial.blending = THREE.AdditiveBlending;

  rectMaterial.needsUpdate = true;

  // Material del texto con brillo
  const textMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F3C623'),
    emissive: new THREE.Color('#F3C623'),
    emissiveIntensity: 0.2,
    roughness: 0.4,
    metalness: 0.7,
  });
  nodes.ARWAX.material = textMaterial;
}, [materials, texture, nodes.ARWAX]);


  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Easing con maath para movimiento más natural del rectángulo
    if (rectRef.current) {
      // Posición Y oscilando suavemente con easing lerp
      const targetY = rectBasePos.y + Math.sin(t * 1.5) * 0.025;
      easing.damp(rectRef.current.position, [rectBasePos.x, targetY, rectBasePos.z], 0.1, 0.016);
      // Rotación Z oscilante con easing
      const targetRotZ = rectBaseRot.z + Math.sin(t * 1.5) * 0.07;
      easing.dampE(rectRef.current.rotation, [rectBaseRot.x, rectBaseRot.y, targetRotZ], 0.1, 0.016);
    }

    if (textRef.current) {
      textRef.current.position.copy(textBasePos);
      textRef.current.rotation.copy(textBaseRot);

      // Pulso elegante de escala con easing
      const scalePulse = 1 + 0.07 * Math.sin(t * 3.8);
      easing.damp(textRef.current.scale, [textBaseScale.x * scalePulse, textBaseScale.y * scalePulse, textBaseScale.z * scalePulse], 0.15, 0.016);

      // Pulso sutil emissiveIntensity para brillo vivo
      const emissiveIntensity = 0.15 + 0.15 * (Math.sin(t * 5) + 1) / 2;
      textRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(textRef.current.material.emissiveIntensity, emissiveIntensity, 0.1);

      // Color pulso muy suave entre rosa y blanco para que no se sature
      const baseColor = new THREE.Color('#F3C623');
      const whiteColor = new THREE.Color('#ffffff');
      const lerpAmount = (Math.sin(t * 4) + 1) / 2 * 0.25; // menos saturado
      textRef.current.material.color.lerpColors(baseColor, whiteColor, lerpAmount);
      textRef.current.material.needsUpdate = true;
    }

    if (lightRef.current) {
      // Luz puntual que sigue un poco al texto para crear efecto de glow
      const lightTargetPos = new THREE.Vector3().copy(textBasePos);
      lightTargetPos.y += 0.3 + 0.05 * Math.sin(t * 6);
      easing.damp(lightRef.current.position, lightTargetPos.toArray(), 0.1, 0.016);
    }
  });

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          ref={rectRef}
          geometry={nodes.Object_2.geometry}
          material={materials['Material.009']}
          position={rectBasePos.toArray()}
          rotation={rectBaseRot.toArray()}
          castShadow
          receiveShadow
        />
      </group>

      <mesh
        ref={textRef}
        geometry={nodes.ARWAX.geometry}
        material={nodes.ARWAX.material}
        position={textBasePos.toArray()}
        rotation={textBaseRot.toArray()}
        scale={textBaseScale.toArray()}
        castShadow
      />

      {/* Luz puntual para brillo elegante */}
      <pointLight
        ref={lightRef}
        color="#ff0077"
        intensity={1.2}
        distance={3}
        decay={2}
        position={[textBasePos.x, textBasePos.y + 0.3, textBasePos.z]}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-radius={4}
      />
    </group>
  );
}

useGLTF.preload('/models/ARWAX_5.glb');
