"use client"

import { useState, useRef, useEffect } from "react"

const partnerLogos = [
  { 
    name: "Daikin", 
    icon: (
      <svg className="w-[16rem] h-[8rem] sm:w-[20rem] sm:h-[10rem] lg:w-[22.4rem] lg:h-[11.2rem] fill-white" viewBox="0 0 200 60">
        <text x="10" y="35" className="font-bold text-xl sm:text-2xl">DAIKIN</text>
      </svg>
    )
  },
  { 
    name: "Mitsubishi Electric", 
    icon: (
      <svg className="w-[16rem] h-[8rem] sm:w-[20rem] sm:h-[10rem] lg:w-[22.4rem] lg:h-[11.2rem] fill-white" viewBox="0 0 200 60">
        <polygon points="20,15 40,15 30,35" className="fill-white"/>
        <text x="50" y="30" className="font-semibold text-xs sm:text-sm">MITSUBISHI</text>
      </svg>
    )
  },
  { 
    name: "Carrier", 
    icon: (
      <svg className="w-[16rem] h-[8rem] sm:w-[20rem] sm:h-[10rem] lg:w-[22.4rem] lg:h-[11.2rem] fill-white" viewBox="0 0 200 60">
        <circle cx="25" cy="30" r="12" className="fill-none stroke-white stroke-2"/>
        <text x="45" y="35" className="font-bold text-lg sm:text-xl">CARRIER</text>
      </svg>
    )
  },
  { 
    name: "Trane", 
    icon: (
      <svg className="w-[16rem] h-[8rem] sm:w-[20rem] sm:h-[10rem] lg:w-[22.4rem] lg:h-[11.2rem] fill-white" viewBox="0 0 200 60">
        <rect x="15" y="20" width="20" height="20" className="fill-white"/>
        <text x="45" y="35" className="font-bold text-lg sm:text-xl">TRANE</text>
      </svg>
    )
  },
  { 
    name: "Lennox", 
    icon: (
      <svg className="w-[16rem] h-[8rem] sm:w-[20rem] sm:h-[10rem] lg:w-[22.4rem] lg:h-[11.2rem] fill-white" viewBox="0 0 200 60">
        <path d="M15,30 L25,20 L35,30 L25,40 Z" className="fill-white"/>
        <text x="45" y="35" className="font-bold text-sm sm:text-lg">LENNOX</text>
      </svg>
    )
  },
  { 
    name: "Johnson Controls", 
    icon: (
      <svg className="w-[16rem] h-[8rem] sm:w-[20rem] sm:h-[10rem] lg:w-[22.4rem] lg:h-[11.2rem] fill-white" viewBox="0 0 200 60">
        <circle cx="20" cy="25" r="6" className="fill-white"/>
        <circle cx="30" cy="35" r="6" className="fill-white"/>
        <text x="45" y="30" className="font-semibold text-xs sm:text-sm">JOHNSON</text>
        <text x="45" y="42" className="font-semibold text-xs sm:text-sm">CONTROLS</text>
      </svg>
    )
  },
  { 
    name: "Danfoss", 
    icon: (
      <svg className="w-[16rem] h-[8rem] sm:w-[20rem] sm:h-[10rem] lg:w-[22.4rem] lg:h-[11.2rem] fill-white" viewBox="0 0 200 60">
        <ellipse cx="25" cy="30" rx="15" ry="8" className="fill-none stroke-white stroke-2"/>
        <text x="50" y="35" className="font-bold text-sm sm:text-lg">DANFOSS</text>
      </svg>
    )
  },
  { 
    name: "Copeland", 
    icon: (
      <svg className="w-[16rem] h-[8rem] sm:w-[20rem] sm:h-[10rem] lg:w-[22.4rem] lg:h-[11.2rem] fill-white" viewBox="0 0 200 60">
        <rect x="15" y="25" width="25" height="10" className="fill-none stroke-white stroke-2"/>
        <text x="50" y="35" className="font-bold text-sm sm:text-md">COPELAND</text>
      </svg>
    )
  },
]

// Dupliquer exactement 2 fois pour un défilement parfaitement continu
const duplicatedLogos = [...partnerLogos, ...partnerLogos]

export default function LogoGallery() {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedLogo, setSelectedLogo] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Détecter la taille d'écran pour ajuster l'animation
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    if (isHovered) {
      element.style.animationPlayState = 'paused'
    } else {
      element.style.animationPlayState = 'running'
    }
  }, [isHovered])

  return (
    <div className="relative w-screen overflow-hidden -ml-[50vw] left-1/2">
      <div 
        ref={scrollRef}
        className={`flex items-center py-3 sm:py-4 lg:py-6 ${
          isMobile ? 'space-x-6' : 'space-x-8 sm:space-x-10 lg:space-x-12'
        }`}
        style={{
          animationName: 'scroll',
          animationDuration: isMobile ? '20s' : '25s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: isHovered ? 'paused' : 'running'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setSelectedLogo(null)
        }}
      >
        {/* Icônes de fournisseurs dupliquées pour un défilement parfaitement continu */}
        {duplicatedLogos.map((partner, index) => (
          <div
            key={index}
            className={`flex-shrink-0 flex items-center justify-center group cursor-pointer ${
              isMobile 
                ? 'w-[16rem] h-[8rem]' 
                : 'w-[20rem] h-[10rem] sm:w-[24rem] sm:h-[12rem] lg:w-[28rem] lg:h-[14rem]'
            }`}
            onMouseEnter={() => setSelectedLogo(index)}
            onMouseLeave={() => setSelectedLogo(null)}
          >
            <div 
              className={`transition-all duration-300 ${
                selectedLogo === index 
                  ? 'scale-110 brightness-125 drop-shadow-lg' 
                  : 'scale-100 brightness-75 hover:scale-105 hover:brightness-90'
              }`}
            >
              {partner.icon}
            </div>
          </div>
        ))}
      </div>
      
      
    </div>
  )
}
