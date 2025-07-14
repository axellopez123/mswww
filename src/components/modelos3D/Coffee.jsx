import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model({ position = [0, -0.6, 0], ...props }) {
  const { nodes, materials } = useGLTF('/coffee-transformed.glb')
  return (
    <group {...props} dispose={null} position={position}>
      <mesh
        geometry={nodes.Plastic_Cup_0.geometry}
        material={materials.Plastic_Cup}
        rotation={[-Math.PI / 2, 0, 0]} // rotación original
      />
    </group>
  )
}

useGLTF.preload('/coffee-transformed.glb')
