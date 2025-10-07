"use client"

import { motion } from "framer-motion"

export default function ExpertiseHeroContent() {
  return (
    <div className="absolute inset-0 z-20 px-6">
      {/* Titre bas-gauche */}
      <motion.h1
        className="absolute left-6 bottom-8 md:bottom-6 text-lg md:text-3xl lg:text-5xl xl:text-6xl font-light text-[#E9F8F9] leading-none tracking-tight orbit uppercase"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Expertise frigorifique
      </motion.h1>

      {/* Boutons bas-droite */}
      <motion.div 
        className="absolute right-6 bottom-8 md:bottom-6 flex items-center justify-end gap-4 flex-wrap"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <a href="/expertises#nos-domaines">
          <motion.button 
            className="px-8 py-4 bg-[#E9F8F9] text-black font-medium text-sm rounded-sm btn-effect-5"
            whileHover={{ scale: 1.05, y: 0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Découvrir nos expertises
          </motion.button>
        </a>
        <a href="/contact#formulaire">
          <motion.button 
            className="px-8 py-4 bg-transparent border border-[#E9F8F9]/30 text-[#E9F8F9] font-medium text-sm rounded-sm btn-effect-5"
            whileHover={{ scale: 1.05, y: 0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Audit technique gratuit
          </motion.button>  
        </a>
      </motion.div>
    </div>
  )
}
