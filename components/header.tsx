"use client"

import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { usePerformance } from "@/contexts/performance-context"
import { useEffect, useMemo, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function Header() {
  // Header global
  const headerRef = useRef<HTMLElement | null>(null)
  const [isTransparent, setIsTransparent] = useState<boolean>(true)
  const [bgColor, setBgColor] = useState<string>("rgba(0,0,0,0.4)")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [logoTone, setLogoTone] = useState<"light" | "dark">("light")
  const { isFrench, toggleLanguage } = useLanguage()

  const computeIsLight = (rgb: string) => {
    const m = rgb.match(/rgba?\(([^)]+)\)/)
    if (!m) return false
    const [r, g, b] = m[1].split(",").map((p) => parseFloat(p.trim()))
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    return luminance > 0.6
  }

  const [shouldBlendDifference, setShouldBlendDifference] = useState(false)

  const linkClass = useMemo(() => {
    const blend = shouldBlendDifference ? "mix-blend-difference" : ""
    if (isTransparent) {
      return ["text-white", blend].filter(Boolean).join(" ")
    }
    const toneClass = computeIsLight(bgColor) ? "text-[#181823]" : "text-white"
    return [toneClass, blend].filter(Boolean).join(" ")
  }, [isTransparent, bgColor, shouldBlendDifference])
  const mixBlendClass = shouldBlendDifference ? "mix-blend-difference" : ""

  // Fermer le menu mobile au scroll
  useEffect(() => {
    if (typeof window === "undefined") return
    const handleScroll = () => {
      setIsMobileMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const { simplifiedHeader, reducedObservers } = usePerformance()

  // Détection du fond sous le header: image/vidéo → transparent, couleur → héritée
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return
    
    // Sur mobile avec header simplifié, utiliser une détection basique
    if (simplifiedHeader) {
      setIsTransparent(true)
      setBgColor("rgba(0,0,0,0.4)")
      setShouldBlendDifference(false)
      return
    }
    
    let scheduled = false
    let rafId: number | null = null
    let timeouts: number[] = []

    // Fonction parseCssColor optimisée avec protection contre la récursion infinie
    const parseCssColor = (input?: string | null, depth: number = 0): number | null => {
      // Protection contre la récursion infinie (max 2 niveaux)
      if (depth > 2) return null
      
      if (!input) return null
      const value = input.trim()
      if (!value || value === "transparent" || value === "none") return null

      // Parser RGB/RGBA
      const rgbMatch = value.match(/^rgba?\(([^)]+)\)$/)
      let r: number, g: number, b: number

      if (rgbMatch) {
        const parts = rgbMatch[1].split(",").map((p) => parseFloat(p.trim()))
        if (parts.length >= 3) {
          r = parts[0]
          g = parts[1]
          b = parts[2]
          // Vérifier l'alpha pour rgba
          if (rgbMatch[0].startsWith("rgba") && parts.length === 4) {
            const alpha = parts[3]
            if (alpha === 0) return null
          }
        } else {
          return null
        }
      } else if (value.startsWith("#")) {
        // Parser hex
        let hex = value.slice(1)
        if (hex.length === 3) {
          hex = hex.split("").map((c) => c + c).join("")
        }
        if (hex.length === 6) {
          r = parseInt(hex.slice(0, 2), 16)
          g = parseInt(hex.slice(2, 4), 16)
          b = parseInt(hex.slice(4, 6), 16)
        } else {
          return null
        }
      } else {
        // Pour les noms de couleurs CSS, utiliser getComputedStyle avec protection récursive
        if (typeof document === "undefined" || depth > 0) return null
        
        try {
          const temp = document.createElement("span")
          temp.style.display = "none"
          temp.style.color = value
          document.body.appendChild(temp)
          const computed = window.getComputedStyle(temp).color
          document.body.removeChild(temp)
          
          // Si la valeur calculée est identique, éviter la récursion infinie
          if (computed === value || !computed) return null
          
          return parseCssColor(computed, depth + 1)
        } catch {
          return null
        }
      }

      // Calculer la luminance
      if (typeof r === "undefined" || typeof g === "undefined" || typeof b === "undefined") {
        return null
      }
      
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
      return isNaN(luminance) ? null : luminance
    }

    // Cache pour éviter les recalculs inutiles
    let lastDetection: { transparent: boolean; color?: string; blend: boolean } | null = null
    
    // Fonction pour vérifier si un élément avec data-hero-blend est visible dans la zone du header
    const checkHeroBlendInArea = (): boolean => {
      const headerEl = headerRef.current
      if (!headerEl) return false
      
      const rect = headerEl.getBoundingClientRect()
      const sampleY = (rect.bottom ?? 64) + 1
      const sampleX = Math.round(window.innerWidth / 2)
      
      // Utiliser elementsFromPoint pour obtenir tous les éléments à ce point
      const elements = (document as any).elementsFromPoint 
        ? (document as any).elementsFromPoint(sampleX, sampleY)
        : [document.elementFromPoint(sampleX, sampleY)].filter(Boolean)
      
      // Chercher si un élément avec data-hero-blend est présent
      for (const el of elements) {
        if (headerEl.contains(el)) continue
        const heroBlend = (el as HTMLElement).closest?.("[data-hero-blend='true']")
        if (heroBlend) return true
        // Vérifier aussi si l'élément lui-même a l'attribut
        if ((el as HTMLElement).getAttribute?.("data-hero-blend") === "true") return true
      }
      
      return false
    }
    
    const detect = () => {
      scheduled = false
      const headerEl = headerRef.current
      if (!headerEl) return
      
      const rect = headerEl.getBoundingClientRect()
      const sampleY = (rect.bottom ?? 64) + 1
      const sampleX = Math.round(window.innerWidth / 2)
      
      // Utiliser elementFromPoint (plus performant que elementsFromPoint)
      const base = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null
      if (!base || headerEl.contains(base)) {
        // Si pas d'élément ou élément dans le header, utiliser transparent par défaut
        if (lastDetection?.transparent !== true || lastDetection?.blend !== false) {
          setIsTransparent(true)
          setShouldBlendDifference(false)
          lastDetection = { transparent: true, blend: false }
        }
        return
      }
      
      // Vérifier si un élément avec data-hero-blend est présent dans la zone
      const hasHeroBlend = checkHeroBlendInArea()
      
      // Vérifier rapidement si c'est un élément média
      const tag = base.tagName
      if (tag === 'IFRAME' || tag === 'VIDEO' || tag === 'IMG' || tag === 'CANVAS') {
        const blend = hasHeroBlend
        if (lastDetection?.transparent !== true || lastDetection?.blend !== blend) {
          setIsTransparent(true)
          setShouldBlendDifference(blend)
          lastDetection = { transparent: true, blend }
        }
        return
      }
      
      // Analyser le style de manière optimisée (limiter à 3 niveaux max)
      let node: HTMLElement | null = base
      let depth = 0
      const maxDepth = 3
      
      while (node && node !== document.body && depth < maxDepth) {
        const cs = window.getComputedStyle(node)
        
        // Vérifier background-image en premier (plus rapide)
        if (cs.backgroundImage && cs.backgroundImage !== 'none') {
          const blend = hasHeroBlend
          if (lastDetection?.transparent !== true || lastDetection?.blend !== blend) {
            setIsTransparent(true)
            setShouldBlendDifference(blend)
            lastDetection = { transparent: true, blend }
          }
          return
        }
        
        // Vérifier background-color
        const bgColor = cs.backgroundColor
        if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
          const luminance = parseCssColor(bgColor)
          const newTone = luminance !== null ? (luminance > 0.6 ? "dark" : "light") : "light"
          
          if (lastDetection?.transparent !== false || lastDetection?.color !== bgColor) {
            setIsTransparent(false)
            setShouldBlendDifference(false)
            setBgColor(bgColor)
            setLogoTone(newTone)
            lastDetection = { transparent: false, color: bgColor, blend: false }
          }
          return
        }
        
        node = node.parentElement
        depth++
      }
      
      // Par défaut, transparent
      const blend = hasHeroBlend
      if (lastDetection?.transparent !== true || lastDetection?.blend !== blend) {
        setIsTransparent(true)
        setShouldBlendDifference(blend)
        lastDetection = { transparent: true, blend }
      }
    }

    // Détecter si on est sur mobile
    const isMobileDevice = typeof window !== "undefined" && window.innerWidth <= 768

    const scheduleDetect = () => {
      if (scheduled) return
      scheduled = true
      rafId = requestAnimationFrame(detect)
    }

    // Throttler optimisé : plus agressif sur mobile
    let lastScheduleTime = 0
    const throttledScheduleDetect = () => {
      const now = Date.now()
      const throttleDelay = isMobileDevice ? 300 : 100 // Augmenté pour réduire la charge
      if (now - lastScheduleTime < throttleDelay) return
      lastScheduleTime = now
      scheduleDetect()
    }

    // Initialisation
    setIsTransparent(true)
    setBgColor("rgba(0,0,0,0.4)")
    setShouldBlendDifference(false)

    // Détection initiale avec délais réduits
    scheduleDetect()
    timeouts.push(window.setTimeout(scheduleDetect, 100))
    timeouts.push(window.setTimeout(scheduleDetect, 500))

    // Event listeners optimisés
    window.addEventListener('scroll', throttledScheduleDetect, { passive: true })
    
    // Resize avec throttling agressif
    let resizeTimeout: NodeJS.Timeout | null = null
    const throttledResize = () => {
      if (resizeTimeout) return
      resizeTimeout = setTimeout(() => {
        scheduleDetect()
        resizeTimeout = null
      }, isMobileDevice ? 500 : 200) // Délai augmenté
    }
    window.addEventListener('resize', throttledResize, { passive: true })
    
    // Load event (une seule fois)
    const onLoad = () => {
      scheduleDetect()
    }
    if (document.readyState === 'complete') {
      scheduleDetect()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    // MutationObserver simplifié et optimisé
    let mutationObserver: MutationObserver | null = null
    
    if (!reducedObservers) {
      // Debounce pour MutationObserver
      let mutationTimeout: NodeJS.Timeout | null = null
      const handleMutation = () => {
        if (mutationTimeout) return
        mutationTimeout = setTimeout(() => {
          throttledScheduleDetect()
          mutationTimeout = null
        }, isMobileDevice ? 500 : 200)
      }
      
      mutationObserver = new MutationObserver(handleMutation)
      
      // Observer seulement les changements critiques
      if (isMobileDevice) {
        // Sur mobile, observer seulement le main
        const mainContent = document.querySelector('main')
        if (mainContent) {
          mutationObserver.observe(mainContent, {
            childList: true,
            subtree: false,
            attributes: false // Désactiver sur mobile pour réduire la charge
          })
        }
      } else {
        // Sur desktop, observer avec subtree mais limité
        mutationObserver.observe(document.body, {
          childList: true,
          subtree: false, // Désactiver subtree pour réduire la charge
          attributes: true,
          attributeFilter: ['style', 'class']
        })
      }
    }

    // Image load (seulement si nécessaire)
    const onImageLoad = (event: Event) => {
      const target = event.target as HTMLElement | null
      if (target && headerRef.current && !headerRef.current.contains(target)) {
        // Seulement pour les images dans la zone du header
        const rect = target.getBoundingClientRect()
        const headerRect = headerRef.current.getBoundingClientRect()
        if (rect.top < headerRect.bottom + 100) {
          throttledScheduleDetect()
        }
      }
    }
    document.addEventListener('load', onImageLoad, true)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      timeouts.forEach((t) => clearTimeout(t))
      window.removeEventListener('scroll', throttledScheduleDetect)
      window.removeEventListener('resize', throttledResize)
      window.removeEventListener('load', onLoad)
      document.removeEventListener('load', onImageLoad, true)
      if (mutationObserver) {
        mutationObserver.disconnect()
      }
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
    }
  }, [pathname, simplifiedHeader, reducedObservers])

  // Forcer la détection lors des changements de route ou de page
  useEffect(() => {
    // Utiliser un timeout pour laisser le DOM se mettre à jour
    const timer = window.setTimeout(() => {
      // Déclencher un événement scroll pour forcer la détection
      window.dispatchEvent(new Event('scroll'))
    }, 100)
    return () => window.clearTimeout(timer)
  }, [pathname, searchParams])

  // Forcer la détection lors du pageshow (retour arrière)
  useEffect(() => {
    const handler = () => {
      window.setTimeout(() => {
        window.dispatchEvent(new Event('scroll'))
      }, 50)
    }
    window.addEventListener('pageshow', handler)
    return () => window.removeEventListener('pageshow', handler)
  }, [])

  const isLightBackground = !isTransparent && computeIsLight(bgColor)
  const logoFilter = useMemo(() => {
    const forceLight = isTransparent && linkClass.includes("text-white")
    const tone = forceLight ? "light" : logoTone
    return tone === "dark" ? "brightness(0)" : "none"
  }, [isTransparent, linkClass, logoTone])

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("🧠 Logo tone:", logoTone, "isTransparent:", isTransparent, "bgColor:", bgColor)
    }
  }, [logoTone, isTransparent, bgColor])

  const navLinks = useMemo(() => (
    isFrench
      ? [
          { href: "/expertises", label: "Expertises" },
          { href: "/maintenances-services", label: "Maintenances et Services" },
          { href: "/qualites-certification", label: "Qualités et Certification" },
          { href: "/contact", label: "Contact" }
        ]
      : [
          { href: "/expertises", label: "Expertise" },
          { href: "/maintenances-services", label: "Maintenance & Services" },
          { href: "/qualites-certification", label: "Quality & Certifications" },
          { href: "/contact", label: "Contact" }
        ]
  ), [isFrench])

  const quoteLabel = isFrench ? "Devis" : "Quote"
  const mobileQuote = isFrench ? "Demander un Devis" : "Request a Quote"
  const srBrand = isFrench ? "refrig'air systemes" : "refrig'air systems"
  const languageLabel = isFrench ? "Version" : "Language"
  const toggleButtonLabel = isFrench ? "Passer le site en anglais" : "Switch the site to French"

  return (
    <>
      <motion.header 
        ref={headerRef as any}
        className={`fixed top-0 left-0 right-0 z-[99999] px-2 lg:px-4 pt-4 pb-1 min-h-[3.25rem] sm:min-h-[3.75rem] lg:min-h-[4.25rem] overflow-visible ${mixBlendClass} ${isTransparent ? '' : 'bg-opacity-90'}`}
        initial={false}
        animate={{ 
          backgroundColor: isTransparent ? "rgba(0,0,0,0)" : bgColor 
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className={`${linkClass} text-base lg:text-xl font-light px-2 lg:px-3 transition-colors duration-200 orbit`}
            >
              <Image
                src="/images/general/LOGO_HEADER.svg"
                alt="RAS Energies"
                width={560}
                height={280}
                priority
                className={`h-16 sm:h-20 lg:h-24 w-auto transition-[filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${mixBlendClass}`}
                style={{
                  filter: logoFilter,
                  transform: "scale(2.05)",
                  transformOrigin: "left center"
                }}
              />
              <span className="sr-only">{srBrand}</span>
            </a>
          </div>

          {/* Navigation Desktop */}
          <nav className={`hidden lg:flex items-center space-x-1 ${mixBlendClass}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${linkClass} text-sm lg:text-base font-medium px-2 py-0.5 relative group transition-colors duration-200 satoshi`}
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute bottom-0 left-2 right-2 h-px bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
              </a>
            ))}
          </nav>

          {/* Boutons Desktop */}
          <div className="hidden lg:flex items-center gap-3 group">
            <button
              onClick={toggleLanguage}
              className={`${linkClass} border border-current rounded-sm btn-standard btn-compact hover:opacity-80 transition-colors`}
              aria-label={toggleButtonLabel}
            >
              {isFrench ? "EN" : "FR"}
            </button>
            <a href="/contact#formulaire" className="inline-block">
              <button className={`${linkClass} border border-current rounded-sm btn-standard hover:opacity-80 transition-colors`}>
                {quoteLabel}
              </button>
            </a>
          </div>

          {/* Menu Hamburger Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden ${linkClass} p-2 transition-colors duration-200`}
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.span
                className="w-full h-0.5 bg-current"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="w-full h-0.5 bg-current"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="w-full h-0.5 bg-current"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Menu Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[99998] bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 z-[99999] w-80 max-w-[85vw] h-full bg-[#181823] lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                duration: 0.4, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <div className="p-6 pt-20">
                {/* Logo Mobile */}
                <div className="mb-8">
                  <a
                    href="/"
                    className="text-white text-lg font-light orbit"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src="/images/general/LOGO_HEADER.svg"
                      alt="RAS Energies"
                      width={560}
                      height={280}
                      priority
                      className="h-14 sm:h-18 w-auto transition-[filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        filter: logoFilter,
                        transform: "scale(2.1)",
                        transformOrigin: "left center"
                      }}
                    />
                    <span className="sr-only">{srBrand}</span>
                  </a>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <span className="text-white/60 text-xs uppercase tracking-[0.3em] satoshi">
                    {languageLabel}
                  </span>
                  <button
                    onClick={toggleLanguage}
                    className="text-white border border-white/40 px-3 py-1 rounded-sm uppercase text-xs tracking-[0.2em] transition-opacity hover:opacity-80"
                  >
                    {isFrench ? "EN" : "FR"}
                  </button>
                </div>

                {/* Navigation Mobile */}
                <nav className="space-y-6">
                  {navLinks.map((link) => (
                    <a
                      key={`mobile-${link.href}`}
                      href={link.href}
                      className="block text-white text-lg font-medium py-3 border-b border-white/20 transition-colors hover:text-[#537FE7] satoshi"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Bouton Devis Mobile */}
                <div className="mt-8">
                  <a 
                    href="/contact#formulaire" 
                    className="block w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full bg-[#537FE7] text-white px-8 py-3 rounded-sm btn-effect-5 btn-standard text-lg font-semibold">
                      {mobileQuote}
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
