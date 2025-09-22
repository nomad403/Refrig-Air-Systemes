"use client"

import { motion } from "framer-motion"
import { useScrollDirection } from "../hooks/use-scroll-direction"

export default function Header() {
  const { scrollDirection, scrollY } = useScrollDirection()
  // Déterminer si le header doit être visible
  const isVisible = scrollDirection === "up" || scrollY < 100

  return (
    <motion.header 
      className="sticky top-0 z-30 p-6"
      initial={false}
      animate={{ 
        marginTop: isVisible ? 0 : -80 
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
          className="mix-blend-difference text-white text-lg font-light px-4 py-2 transition-colors duration-200 orbit"
        >
          refrig'air systemes
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-2">
        <a
          href="/expertises"
          className="mix-blend-difference text-white text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi"
        >
          <span className="relative z-10">Expertises</span>
          <div className="absolute bottom-1 left-4 right-4 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
        </a>
        <a
          href="/maintenances-services"
          className="mix-blend-difference text-white text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi"
        >
          <span className="relative z-10">Maintenances et Services</span>
          <div className="absolute bottom-1 left-4 right-4 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
        </a>
        <a
          href="#"
          className="mix-blend-difference text-white text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi"
        >
          <span className="relative z-10">Qualités et Certification</span>
          <div className="absolute bottom-1 left-4 right-4 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
        </a>
        <a
          href="#"
          className="mix-blend-difference text-white text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi"
        >
          <span className="relative z-10">Contact</span>
          <div className="absolute bottom-1 left-4 right-4 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
        </a>
      </nav>

      {/* Bouton Devis */}
      <div className="relative flex items-center group">
        <button className="mix-blend-difference text-white border border-white px-8 py-2 rounded-sm bg-transparent font-medium text-sm transition-all duration-500 hover:bg-white hover:text-black hover:border-white cursor-pointer">
          Devis
        </button>
      </div>
      </div>
    </motion.header>
  )
}
