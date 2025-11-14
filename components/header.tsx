"use client"

import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { usePerformance } from "@/contexts/performance-context"
import { useEffect, useMemo, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useHeaderToneDynamic } from "@/hooks/use-header-tone-dynamic"

export default function Header() {
  // Header global
  const headerRef = useRef<HTMLElement | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isFrench, toggleLanguage } = useLanguage()
  
  // Hook robuste pour détecter le tone et si on est sur le Hero
  const { tone, isOverHero, backgroundColor } = useHeaderToneDynamic()

  // Classes dynamiques basées sur le hook
  const linkClass = useMemo(() => {
    if (isOverHero) {
      // Sur Hero : mix-blend-difference actif, texte blanc
      return "text-white mix-blend-difference"
    }
    // Hors Hero : couleur adaptée au fond
    return tone === "dark" ? "text-[#181823]" : "text-white"
  }, [tone, isOverHero])
  
  const mixBlendClass = isOverHero ? "mix-blend-difference" : ""
  
  // Tone du logo : dark = noir (brightness(0)), light = blanc (pas de filtre)
  const logoFilter = useMemo(() => {
    if (isOverHero) {
      // Sur Hero avec mix-blend, pas besoin de filtre
      return "none"
    }
    // Hors Hero : adapter selon le fond
    return tone === "dark" ? "brightness(0)" : "none"
  }, [tone, isOverHero])
  
  // Background du header : transparent sur Hero, couleur exacte du fond sur les autres sections
  const headerBg = useMemo(() => {
    if (isOverHero) {
      return "rgba(0,0,0,0)"
    }
    // Utiliser la couleur exacte du fond (sans opacité)
    return backgroundColor
  }, [isOverHero, backgroundColor])

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
        role="banner"
        aria-label="En-tête principal"
        className={`fixed top-0 left-0 right-0 z-[99999] px-2 lg:px-4 pt-4 pb-1 min-h-[3.25rem] sm:min-h-[3.75rem] lg:min-h-[4.25rem] overflow-visible ${mixBlendClass} transition-all duration-200`}
        initial={false}
        animate={{ 
          backgroundColor: headerBg
        }}
        transition={{ 
          duration: 0.2, 
          ease: [0.4, 0, 0.2, 1] 
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
          <nav role="navigation" aria-label="Navigation principale" className={`hidden lg:flex items-center space-x-1 ${mixBlendClass}`}>
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
