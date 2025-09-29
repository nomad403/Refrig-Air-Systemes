"use client"

import { motion } from "framer-motion"

export default function QualitesHeroContent() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Titre principal */}
        <motion.h1 
          className="text-3xl md:text-5xl font-light mb-8 text-white leading-tight orbit"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Qualités et Certifications
        </motion.h1>

        {/* Sous-titre */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed satoshi font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Excellence technique, conformité réglementaire 
          <br />
          et engagement qualité premium.
        </motion.p>

        {/* CTA */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <button className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-sm font-medium transition-all duration-300 satoshi">
            Demander un Devis
          </button>
          <button className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-sm font-medium transition-all duration-300 satoshi">
            Nos Certifications
          </button>
        </motion.div>
      </div>
    </div>
  )
}

