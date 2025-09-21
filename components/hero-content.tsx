"use client"

import { motion } from "framer-motion"
import LogoGallery from "./logo-gallery"

export default function HeroContent() {
  return (
    <main className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-5xl mx-auto">
        {/* Titre centré - plus petit pour rester sur une ligne */}
        <motion.h1
          className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-light text-[#E9F8F9] leading-none tracking-tight orbit mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Faire du froid un savoir-faire
        </motion.h1>

        {/* Boutons centrés */}
        <motion.div 
          className="flex items-center justify-center gap-6 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <motion.button 
            className="px-6 py-3 bg-transparent border border-[#E9F8F9]/30 text-[#E9F8F9] font-medium text-sm rounded-sm transition-all duration-500 hover:bg-[#E9F8F9] hover:text-black hover:border-[#E9F8F9] cursor-pointer"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            ↲ Nos réalisations
          </motion.button>
          <motion.button 
            className="px-6 py-3 bg-transparent border border-[#E9F8F9]/30 text-[#E9F8F9] font-medium text-sm rounded-sm transition-all duration-500 hover:bg-[#E9F8F9] hover:text-black hover:border-[#E9F8F9] cursor-pointer"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            ↲ Demander un devis
          </motion.button>  
        </motion.div>
      </div>
      
      {/* Logo Gallery des partenaires */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      >
        <LogoGallery />
      </motion.div>
    </main>
  )
}
