"use client"

import { useState, useEffect } from "react"

interface MobileSafeConfig {
  disableVideos: boolean
  disableAnimations: boolean
  simplifiedHeader: boolean
  reducedObservers: boolean
}

export function useMobileSafe(): MobileSafeConfig {
  const [config, setConfig] = useState<MobileSafeConfig>({
    disableVideos: false,
    disableAnimations: false,
    simplifiedHeader: false,
    reducedObservers: false,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    // Détection mobile robuste
    const isMobileDevice = 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (window.innerWidth <= 768) ||
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0)

    // Détection de performance basique
    const checkPerformance = () => {
      // Vérifier la mémoire disponible (si disponible)
      const memory = (performance as any).memory
      const hasLowMemory = memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8

      // Vérifier la connexion (si disponible)
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      const isSlowConnection = connection && (
        connection.effectiveType === 'slow-2g' || 
        connection.effectiveType === '2g' ||
        connection.saveData === true
      )

      // Vérifier le nombre de cores
      const cores = (navigator as any).hardwareConcurrency || 4
      const hasLowPower = cores <= 2

      return {
        hasLowMemory,
        isSlowConnection,
        hasLowPower,
      }
    }

    const perf = checkPerformance()
    
    // Configuration pour mobile : optimisations strictes mais permettre les vidéos
    if (isMobileDevice) {
      setConfig({
        disableVideos: false, // Permettre les vidéos sur mobile mais avec optimisations strictes
        disableAnimations: perf.hasLowPower || perf.isSlowConnection,
        simplifiedHeader: true, // Toujours simplifier le header sur mobile
        reducedObservers: true, // Toujours réduire les observers sur mobile
      })
    } else {
      // Sur desktop, désactiver seulement si performance faible
      setConfig({
        disableVideos: perf.hasLowMemory || perf.isSlowConnection,
        disableAnimations: perf.hasLowPower,
        simplifiedHeader: false,
        reducedObservers: perf.hasLowMemory,
      })
    }

    // Écouter les changements de taille pour réévaluer
    const handleResize = () => {
      const nowMobile = window.innerWidth <= 768
      if (nowMobile !== isMobileDevice) {
        window.location.reload() // Recharger si changement majeur
      }
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return config
}

