
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/coffee_cup-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh 
      geometry={nodes.defaultMaterial.geometry} 
      material={materials.DefaultMaterial} 
      scale={1.9}
       />
    </group>
  )
}

useGLTF.preload('/coffee_cup-transformed.glb')