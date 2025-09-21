"use client"

import Scene3D from "./3d-scene"

interface Section3DProps {
  modelPath: string
  position?: 'left' | 'right' | 'center'
  scale?: number
  className?: string
}

export default function Section3D({ 
  modelPath, 
  position = 'right', 
  scale = 0.6,
  className = ""
}: Section3DProps) {
  return (
    <Scene3D 
      modelPath={modelPath}
      position={position}
      scale={scale}
      className={className}
    />
  )
}