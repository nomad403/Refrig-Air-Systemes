"use client"

import { motion } from "framer-motion"
import LogoGallery from "./logo-gallery"
import Link from "next/link"

export default function HeroContent() {
  return (
    <motion.main className="absolute inset-0 z-20 px-6">
      {/* Carrousel de logos en bas */}
      <motion.div 
        className="absolute left-0 right-0 bottom-24 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <LogoGallery />
      </motion.div>

      {/* Titre en bas à gauche (start bottom), sous le carrousel */}
      <motion.h1
        className="absolute left-6 bottom-8 md:bottom-6 text-lg md:text-3xl lg:text-5xl xl:text-6xl font-light text-[#E9F8F9] leading-none tracking-tight orbit uppercase"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Faire du froid un savoir-faire
      </motion.h1>

      {/* Boutons en bas à droite (end bottom) */}
      <motion.div 
        className="absolute right-6 bottom-8 md:bottom-6 flex items-center justify-end gap-4 flex-wrap"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Link href="/expertises#nos-domaines">
          <motion.button 
            className="px-6 py-3 font-medium text-sm rounded-sm transition-all duration-500 cursor-pointer btn-effect-5"
            whileHover={{ scale: 1.02, y: 0 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Nos services
          </motion.button>
        </Link>
        <Link href="/contact#formulaire">
          <motion.button 
            className="px-6 py-3 font-medium text-sm rounded-sm transition-all duration-500 cursor-pointer btn-effect-5"
            whileHover={{ scale: 1.02, y: 0 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Demander un devis
          </motion.button>  
        </Link>
      </motion.div>
    </motion.main>
  )
}