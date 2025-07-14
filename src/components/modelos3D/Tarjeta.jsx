/* eslint-disable react/no-unknown-property */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useTexture, Environment, Lightformer } from '@react-three/drei';
import { 
  BallCollider, 
  CuboidCollider, 
  Physics, 
  RigidBody, 
  useRopeJoint, 
  useSphericalJoint 
} from '@react-three/rapier';

import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import { Model } from './ARWAX_5';
import lanyard from '../lanyard.png';

import '../Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// Hook para cámara responsive
function useResponsiveCamera() {
  const [cameraSettings, setCameraSettings] = useState({
    position: [0, 0, 30],
    fov: 20,
  });

  useEffect(() => {
    function update() {
      const width = window.innerWidth;
      if (width < 480) { // móviles pequeños
        setCameraSettings({ position: [0, 0, 50], fov: 35 });
      } else if (width < 768) { // móviles grandes
        setCameraSettings({ position: [0, 0, 45], fov: 30 });
      } else if (width < 1024) { // tablets
        setCameraSettings({ position: [0, 0, 35], fov: 25 });
      } else { // laptops y escritorio
        setCameraSettings({ position: [0, 0, 30], fov: 20 });
      }
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return cameraSettings;
}

export default function Lanyard2({ transparent = true }) {
  const { position, fov } = useResponsiveCamera();

  return (
    <div className="lanyard-wrapper mx-auto w-full max-w-[350px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[1000px] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
      <Canvas
        className="w-full h-full"
        camera={{ position, fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>

        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 1]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const modelRef = useRef();

  const vec = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const texture = useTexture(lanyard);

  // Catmull-Rom curve for smooth band shape
  const [curve] = useState(() =>
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
  );

  const [dragged, setDragged] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Nuevo state para posición X y escala adaptativa
  const [positionX, setPositionX] = useState(4.5);
  const [scale, setScale] = useState(0.76);

  // Ajustar posiciónX y escala según ancho ventana
  useEffect(() => {
    function update() {
      const width = window.innerWidth;
      if (width < 480) { // móviles pequeños
        setPositionX(2.5); // mover más a la izquierda
        setScale(0.5);
      } else if (width < 768) { // móviles grandes
        setPositionX(3.5);
        setScale(0.6);
      } else if (width < 1024) { // tablets
        setPositionX(4);
        setScale(0.7);
      } else { // laptops y escritorio
        setPositionX(4.5);
        setScale(0.76);
      }
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Setup joints between rigid bodies to simulate rope
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], -0.6]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  // Update cursor style when hovering or dragging
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  // Handle drag movement with physics
  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());

      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      // Update curve points for band shape
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      band.current.geometry.setPoints(curve.getPoints(32));

      // Adjust angular velocity to simulate physics damping
      const ang = card.current.angvel();
      const rot = card.current.rotation();
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  // Rotation control for model via scroll wheel
  const rotationTarget = useRef(0);
  const rotationSpeed = 0.1;
  const minRotationZ = 0;
  const maxRotationZ = Math.PI / 2;

  useEffect(() => {
    const onWheel = (e) => {
      if (!modelRef.current) return;

      if (e.deltaY > 0) {
        rotationTarget.current = Math.min(rotationTarget.current + 0.1, maxRotationZ);
      } else {
        rotationTarget.current = Math.max(rotationTarget.current - 0.1, minRotationZ);
      }
    };

    window.addEventListener('wheel', onWheel);
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  useFrame(() => {
    if (!modelRef.current) return;
    modelRef.current.rotation.z += (rotationTarget.current - modelRef.current.rotation.z) * rotationSpeed;
  });

  // Keyboard controls for card movement
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!card.current) return;

      const pos = card.current.translation();
      const step = 0.1;
      let { x, y, z } = pos;

      switch (e.key) {
        case 'ArrowUp':
          z -= step;
          break;
        case 'ArrowDown':
          z += step;
          break;
        case 'ArrowLeft':
          x -= step;
          break;
        case 'ArrowRight':
          x += step;
          break;
        case 'w':
          y += step;
          break;
        case 's':
          y -= step;
          break;
        default:
          return;
      }

      card.current.setTranslation({ x, y, z }, true);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Setup texture wrapping and curve type
  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[positionX, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            ref={modelRef}
            scale={scale}
            position={[0, -0.0, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              setDragged(false);
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              setDragged(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <Model />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
      </mesh>
    </>
  );
}
