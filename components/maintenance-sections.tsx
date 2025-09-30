"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import TrimmedImage from "./trimmed-image"
import ScrollSlideTitle from "./scroll-slide-title"
import { useEffect, useState } from "react"

// Composant pour animer les compteurs
function AnimatedCounter({ 
  value, 
  duration = 2, 
  delay = 0,
  prefix = "",
  suffix = "" 
}: { 
  value: number, 
  duration?: number, 
  delay?: number,
  prefix?: string,
  suffix?: string 
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  const animateCounter = () => {
    if (hasAnimated) return
    setHasAnimated(true)
    
    let start = 0
    const end = value
    const increment = end / (duration * 60) // 60 FPS
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setDisplayValue(end)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(start))
      }
    }, 1000 / 60)
  }

  return (
    <motion.div
      className="text-[#537FE7] text-6xl font-bold mb-4 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      onViewportEnter={() => setTimeout(animateCounter, delay * 1000)}
    >
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="inline-block"
      >
        {prefix}{displayValue}{suffix}
      </motion.div>
    </motion.div>
  )
}

export default function MaintenanceSections() {
  return (
    <div className="relative z-20 bg-[#181823]">
      {/* Introduction Accroche Premium */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-[#181823] text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl lg:text-5xl font-light text-[#E9F8F9] mb-8 leading-tight orbit"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            MAINTENANCE ET SERVICES HAUT DE GAMME
          </motion.h2>
          <motion.div
            className="text-xl lg:text-2xl font-light text-[#537FE7] mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Pour vos installations frigorifiques critiques
          </motion.div>
          <motion.p
            className="text-lg text-[#E9F8F9]/80 max-w-4xl mx-auto leading-relaxed mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Nous accompagnons les environnements les plus exigeants – data centers, laboratoires pharmaceutiques, industries agroalimentaires et grandes surfaces – avec des contrats de maintenance sur mesure. Notre priorité : sécurité, performance continue et optimisation énergétique, même dans les environnements où aucune interruption n'est tolérée.
          </motion.p>
          <motion.p
            className="text-[#537FE7] text-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            —Élevés par l'expertise, animés par la fiabilité.
          </motion.p>
        </div>
      </motion.section>

      {/* Types de Maintenance - Style GenCell */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-[#E9F8F9]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-[#181823] mb-6 orbit">
              Nos Solutions de Maintenance
            </h2>
            <p className="text-[#537FE7] text-lg">[adaptées à vos enjeux critiques]</p>
          </motion.div>

          {/* Maintenance Préventive */}
          <motion.div
            className="mb-16 border-b border-[#181823]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 01 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#181823] mb-4 orbit">
                  Maintenance Préventive
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  Inspections régulières, contrôles de performance, anticipation des pannes.
                </p>
                <div className="space-y-4">
                  <p className="text-[#181823]/80 leading-relaxed">
                    Inspections systématiques selon un planning optimisé, contrôles de performance énergétique, nettoyage approfondi des échangeurs et vérification des points critiques. Remplacement préventif des pièces d'usure avant défaillance pour garantir une disponibilité maximale.
                  </p>
                  <p className="text-[#181823]/80 leading-relaxed">
                    Nos techniciens certifiés QUALI-FROID interviennent avec des protocoles stricts adaptés à chaque secteur : traçabilité pharmaceutique, normes HACCP agroalimentaire, uptime data center.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Maintenance Corrective */}
          <motion.div
            className="mb-16 border-b border-[#181823]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 02 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#181823] mb-4 orbit">
                  Maintenance Corrective
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  Intervention rapide et efficace en cas de dysfonctionnement critique.
                </p>
                <div className="space-y-4">
                  <p className="text-[#181823]/80 leading-relaxed">
                    Service d'urgence 24/7 avec astreinte dédiée pour vos installations critiques. Diagnostic rapide par nos experts, intervention immédiate avec un stock stratégique de pièces détachées pour minimiser les temps d'arrêt.
                  </p>
                  <p className="text-[#181823]/80 leading-relaxed">
                    Équipes mobiles équipées d'outils de diagnostic avancés, véhicules-ateliers pour interventions complexes et solutions temporaires de secours pour assurer la continuité de service.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Maintenance Prédictive */}
          <motion.div
            className="mb-16 border-b border-[#181823]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 03 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#181823] mb-4 orbit">
                  Maintenance Prédictive
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  Capteurs connectés et suivi temps réel pour anticiper les anomalies.
                </p>
                <div className="space-y-4">
                  <p className="text-[#181823]/80 leading-relaxed">
                    Technologies IoT et intelligence artificielle pour analyser les données de fonctionnement : vibrations, températures, pressions, consommations énergétiques. Alertes automatiques en cas de dérive détectée, idéal pour data centers et environnements pharmaceutiques.
                  </p>
                  <p className="text-[#181823]/80 leading-relaxed">
                    Tableaux de bord en temps réel, rapports prédictifs mensuels et recommandations d'optimisation pour maximiser la durée de vie de vos équipements tout en réduisant les coûts d'exploitation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contrats Sur Mesure */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 04 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#181823] mb-4 orbit">
                  Contrats Sur Mesure
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  Fréquence et niveau de service adaptés à votre secteur d'activité.
                </p>
                <div className="space-y-4">
                  <p className="text-[#181823]/80 leading-relaxed">
                    Contrats premium modulables selon vos exigences : astreinte 24/7 pour data centers, interventions programmées pour laboratoires, maintenance saisonnière pour grandes surfaces. SLA personnalisés avec garanties de temps d'intervention.
                  </p>
                  <p className="text-[#181823]/80 leading-relaxed">
                    Facturation transparente, planning d'interventions optimisé et support technique dédié avec un interlocuteur unique pour simplifier la gestion de vos installations critiques.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Premium Associés */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-[#181823]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-[#E9F8F9] mb-6 orbit">
              Services Conçus pour vos Enjeux Stratégiques
            </h2>
            <p className="text-[#537FE7] text-lg">[notre valeur ajoutée premium]</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Support 24/7 */}
            <motion.div
              className="border border-[#E9F8F9]/20 p-8 hover:border-[#E9F8F9]/40 transition-colors duration-200 group transform-gpu backface-hidden bg-[#E9F8F9]/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#537FE7]/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-[#537FE7]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.6 20 4 16.4 4 12S7.6 4 12 4 20 7.6 20 12 16.4 20 12 20M12 6C9.8 6 8 7.8 8 10V14C8 16.2 9.8 18 12 18S16 16.2 16 14V10C16 7.8 14.2 6 12 6M12 16C10.9 16 10 15.1 10 14V10C10 8.9 10.9 8 12 8S14 8.9 14 10V14C14 15.1 13.1 16 12 16Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#E9F8F9]">Support 24/7 & Astreintes</h3>
              </div>
              <p className="text-[#E9F8F9]/80 leading-relaxed">
                Interventions garanties en urgence pour limiter tout arrêt d'activité. Astreinte technique dédiée aux installations critiques avec engagement de temps d'intervention personnalisé selon votre secteur.
              </p>
            </motion.div>

            {/* Contrôle Avancé */}
            <motion.div
              className="border border-[#E9F8F9]/20 p-8 hover:border-[#E9F8F9]/40 transition-colors duration-200 group transform-gpu backface-hidden bg-[#E9F8F9]/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#537FE7]/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-[#537FE7]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 13H1V11H3V13M3 17H1V15H3V17M3 9H1V7H3V9M8 13H6V11H8V13M8 17H6V15H8V17M8 9H6V7H8V9M13 13H11V11H13V13M13 17H11V15H13V17M13 9H11V7H13V9M23 15V13H21V11H19V9H17V7H15V5H13V3H11V1H9V3H7V5H5V7H3V9H1V11H3V13H1V15H3V17H5V19H7V21H9V23H11V21H13V19H15V17H17V15H19V13H21V15H23Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#E9F8F9]">Contrôle & Régulation Avancés</h3>
              </div>
              <p className="text-[#E9F8F9]/80 leading-relaxed">
                Systèmes de supervision connectés, alertes automatiques et reporting mensuel détaillé. Tableau de bord temps réel pour un suivi permanent de vos installations critiques.
              </p>
            </motion.div>

            {/* Optimisation Énergétique */}
            <motion.div
              className="border border-[#E9F8F9]/20 p-8 hover:border-[#E9F8F9]/40 transition-colors duration-200 group transform-gpu backface-hidden bg-[#E9F8F9]/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#537FE7]/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-[#537FE7]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3M12 12L20 7.5M12 12V21M12 12L4 7.5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#E9F8F9]">Optimisation Énergétique</h3>
              </div>
              <p className="text-[#E9F8F9]/80 leading-relaxed">
                Réduction des consommations grâce à nos solutions innovantes : récupération d'énergie, équipements à haut rendement, régulation intelligente et analyse des performances énergétiques.
              </p>
            </motion.div>

            {/* Conformité Réglementaire */}
            <motion.div
              className="border border-[#E9F8F9]/20 p-8 hover:border-[#E9F8F9]/40 transition-colors duration-200 group transform-gpu backface-hidden bg-[#E9F8F9]/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#537FE7]/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-[#537FE7]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#E9F8F9]">Conformité Réglementaire</h3>
              </div>
              <p className="text-[#E9F8F9]/80 leading-relaxed">
                Suivi des fluides frigorigènes, respect des normes environnementales et traçabilité complète. Mise en conformité HACCP, GDP, et autres référentiels selon votre secteur d'activité.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Engagements Qualité avec Chiffres */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-[#E9F8F9]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-[#181823] mb-6 orbit">
              Nos Engagements Qualité
            </h2>
            <p className="text-[#537FE7] text-lg">[des garanties mesurables]</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Temps d'intervention */}
            <motion.div
              className="text-center p-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter value={4} delay={0.5} prefix="≤ " suffix="h" />
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <motion.h3 
                  className="text-lg font-medium text-[#181823] mb-2"
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  Temps d'Intervention
                </motion.h3>
              </motion.div>
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-[#181823]/60 text-sm"
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  Garanti en Île-de-France pour vos urgences
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Disponibilité */}
            <motion.div
              className="text-center p-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter value={99} delay={0.7} prefix="> " suffix="%" />
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <motion.h3 
                  className="text-lg font-medium text-[#181823] mb-2"
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  Taux de Disponibilité
                </motion.h3>
              </motion.div>
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-[#181823]/60 text-sm"
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  Sur nos installations critiques
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Équipe Certifiée */}
            <motion.div
              className="text-center p-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter value={100} delay={0.9} suffix="%" />
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                viewport={{ once: true }}
              >
                <motion.h3 
                  className="text-lg font-medium text-[#181823] mb-2"
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  Équipe Certifiée
                </motion.h3>
              </motion.div>
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-[#181823]/60 text-sm"
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  QUALI-FROID et RGE
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Traçabilité */}
            <motion.div
              className="text-center p-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter value={24} delay={1.1} prefix="" suffix="/7" />
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                viewport={{ once: true }}
              >
                <motion.h3 
                  className="text-lg font-medium text-[#181823] mb-2"
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  Traçabilité
                </motion.h3>
              </motion.div>
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-[#181823]/60 text-sm"
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  Rapports et suivi en temps réel
                </motion.p>
              </motion.div>
            </motion.div>
          </div>

          {/* Secteurs d'Application */}
          <motion.div
            className="py-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl lg:text-4xl font-light text-[#181823] mb-6 orbit">
                Secteurs que Nous Accompagnons
              </h3>
            </motion.div>

            <div className="space-y-24 lg:space-y-32">
              {/* Data Centers - Image à gauche, texte à droite */}
              <motion.div
                className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-full lg:w-1/2 h-80 lg:h-96 flex items-center justify-center relative">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="text-4xl lg:text-6xl font-bold text-[#181823]/10 mb-4 satoshi uppercase tracking-tight absolute z-0 top-0 left-0 w-full"
                  >
                    Data Centers
                  </ScrollSlideTitle>
                  <TrimmedImage 
                    src="/images/maintenances_services/server_rack.png" 
                    alt="Data Centers"
                    className="w-auto h-auto max-h-full max-w-full relative z-10"
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left relative">
                  <p className="text-lg text-[#181823]/70 leading-relaxed">
                    Refroidissement constant, tolérance zéro aux pannes
                  </p>
                </div>
              </motion.div>

              {/* Laboratoires - Image à droite, texte à gauche */}
              <motion.div
                className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-full lg:w-1/2 h-64 lg:h-80 flex items-center justify-center relative">
                  <ScrollSlideTitle
                    direction="fromRight"
                    className="text-4xl lg:text-6xl font-bold text-[#181823]/10 mb-4 satoshi uppercase tracking-tight absolute z-0 top-0 right-0 w-full"
                  >
                    Laboratoires
                  </ScrollSlideTitle>
                  <TrimmedImage
                    src="/images/maintenances_services/labo.png"
                    alt="Laboratoires"
                    className="w-auto h-auto max-h-full max-w-full relative z-10"
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-right relative">
                  <p className="text-lg text-[#181823]/70 leading-relaxed">
                    Respect normes conservation et validation qualité
                  </p>
                </div>
              </motion.div>

              {/* Agroalimentaire - Image à gauche, texte à droite */}
              <motion.div
                className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-full lg:w-1/2 h-64 lg:h-80 flex items-center justify-center relative">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="text-4xl lg:text-6xl font-bold text-[#181823]/10 mb-4 satoshi uppercase tracking-tight absolute z-0 top-0 left-0 w-full"
                  >
                    Agroalimentaire
                  </ScrollSlideTitle>
                  <TrimmedImage 
                    src="/images/maintenances_services/agro_alimentaire.png" 
                    alt="Agroalimentaire"
                    className="w-auto h-auto max-h-full max-w-full relative z-10"
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left relative">
                  <p className="text-lg text-[#181823]/70 leading-relaxed">
                    Chambres froides, chaînes du froid sécurisées
                  </p>
                </div>
              </motion.div>

              {/* Industrie - Image à droite, texte à gauche */}
              <motion.div
                className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-full lg:w-1/2 h-64 lg:h-80 flex items-center justify-center relative">
                  <ScrollSlideTitle
                    direction="fromRight"
                    className="text-4xl lg:text-6xl font-bold text-[#181823]/10 mb-4 satoshi uppercase tracking-tight absolute z-0 top-0 right-0 w-full"
                  >
                    Industrie
                  </ScrollSlideTitle>
                  <TrimmedImage
                    src="/images/maintenances_services/industry.png"
                    alt="Industrie"
                    className="w-auto h-auto max-h-full max-w-full relative z-10"
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-right relative">
                  <p className="text-lg text-[#181823]/70 leading-relaxed">
                    Confort thermique et process industriels maîtrisés
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Premium */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-[#181823] text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl lg:text-4xl font-light text-[#E9F8F9] mb-6 orbit"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Protégez vos Installations Critiques
          </motion.h2>
          <motion.p
            className="text-lg text-[#E9F8F9]/80 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Avec un partenaire de confiance pour votre maintenance frigorifique. Contrats sur mesure, interventions garanties et expertise reconnue dans les environnements les plus exigeants.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="px-8 py-4 bg-[#537FE7] text-[#E9F8F9] font-medium rounded-sm hover:bg-[#537FE7]/90 transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Demander un Audit Gratuit
            </motion.button>
            <motion.button 
              className="px-8 py-4 border border-[#E9F8F9]/30 text-[#E9F8F9] font-medium rounded-sm hover:bg-[#E9F8F9] hover:text-[#181823] transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Contrat de Maintenance
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
