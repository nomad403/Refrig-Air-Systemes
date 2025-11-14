"use client"

import { useEffect, useState } from "react"

export function useHeaderToneDynamic() {
  const [tone, setTone] = useState<"light" | "dark">("light")
  const [isOverHero, setIsOverHero] = useState(false)

  useEffect(() => {
    // Observer la zone vidéo Hero (sections avec data-hero-blend="true")
    const checkHero = () => {
      const hero = document.querySelector("[data-hero-blend='true']")
      if (!hero) {
        // Si pas de hero, on reste en mode normal
        setIsOverHero(false)
        return null
      }
      return hero
    }

    const hero = checkHero()
    if (!hero) {
      // Réessayer après un court délai au cas où le DOM n'est pas encore prêt
      const timeout = setTimeout(() => {
        const retryHero = checkHero()
        if (!retryHero) return
        setupObserver(retryHero)
      }, 100)
      return () => clearTimeout(timeout)
    }

    const setupObserver = (heroElement: Element) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Hero visible → mix-blend-difference actif
            // Utiliser intersectionRatio > 0.1 pour être plus tolérant
            setIsOverHero(entry.isIntersecting && entry.intersectionRatio > 0.1)
          })
        },
        { 
          threshold: [0, 0.1, 0.3, 0.5, 1], // Plusieurs seuils pour une détection fluide
          rootMargin: "0px 0px -20% 0px" // Marge négative en bas pour désactiver avant de sortir complètement
        }
      )
      
      observer.observe(heroElement)
      return () => observer.disconnect()
    }

    const cleanup = setupObserver(hero)
    return cleanup
  }, [])

  useEffect(() => {
    // Tant qu'on est sur le hero, on ne touche pas au tone (mix-blend gère)
    if (isOverHero) {
      setTone("light") // Valeur par défaut, mais mix-blend rendra visible
      return
    }

    // Détecter la couleur réelle du fond derrière le header
    const detectBackgroundColor = () => {
      const headerEl = document.querySelector("header")
      if (!headerEl) return

      const rect = headerEl.getBoundingClientRect()
      const sampleY = rect.bottom + 1
      const sampleX = Math.round(window.innerWidth / 2)

      // Utiliser elementFromPoint pour trouver l'élément sous le header
      const element = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null
      if (!element || headerEl.contains(element)) {
        setTone("light") // Par défaut clair si pas de détection
        return
      }

      // Remonter dans la hiérarchie pour trouver la couleur de fond
      let node: HTMLElement | null = element
      let depth = 0
      const maxDepth = 5

      while (node && node !== document.body && depth < maxDepth) {
        const cs = window.getComputedStyle(node)
        
        // Vérifier background-color
        const bgColor = cs.backgroundColor
        if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
          // Parser RGB
          const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1], 10)
            const g = parseInt(rgbMatch[2], 10)
            const b = parseInt(rgbMatch[3], 10)
            
            // Calculer la luminance (formule standard)
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
            setTone(luminance > 0.6 ? "dark" : "light")
            return
          }
        }

        // Si background-image, considérer comme transparent (vidéo/image)
        if (cs.backgroundImage && cs.backgroundImage !== 'none') {
          // Pour les images/vidéos, on garde le tone actuel ou on passe à "light"
          // (car mix-blend devrait être géré par isOverHero)
          break
        }

        node = node.parentElement
        depth++
      }

      // Par défaut, fond sombre → texte clair
      setTone("light")
    }

    // Détecter au chargement et au scroll (throttlé)
    detectBackgroundColor()
    
    let lastCheck = 0
    const throttledCheck = () => {
      const now = Date.now()
      if (now - lastCheck < 150) return // Throttle à 150ms
      lastCheck = now
      detectBackgroundColor()
    }

    window.addEventListener('scroll', throttledCheck, { passive: true })
    window.addEventListener('resize', throttledCheck, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledCheck)
      window.removeEventListener('resize', throttledCheck)
    }
  }, [isOverHero])

  return { tone, isOverHero }
}

