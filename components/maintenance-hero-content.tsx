"use client"

import { motion } from "framer-motion"

export default function MaintenanceHeroContent() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-5xl mx-auto">
        {/* Titre principal */}
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#E9F8F9] leading-none tracking-tight orbit mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Maintenances & services
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg lg:text-xl text-[#E9F8F9]/80 mb-12 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Solutions de maintenance premium pour vos installations critiques. 
          Data centers, laboratoires, industrie : zéro interruption tolérée.
        </motion.p>

        {/* Boutons CTA */}
        <motion.div 
          className="flex items-center justify-center gap-6 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <motion.button 
            className="px-8 py-4 bg-[#E9F8F9] text-black font-medium text-sm rounded-sm transition-all duration-500 hover:bg-[#537FE7]/90 hover:text-white cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            ↲ Nos contrats maintenance
          </motion.button>
          <motion.button 
            className="px-8 py-4 bg-transparent border border-[#E9F8F9]/30 text-[#E9F8F9] font-medium text-sm rounded-sm transition-all duration-500 hover:bg-[#E9F8F9] hover:text-black hover:border-[#E9F8F9] cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            ↲ Audit gratuit
          </motion.button>  
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex flex-col items-center text-[#E9F8F9]/60">
          <span className="text-xs mb-2 tracking-wider">DÉCOUVRIR</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
