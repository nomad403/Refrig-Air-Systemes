"use client"

import { useEffect, useState } from "react"

export function useHeaderToneDynamic() {
  const [tone, setTone] = useState<"light" | "dark">("light")
  const [isOverHero, setIsOverHero] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState<string>("rgba(0,0,0,0)")

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
      setBackgroundColor("rgba(0,0,0,0)") // Transparent sur hero
      return
    }

    // Cache simple pour éviter les recalculs inutiles
    let lastDetectedColor = ""
    let rafId: number | null = null

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
        const defaultColor = "rgb(24, 24, 35)"
        if (lastDetectedColor !== defaultColor) {
          setTone("light")
          setBackgroundColor(defaultColor)
          lastDetectedColor = defaultColor
        }
        return
      }

      // Remonter dans la hiérarchie pour trouver la couleur de fond
      let node: HTMLElement | null = element
      let depth = 0
      const maxDepth = 4 // Réduit pour plus de rapidité

      while (node && node !== document.body && depth < maxDepth) {
        const cs = window.getComputedStyle(node)
        
        // Vérifier background-color
        const bgColor = cs.backgroundColor
        if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
          // Parser RGB/RGBA
          const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1], 10)
            const g = parseInt(rgbMatch[2], 10)
            const b = parseInt(rgbMatch[3], 10)
            const alpha = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1
            
            // Si l'alpha est < 1, on doit remonter pour trouver la couleur finale
            if (alpha < 1) {
              // Continuer à chercher une couleur opaque
              node = node.parentElement
              depth++
              continue
            }
            
            // Construire la couleur RGB
            const newColor = `rgb(${r}, ${g}, ${b})`
            
            // Éviter les mises à jour inutiles
            if (lastDetectedColor === newColor) {
              return
            }
            
            // Calculer la luminance (formule standard)
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
            setTone(luminance > 0.6 ? "dark" : "light")
            setBackgroundColor(newColor)
            lastDetectedColor = newColor
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
      const defaultColor = "rgb(24, 24, 35)"
      if (lastDetectedColor !== defaultColor) {
        setTone("light")
        setBackgroundColor(defaultColor)
        lastDetectedColor = defaultColor
      }
    }

    // Détecter immédiatement au chargement
    detectBackgroundColor()
    
    // Utiliser requestAnimationFrame pour une réactivité maximale (synchronisé avec le rendu)
    const scheduleCheck = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(() => {
        detectBackgroundColor()
        rafId = null
      })
    }

    // Écouter scroll et resize avec RAF pour une réactivité instantanée
    window.addEventListener('scroll', scheduleCheck, { passive: true })
    window.addEventListener('resize', scheduleCheck, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleCheck)
      window.removeEventListener('resize', scheduleCheck)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [isOverHero])

  return { tone, isOverHero, backgroundColor }
}

