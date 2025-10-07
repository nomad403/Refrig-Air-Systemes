"use client"

import { motion } from "framer-motion"

export default function QualitesHeroContent() {
  return (
    <div className="absolute inset-0 z-20 px-6">
      {/* Titre bas-gauche */}
      <motion.h1 
        className="absolute left-6 bottom-8 md:bottom-6 text-lg md:text-3xl lg:text-5xl xl:text-6xl font-light text-white leading-tight orbit uppercase"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Qualités & Certifications
      </motion.h1>

      {/* CTA bas-droite */}
      <motion.div 
        className="absolute right-6 bottom-8 md:bottom-6 flex items-center justify-end gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <a href="/contact#formulaire" className="satoshi">
          <motion.button 
            className="px-8 py-4 bg-[#E9F8F9] text-black font-medium text-sm rounded-sm btn-effect-5"
            whileHover={{ scale: 1.05, y: 0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Demander un Devis
          </motion.button>
        </a>
        <a href="#certifications" className="satoshi">
          <motion.button 
            className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium text-sm rounded-sm btn-effect-5"
            whileHover={{ scale: 1.05, y: 0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Nos Certifications
          </motion.button>
        </a>
      </motion.div>
    </div>
  )
}

