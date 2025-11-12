"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function ContactHeroContent() {
  const { isFrench } = useLanguage()
  const t = (fr: string, en: string) => (isFrench ? fr : en)

  return (
    <div className="absolute inset-0 px-4 sm:px-6" data-hero-blend="true">
      {/* Titre - Centré à gauche sur mobile, en bas à gauche sur desktop */}
      <motion.h1
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:left-6 sm:translate-x-0 sm:top-auto sm:translate-y-0 sm:bottom-4 md:bottom-6 lg:bottom-8 text-2xl sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold sm:font-light text-white sm:text-[#E9F8F9] leading-tight sm:leading-none tracking-tight orbit uppercase text-center sm:text-left w-full sm:w-auto sm:max-w-none mix-blend-difference z-20"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {t("Contactez nos experts", "Speak with our specialists")}
      </motion.h1>

      {/* Boutons centrés en bas sur mobile, bas-droite sur desktop */}
      <motion.div 
        className="absolute left-4 right-4 sm:left-auto sm:right-4 sm:right-6 bottom-4 sm:bottom-6 md:bottom-8 flex items-center justify-center sm:justify-end gap-2 sm:gap-4 flex-row mix-blend-difference"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <a href="/contact#formulaire" className="w-full sm:w-auto">
          <motion.button 
            className="bg-[#E9F8F9] text-black rounded-sm btn-effect-5 btn-standard w-full whitespace-nowrap mix-blend-difference"
            whileHover={{ scale: 1.02, y: 0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {t("Demander un devis", "Request a quote")}
          </motion.button>
        </a>
        <a href="/contact#infos" className="w-full sm:w-auto">
          <motion.button 
            className="bg-transparent border border-[#E9F8F9]/30 text-[#E9F8F9] rounded-sm btn-effect-5 btn-standard w-full whitespace-nowrap mix-blend-difference"
            whileHover={{ scale: 1.02, y: 0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {t("Nos coordonnées", "Our details")}
          </motion.button>  
        </a>
      </motion.div>
    </div>
  )
}
