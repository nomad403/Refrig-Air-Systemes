"use client"

import { motion } from "framer-motion"

export default function MaintenanceHeroContent() {
  return (
    <div className="absolute inset-0 z-20 px-4 sm:px-6">
      {/* Titre bas-gauche */}
      <motion.h1
        className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 md:bottom-8 text-sm sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light text-[#E9F8F9] leading-tight sm:leading-none tracking-tight orbit uppercase max-w-[60%] sm:max-w-none"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Maintenances & services
      </motion.h1>

      {/* Boutons bas-droite */}
      <motion.div 
        className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 md:bottom-8 flex items-center justify-end gap-2 sm:gap-4 flex-col sm:flex-row"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <a href="/maintenances-services#types-maintenance" className="w-full sm:w-auto">
          <motion.button 
            className="bg-[#E9F8F9] text-black rounded-sm border border-white btn-effect-5 btn-standard w-full whitespace-nowrap"
            whileHover={{ scale: 1.05, y: 0}}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Nos contrats maintenance
          </motion.button>
        </a>
        <a href="/maintenances-services#secteurs" className="w-full sm:w-auto">
          <motion.button 
            className="bg-transparent rounded-sm border border-white btn-effect-5 btn-standard w-full whitespace-nowrap"
            whileHover={{ scale: 1.05, y: 0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Secteurs d'application
          </motion.button>  
        </a>
      </motion.div>
    </div>
  )
}
