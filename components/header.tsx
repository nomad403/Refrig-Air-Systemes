"use client"

import { motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

export default function Header() {
  // Header global
  const headerRef = useRef<HTMLElement | null>(null)
  const [isTransparent, setIsTransparent] = useState<boolean>(true)
  const [bgColor, setBgColor] = useState<string>("rgba(0,0,0,0.4)")

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
    <motion.header 
      ref={headerRef as any}
      className={`fixed top-0 left-0 right-0 z-[99999] p-6 ${isTransparent ? '' : 'bg-opacity-90'}`}
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
          className={`${linkClass} text-lg font-light px-4 py-2 transition-colors duration-200 orbit`}
        >
          refrig'air systemes
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-2">
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

      {/* Bouton Devis */}
      <div className="relative flex items-center group">
        <a href="/contact#formulaire" className="inline-block">
          <button className={`${linkClass} border border-current px-8 py-2 rounded-sm hover:opacity-80 transition-colors`}>
            Devis
          </button>
        </a>
      </div>
      </div>
    </motion.header>
  )
}
