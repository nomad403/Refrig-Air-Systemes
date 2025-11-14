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
      return
    }
    
    let scheduled = false
    let rafId: number | null = null
    let timeouts: number[] = []

    const parseCssColor = (input?: string | null): number | null => {
      if (!input) return null
      const value = input.trim()
      if (!value || value === "transparent" || value === "none") return null

      const rgbMatch = value.match(/^rgba?\(([^)]+)\)$/)
      let r: number, g: number, b: number

      if (rgbMatch) {
        ;[r, g, b] = rgbMatch[1]
          .split(",")
          .map((part) => parseFloat(part.trim()))
        if (rgbMatch[0].startsWith("rgba")) {
          const alpha = parseFloat(rgbMatch[1].split(",").pop()!.trim())
          if (alpha === 0) return null
        }
      } else if (value.startsWith("#")) {
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
        if (typeof document === "undefined") return null
        const temp = document.createElement("span")
        temp.style.display = "none"
        temp.style.color = value
        document.body.appendChild(temp)
        const computed = window.getComputedStyle(temp).color
        document.body.removeChild(temp)
        return parseCssColor(computed)
      }

      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
      return isNaN(luminance) ? null : luminance
    }

    const detect = () => {
      scheduled = false
      const headerEl = headerRef.current
      if (!headerEl) return
      const rect = headerEl.getBoundingClientRect()
      const sampleY = (rect.bottom ?? 64) + 1
      const sampleX = Math.round(window.innerWidth / 2)
      const list: Element[] = (document as any).elementsFromPoint
        ? (document as any).elementsFromPoint(sampleX, sampleY)
        : [document.elementFromPoint(sampleX, sampleY)].filter(Boolean) as Element[]
      const base = list.find((el) => !headerEl.contains(el)) as HTMLElement | undefined
      const pickBackground = (el: HTMLElement | null): { transparent: boolean; color?: string } => {
        let node: HTMLElement | null = el
        while (node && node !== document.body) {
          const tag = node.tagName
          if (tag === 'IFRAME' || tag === 'VIDEO' || tag === 'IMG' || tag === 'CANVAS') {
            return { transparent: true }
          }
          const cs = window.getComputedStyle(node)
          if (cs.backgroundImage && cs.backgroundImage !== 'none') {
            return { transparent: true }
          }
          if (cs.backgroundColor && cs.backgroundColor !== 'transparent' && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') {
            return { transparent: false, color: cs.backgroundColor }
          }
          node = node.parentElement
        }
        return { transparent: true }
      }
      const res = pickBackground(base || null)
      const withinHeroBlend = base
        ? (base as HTMLElement).closest?.("[data-hero-blend='true']")
        : null
      const updateLogoTone = (luminance: number | null) => {
        if (luminance === null) return
        setLogoTone(luminance > 0.6 ? "dark" : "light")
      }
      if (res.transparent) {
        setIsTransparent(true)
        setShouldBlendDifference(Boolean(withinHeroBlend))
        if (base) {
          const cs = window.getComputedStyle(base)
          const candidates = [
            cs.getPropertyValue("background-color"),
            cs.getPropertyValue("color"),
            cs.getPropertyValue("border-top-color"),
            cs.getPropertyValue("border-right-color"),
            cs.getPropertyValue("border-bottom-color"),
            cs.getPropertyValue("border-left-color")
          ]
          for (const candidate of candidates) {
            const luminance = parseCssColor(candidate)
            if (luminance !== null) {
              updateLogoTone(luminance)
              break
            }
          }
        }
      } else if (res.color) {
        setIsTransparent(false)
        setShouldBlendDifference(false)
        setBgColor(res.color)
        const luminance = parseCssColor(res.color)
        updateLogoTone(luminance)
      } else {
        setShouldBlendDifference(false)
      }
    }

    // Détecter si on est sur mobile
    const isMobileDevice = typeof window !== "undefined" && window.innerWidth <= 768

    const scheduleDetect = () => {
      if (scheduled) return
      scheduled = true
      rafId = requestAnimationFrame(detect)
    }

    // Throttler scheduleDetect sur mobile pour réduire la charge
    let lastScheduleTime = 0
    const throttledScheduleDetect = () => {
      const now = Date.now()
      const throttleDelay = isMobileDevice ? 200 : 50
      if (now - lastScheduleTime < throttleDelay) return
      lastScheduleTime = now
      scheduleDetect()
    }

    setIsTransparent(true)
    setBgColor("rgba(0,0,0,0.4)")

    scheduleDetect()
    timeouts.push(window.setTimeout(scheduleDetect, 50))
    timeouts.push(window.setTimeout(scheduleDetect, 200))
    timeouts.push(window.setTimeout(scheduleDetect, 500))

    window.addEventListener('scroll', throttledScheduleDetect, { passive: true })
    
    // Throttler aussi le resize
    let resizeTimeout: NodeJS.Timeout | null = null
    const throttledResize = () => {
      if (resizeTimeout) return
      resizeTimeout = setTimeout(() => {
        scheduleDetect()
        resizeTimeout = null
      }, isMobileDevice ? 300 : 100)
    }
    window.addEventListener('resize', throttledResize, { passive: true })
    window.addEventListener('load', scheduleDetect)

    const onReadyStateChange = () => scheduleDetect()
    document.addEventListener('readystatechange', onReadyStateChange)

    // Sur mobile avec reducedObservers, désactiver complètement le MutationObserver
    let mutationObserver: MutationObserver | null = null
    
    if (!reducedObservers) {
      mutationObserver = new MutationObserver(() => {
        if (isMobileDevice) {
          throttledScheduleDetect()
        } else {
          scheduleDetect()
        }
      })
      
      // Sur mobile, observer seulement le header et les sections principales
      if (isMobileDevice && headerRef.current) {
        const mainContent = document.querySelector('main') || document.body
        mutationObserver.observe(mainContent, {
          childList: true,
          subtree: false, // Ne pas observer récursivement sur mobile
          attributes: true,
          attributeFilter: ['style', 'class']
        })
      } else {
        mutationObserver.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class']
        })
      }
    }

    const onImageLoad = (event: Event) => {
      const target = event.target as HTMLElement | null
      if (target && headerRef.current && !headerRef.current.contains(target)) {
        scheduleDetect()
      }
    }
    document.addEventListener('load', onImageLoad, true)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      timeouts.forEach((t) => clearTimeout(t))
      window.removeEventListener('scroll', throttledScheduleDetect)
      window.removeEventListener('resize', throttledResize)
      window.removeEventListener('load', scheduleDetect)
      document.removeEventListener('readystatechange', onReadyStateChange)
      document.removeEventListener('load', onImageLoad, true)
      if (mutationObserver) {
        mutationObserver.disconnect()
      }
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
    }
  }, [pathname, simplifiedHeader, reducedObservers])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const headerEl = headerRef.current
      if (!headerEl) return
      const event = new Event('force-header-detect')
      headerEl.dispatchEvent(event)
    }, 50)
    return () => window.clearTimeout(timer)
  }, [pathname, searchParams])

  useEffect(() => {
    const headerEl = headerRef.current
    if (!headerEl) return
    const handler = () => {
      const event = new Event('force-header-detect')
      headerEl.dispatchEvent(event)
    }
    window.addEventListener('pageshow', handler)
    return () => window.removeEventListener('pageshow', handler)
  }, [])

  useEffect(() => {
    const headerEl = headerRef.current
    if (!headerEl) return
    const onForceDetect = () => {
      const event = new Event('scroll')
      window.dispatchEvent(event)
    }
    headerEl.addEventListener('force-header-detect', onForceDetect)
    return () => headerEl.removeEventListener('force-header-detect', onForceDetect)
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
