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
      {/* Introduction Accroche Premium — disposition 2 colonnes comme home/contact */}
      <motion.section 
        className="py-40 bg-[#181823]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-20">
            {/* Titre à gauche */}
            <div className="flex-1">
              <ScrollSlideTitle
                direction="fromLeft"
                className="text-5xl lg:text-7xl font-bold text-[#E9F8F9] orbit uppercase tracking-tight leading-tight"
              >
                MAINTENANCE ET<br/>SERVICES HAUT DE GAMME
              </ScrollSlideTitle>
            </div>

            {/* Description à droite */}
            <motion.div
              className="flex-1 mt-12 lg:mt-20 space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl lg:text-3xl font-light text-[#537FE7] mb-10">
                Pour vos installations frigorifiques critiques
              </div>
              <p className="text-xl lg:text-2xl text-[#E9F8F9]/80 leading-relaxed mb-8">
                Nous accompagnons les environnements les plus exigeants – data centers, laboratoires pharmaceutiques, industries agroalimentaires et grandes surfaces – avec des contrats de maintenance sur mesure. Sécurité, performance continue et optimisation énergétique, même sans aucune interruption tolérée.
              </p>
              <p className="text-[#537FE7] text-base lg:text-lg">
                —Élevés par l'expertise, animés par la fiabilité.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Types de Maintenance - Style GenCell */}
      <motion.section 
        id="types-maintenance"
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
        </div>
      </motion.section>

      {/* Secteurs d'Application - Pleine largeur */}
      <motion.section 
        id="secteurs"
        className="pt-16 pb-0 bg-[#E9F8F9]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div>
          <motion.div
            className="text-left"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ScrollSlideTitle
              direction="fromLeft"
              className="text-7xl lg:text-9xl font-bold text-[#181823] orbit uppercase tracking-tight leading-tight"
            >
              SECTEURS QUE<br/>NOUS ACCOMPAGNONS
            </ScrollSlideTitle>
          </motion.div>
        </div>

        <div className="space-y-0">
          {/* Data Centers */}
          <motion.div
            className="relative h-80 lg:h-[28rem] overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Image de fond */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
              style={{ backgroundImage: "url('/images/maintenances_services/server_rack.jpg')" }}
            />
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-[#181823]/60 group-hover:bg-[#181823]/50 transition-colors duration-300" />
            {/* Contenu */}
            <div className="relative z-10 h-full flex justify-between items-end">
              {/* Titre en bas à gauche */}
              <div className="flex-1 pl-4">
                <ScrollSlideTitle
                  direction="fromLeft"
                  className="text-5xl lg:text-8xl font-bold text-[#E9F8F9] satoshi uppercase tracking-tight"
                >
                  Data Centers
                </ScrollSlideTitle>
              </div>
              {/* Description à droite */}
              <div className="flex-1 text-right px-8 pb-8">
                <p className="text-lg text-[#E9F8F9]/90 leading-relaxed max-w-md ml-auto">
                  Refroidissement constant, tolérance zéro aux pannes.<br/><br/>
                  Maintenance préventive et corrective pour data centers, salles serveurs et infrastructures IT critiques.<br/><br/>
                  Contrats d'astreinte 24/7, interventions garanties sous 4h en Île-de-France.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Laboratoires */}
          <motion.div
            className="relative h-80 lg:h-[28rem] overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Image de fond */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
              style={{ backgroundImage: "url('/images/maintenances_services/labo.jpeg')" }}
            />
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-[#181823]/60 group-hover:bg-[#181823]/50 transition-colors duration-300" />
            {/* Contenu */}
            <div className="relative z-10 h-full flex justify-between items-end">
              {/* Titre en bas à gauche */}
              <div className="flex-1 pl-4">
                <ScrollSlideTitle
                  direction="fromLeft"
                  className="text-5xl lg:text-8xl font-bold text-[#E9F8F9] satoshi uppercase tracking-tight"
                >
                  Laboratoires
                </ScrollSlideTitle>
              </div>
              {/* Description à droite */}
              <div className="flex-1 text-right px-8 pb-8">
                <p className="text-lg text-[#E9F8F9]/90 leading-relaxed max-w-md ml-auto">
                  Respect normes conservation et validation qualité.<br/><br/>
                  Maintenance climatisation laboratoires pharmaceutiques, centres de recherche et environnements contrôlés.<br/><br/>
                  Conformité GDP, traçabilité complète et interventions certifiées QUALI-FROID.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Agroalimentaire */}
          <motion.div
            className="relative h-80 lg:h-[28rem] overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Image de fond */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
              style={{ backgroundImage: "url('/images/maintenances_services/agro_alimentaire.jpg')" }}
            />
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-[#181823]/60 group-hover:bg-[#181823]/50 transition-colors duration-300" />
            {/* Contenu */}
            <div className="relative z-10 h-full flex justify-between items-end">
              {/* Titre en bas à gauche */}
              <div className="flex-1 pl-4">
                <ScrollSlideTitle
                  direction="fromLeft"
                  className="text-5xl lg:text-8xl font-bold text-[#E9F8F9] satoshi uppercase tracking-tight"
                >
                  Agroalimentaire
                </ScrollSlideTitle>
              </div>
              {/* Description à droite */}
              <div className="flex-1 text-right px-8 pb-8">
                <p className="text-lg text-[#E9F8F9]/90 leading-relaxed max-w-md ml-auto">
                  Chambres froides, chaînes du froid sécurisées.<br/><br/>
                  Maintenance frigorifique pour industrie agroalimentaire, grandes surfaces, restaurants et commerces alimentaires.<br/><br/>
                  Conformité HACCP, contrôles sanitaires et optimisation énergétique garantie.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Industrie */}
          <motion.div
            className="relative h-80 lg:h-[28rem] overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Image de fond */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
              style={{ backgroundImage: "url('/images/maintenances_services/industry.jpg')" }}
            />
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-[#181823]/60 group-hover:bg-[#181823]/50 transition-colors duration-300" />
            {/* Contenu */}
            <div className="relative z-10 h-full flex justify-between items-end">
              {/* Titre en bas à gauche */}
              <div className="flex-1 pl-4">
                <ScrollSlideTitle
                  direction="fromLeft"
                  className="text-5xl lg:text-8xl font-bold text-[#E9F8F9] satoshi uppercase tracking-tight"
                >
                  Industrie
                </ScrollSlideTitle>
              </div>
              {/* Description à droite */}
              <div className="flex-1 text-right px-8 pb-8">
                <p className="text-lg text-[#E9F8F9]/90 leading-relaxed max-w-md ml-auto">
                  Confort thermique et process industriels maîtrisés.<br/><br/>
                  Maintenance climatisation industrielle et commerciale : usines, entrepôts, bureaux et espaces tertiaires.<br/><br/>
                  Solutions HVAC sur mesure, régulation intelligente et maintenance prédictive pour optimiser vos coûts.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Commerces */}
          <motion.div
            className="relative h-80 lg:h-[28rem] overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Image de fond */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
              style={{ backgroundImage: "url('/images/maintenances_services/Coldiretti.jpg')" }}
            />
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-[#181823]/60 group-hover:bg-[#181823]/50 transition-colors duration-300" />
            {/* Contenu */}
            <div className="relative z-10 h-full flex justify-between items-end">
              {/* Titre en bas à gauche */}
              <div className="flex-1 pl-4">
                <ScrollSlideTitle
                  direction="fromLeft"
                  className="text-5xl lg:text-8xl font-bold text-[#E9F8F9] satoshi uppercase tracking-tight"
                >
                  Commerces
                </ScrollSlideTitle>
              </div>
              {/* Description à droite */}
              <div className="flex-1 text-right px-8 pb-8">
                <p className="text-lg text-[#E9F8F9]/90 leading-relaxed max-w-md ml-auto">
                  Confort clients et chaîne du froid maîtrisée.<br/><br/>
                  Maintenance des vitrines réfrigérées, chambres froides et climatisation pour magasins, supermarchés et retail premium.<br/><br/>
                  Interventions rapides, conformité HACCP et optimisation énergétique continue.
                </p>
              </div>
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
            <a href="/contact#formulaire">
              <motion.button 
                className="px-8 py-4 font-medium rounded-sm btn-effect-5"
                whileHover={{ scale: 1.05, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Demander un Audit Gratuit
              </motion.button>
            </a>
            <a href="/maintenances-services#types-maintenance">
              <motion.button 
                className="px-8 py-4 font-medium rounded-sm btn-effect-5"
                whileHover={{ scale: 1.05, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Nos solutions de maintenance
              </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
