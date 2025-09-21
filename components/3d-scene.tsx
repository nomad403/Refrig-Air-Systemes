"use client"

import { Suspense } from "react"
import Model3D from "./3d-model"
import { useInView } from "../hooks/useInView"

interface Scene3DProps {
  modelPath: string
  position?: 'left' | 'right' | 'center'
  scale?: number
  className?: string
}

export default function Scene3D({ 
  modelPath, 
  position = 'right', 
  scale = 0.6,
  className = ""
}: Scene3DProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px", // Commence à charger 100px avant d'être visible
    triggerOnce: true
  })

  const getPositionClasses = () => {
    switch (position) {
      case 'left': return 'justify-start'
      case 'right': return 'justify-end'
      case 'center': return 'justify-center'
      default: return 'justify-end'
    }
  }

  return (
    <div 
      ref={ref}
      className={`relative w-full h-full flex items-center ${getPositionClasses()} ${className}`}
      style={{
        transform: 'translateZ(0)', // Force une nouvelle couche de composition
        willChange: 'auto',
        isolation: 'isolate'
      }}
    >
      {inView ? (
        <Suspense fallback={
          <div className="w-full h-full bg-gradient-to-br from-[#537FE7]/10 to-[#537FE7]/5 rounded-lg animate-pulse flex items-center justify-center">
            <div className="text-[#537FE7]/40">Chargement du modèle 3D...</div>
          </div>
        }>
          <Model3D 
            modelPath={modelPath}
            scale={scale}
            autoRotate={true}
            animationSpeed={0.6}
          />
        </Suspense>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#537FE7]/5 to-[#537FE7]/10 rounded-lg flex items-center justify-center border border-[#537FE7]/20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#537FE7]/10 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#537FE7]/30 border-t-[#537FE7] rounded-full animate-spin"></div>
            </div>
            <div className="text-[#537FE7]/60 text-sm">Modèle 3D prêt à charger</div>
          </div>
        </div>
      )}
    </div>
  )
}
