"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

export default function Header() {
  // Header global
  const headerRef = useRef<HTMLElement | null>(null)
  const [isTransparent, setIsTransparent] = useState<boolean>(true)
  const [bgColor, setBgColor] = useState<string>("rgba(0,0,0,0.4)")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const computeIsLight = (rgb: string) => {
    const m = rgb.match(/rgba?\(([^)]+)\)/)
    if (!m) return false
    const [r, g, b] = m[1].split(",").map((p) => parseFloat(p.trim()))
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    return luminance > 0.6
  }

  const linkClass = useMemo(() => {
    if (isTransparent) return "text-white"
    return computeIsLight(bgColor) ? "text-[#181823]" : "text-white"
  }, [isTransparent, bgColor])

  // Fermer le menu mobile au scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsMobileMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Détection du fond sous le header: image/vidéo → transparent, couleur → héritée
  useEffect(() => {
    let scheduled = false
    const detect = () => {
      scheduled = false
      const headerEl = headerRef.current
      const rect = headerEl?.getBoundingClientRect()
      const sampleY = (rect?.bottom ?? 64) + 1
      const sampleX = Math.round(window.innerWidth / 2)
      const list: Element[] = (document as any).elementsFromPoint
        ? (document as any).elementsFromPoint(sampleX, sampleY)
        : [document.elementFromPoint(sampleX, sampleY)].filter(Boolean) as Element[]
      const base = list.find((el) => headerEl && !headerEl.contains(el)) as HTMLElement | undefined
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
      const res = pickBackground((base as HTMLElement) || null)
      if (res.transparent) {
        setIsTransparent(true)
      } else if (res.color) {
        setIsTransparent(false)
        setBgColor(res.color)
      }
    }
    const onScroll = () => {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(detect)
    }
    detect()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <motion.header 
        ref={headerRef as any}
        className={`fixed top-0 left-0 right-0 z-[99999] p-4 lg:p-6 ${isTransparent ? '' : 'bg-opacity-90'}`}
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
              className={`${linkClass} text-sm lg:text-lg font-light px-2 lg:px-4 py-2 transition-colors duration-200 orbit`}
            >
              refrig'air systemes
            </a>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-2">
            <a
              href="/expertises"
              className={`${linkClass} text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi`}
            >
              <span className="relative z-10">Expertises</span>
              <div className="absolute bottom-1 left-4 right-4 h-px bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
            </a>
            <a
              href="/maintenances-services"
              className={`${linkClass} text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi`}
            >
              <span className="relative z-10">Maintenances et Services</span>
              <div className="absolute bottom-1 left-4 right-4 h-px bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
            </a>
            <a
              href="/qualites-certification"
              className={`${linkClass} text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi`}
            >
              <span className="relative z-10">Qualités et Certification</span>
              <div className="absolute bottom-1 left-4 right-4 h-px bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
            </a>
            <a
              href="/contact"
              className={`${linkClass} text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi`}
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute bottom-1 left-4 right-4 h-px bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
            </a>
          </nav>

          {/* Bouton Devis Desktop */}
          <div className="hidden lg:flex items-center group">
            <a href="/contact#formulaire" className="inline-block">
              <button className={`${linkClass} border border-current px-6 lg:px-8 py-2 rounded-sm hover:opacity-80 transition-colors`}>
                Devis
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
                    refrig'air systemes
                  </a>
                </div>

                {/* Navigation Mobile */}
                <nav className="space-y-6">
                  <a
                    href="/expertises"
                    className="block text-white text-lg font-bold py-3 border-b border-white/20 transition-colors hover:text-[#537FE7] satoshi"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Expertises
                  </a>
                  <a
                    href="/maintenances-services"
                    className="block text-white text-lg font-bold py-3 border-b border-white/20 transition-colors hover:text-[#537FE7] satoshi"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Maintenances et Services
                  </a>
                  <a
                    href="/qualites-certification"
                    className="block text-white text-lg font-bold py-3 border-b border-white/20 transition-colors hover:text-[#537FE7] satoshi"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Qualités et Certification
                  </a>
                  <a
                    href="/contact"
                    className="block text-white text-lg font-bold py-3 border-b border-white/20 transition-colors hover:text-[#537FE7] satoshi"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                </nav>

                {/* Bouton Devis Mobile */}
                <div className="mt-8">
                  <a 
                    href="/contact#formulaire" 
                    className="block w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full bg-[#537FE7] text-white px-8 py-3 rounded-sm btn-effect-5 btn-standard font-bold">
                      Demander un Devis
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
