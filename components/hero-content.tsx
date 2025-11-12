"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
const LogoGallery = dynamic(() => import("./logo-gallery"), { ssr: false })
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function HeroContent() {
  const { isFrench } = useLanguage()
  const heroTitle = isFrench ? "Faire du froid un savoir-faire" : "Turning cooling into expertise"
  const servicesLabel = isFrench ? "Nos services" : "Our services"
  const quoteLabel = isFrench ? "Demander un devis" : "Request a quote"

  return (
    <motion.main className="absolute inset-0 px-4 sm:px-6" data-hero-blend="true">
      {/* Carrousel de logos en bas */}
      <motion.div
        className="absolute left-0 right-0 bottom-32 sm:bottom-28 md:bottom-32 lg:bottom-40 px-4 sm:px-6 mix-blend-difference"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <LogoGallery />
      </motion.div>

      {/* Titre - Centré sur mobile, en bas à gauche sur desktop */}
      <motion.h1
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:left-6 sm:translate-x-0 sm:top-auto sm:translate-y-0 sm:bottom-4 md:bottom-6 lg:bottom-8 text-2xl sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold sm:font-light text-white sm:text-[#E9F8F9] leading-tight sm:leading-none tracking-tight orbit uppercase text-center sm:text-left w-full sm:w-auto sm:max-w-none mix-blend-difference z-20"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {heroTitle}
      </motion.h1>

      {/* Boutons centrés en bas sur mobile, bas-droite sur desktop */}
      <motion.div
        className="absolute left-4 right-4 sm:left-auto sm:right-4 sm:right-6 bottom-4 sm:bottom-6 md:bottom-8 flex items-center justify-center sm:justify-end gap-2 sm:gap-4 flex-row mix-blend-difference"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Link href="/expertises#nos-domaines" className="w-full sm:w-auto">
          <motion.button 
            className="rounded-sm transition-all duration-500 btn-effect-5 btn-standard whitespace-nowrap w-full mix-blend-difference"
            whileHover={{ scale: 1.02, y: 0 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {servicesLabel}
          </motion.button>
        </Link>
        <Link href="/contact#formulaire" className="w-full sm:w-auto">
          <motion.button 
            className="rounded-sm transition-all duration-500 btn-effect-5 btn-standard whitespace-nowrap w-full mix-blend-difference"
            whileHover={{ scale: 1.02, y: 0 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {quoteLabel}
          </motion.button>  
        </Link>
      </motion.div>
    </motion.main>
  )
}