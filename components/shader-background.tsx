"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.6) contrast(1.1) saturate(0.9)",
          }}
        >
          <source src="/videos/grand_angle_hvac_industrial .mp4" type="video/mp4" />
        </video>
        
        
        {/* Effet de particules flottantes pour l'effet industriel */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300/30 rounded-full animate-ping" />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-300/25 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-cyan-400/20 rounded-full animate-ping" />
        </div>
      </div>

      {children}
    </div>
  )
}
