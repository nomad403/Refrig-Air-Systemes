"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useMobileSafe } from "@/hooks/use-mobile-safe"

interface PerformanceContextType {
  isMobile: boolean
  disableVideos: boolean
  disableAnimations: boolean
  simplifiedHeader: boolean
  reducedObservers: boolean
  forceImageFallback: boolean
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined)

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const mobileSafe = useMobileSafe()

  useEffect(() => {
    if (typeof window === "undefined") return
    setIsMobile(window.innerWidth <= 768)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const value: PerformanceContextType = {
    isMobile,
    disableVideos: mobileSafe.disableVideos,
    disableAnimations: mobileSafe.disableAnimations,
    simplifiedHeader: mobileSafe.simplifiedHeader,
    reducedObservers: mobileSafe.reducedObservers,
    forceImageFallback: mobileSafe.disableVideos || isMobile,
  }

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformance() {
  const context = useContext(PerformanceContext)
  if (context === undefined) {
    throw new Error("usePerformance must be used within a PerformanceProvider")
  }
  return context
}

