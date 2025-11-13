"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import TrimmedImage from "./trimmed-image"
import ScrollSlideTitle from "./scroll-slide-title"
import { useLanguage } from "@/contexts/language-context"

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
  const [openDescriptions, setOpenDescriptions] = useState<{ [key: string]: boolean }>({})
  const { isFrench } = useLanguage()
  const t = (fr: string, en: string) => (isFrench ? fr : en)

  const sectorsContent = {
    "data-centers": {
      label: t("Data Centers", "Data Centers"),
      title: t("Maintenance Data Center — Paris & Île‑de‑France", "Data Centre Maintenance — Paris & Île-de-France"),
      description: t(
        "Refroidissement continu pour salles serveurs, baies IT et locaux techniques. Zéro tolérance aux arrêts : supervision 24/7, redondance et plans de continuité pour sécuriser vos charges critiques.",
        "Continuous cooling for server rooms, IT racks and technical areas. Zero tolerance for downtime: 24/7 supervision, redundancy and continuity plans to secure critical loads."
      ),
      bullets: [
        t("Audit thermique, confinement allées froides/chaudes", "Thermal audit, hot/cold aisle containment"),
        t("Monitoring en temps réel, alertes proactives", "Real-time monitoring, proactive alerts"),
        t("SLA d’intervention ≤ 4h en Île‑de‑France", "Response SLA ≤ 4h across Île-de-France"),
        t("Optimisation énergétique et réglages fins (setpoints, débits)", "Energy optimisation and fine-tuned settings (setpoints, airflow)")
      ],
      ctaPrimary: t("Demander un audit gratuit", "Request a complimentary audit"),
      ctaSecondary: t("Voir nos SLA", "See our SLAs"),
      resultsLabel: t("Résultats attendus", "Expected outcomes"),
      results: [
        t("Uptime cible > 99%", "Target uptime > 99%"),
        t("Jusqu’à 15–25% d’économies d’énergie", "Up to 15–25% energy savings"),
        t("Traçabilité complète des interventions", "Full traceability of interventions")
      ]
    },
    laboratoires: {
      label: t("Laboratoires", "Laboratories"),
      title: t("Laboratoires & Pharmaceutique — Environnements contrôlés", "Laboratories & Pharma — Controlled environments"),
      description: t(
        "Température, hygrométrie et qualité d’air maîtrisées. Procédures alignées aux bonnes pratiques et BPF avec traçabilité complète pour vos zones critiques, salles blanches et chambres climatiques.",
        "Controlled temperature, humidity and air quality. Procedures aligned with GMP best practices and full traceability for critical zones, cleanrooms and climatic chambers."
      ),
      bullets: [
        t("Qualification et métrologie (calibration capteurs)", "Qualification and metrology (sensor calibration)"),
        t("Plans de maintenance documentés et audités", "Documented, auditable maintenance plans"),
        t("Alarmes, relève et rapports conformes inspections", "Alarms, call-outs and reports meeting inspection standards")
      ],
      ctaPrimary: t("Parler à un expert", "Speak with an expert"),
      ctaSecondary: t("Nos méthodes", "Our processes"),
      resultsLabel: t("Résultats attendus", "Expected outcomes"),
      results: [
        t("Conformité audits & inspections", "Audit and inspection compliance"),
        t("Stabilité ±0,5°C / hygrométrie maîtrisée", "±0.5°C stability / controlled humidity"),
        t("Traçabilité et archivage digital", "Digital traceability and archiving")
      ]
    },
    agroalimentaire: {
      label: t("Agroalimentaire", "Agri-food"),
      title: t("Agroalimentaire — Chaîne du froid sous contrôle", "Agri-food — Cold chain under control"),
      description: t(
        "De la production au point de vente, vos températures sont sécurisées : chambres froides, vitrines, ateliers et entrepôts. Opérations conformes HACCP et traçabilité sanitaire.",
        "From production to point of sale, your temperatures stay secure: cold rooms, display cases, prep areas and warehouses. HACCP-compliant operations with full sanitary traceability."
      ),
      bullets: [
        t("Plans HACCP, enregistrements automatiques des températures", "HACCP plans with automatic temperature logging"),
        t("Maintenance préventive et décontamination contrôlée", "Preventive maintenance and controlled decontamination"),
        t("Optimisation des cycles de dégivrage et de la consommation", "Optimised defrost cycles and energy consumption")
      ],
      ctaPrimary: t("Obtenir un plan d’action", "Request an action plan"),
      ctaSecondary: t("Voir nos contrats", "See our contracts"),
      resultsLabel: t("Résultats attendus", "Expected outcomes"),
      results: [
        t("Réduction des pertes & gâchis", "Reduced spoilage and waste"),
        t("Contrôle sanitaire renforcé", "Enhanced sanitary control"),
        t("Jusqu’à 10–20% d’économie d’énergie", "Up to 10–20% energy savings")
      ]
    },
    industrie: {
      label: t("Industrie", "Industry"),
      title: t("Industrie & Tertiaire — Performance et confort", "Industry & Tertiary — Performance and comfort"),
      description: t(
        "Climatisation de process et confort occupants, avec réglages fins, régulation intelligente et plans prédictifs pour maximiser la disponibilité et la durée de vie des équipements.",
        "Process cooling and occupant comfort with fine-tuned settings, smart regulation and predictive plans to maximise availability and equipment lifespan."
      ),
      bullets: [
        t("Analyse énergétique et optimisation des consignes", "Energy analysis and optimised setpoints"),
        t("Supervision, alarmes et maintenance prédictive", "Supervision, alarms and predictive maintenance"),
        t("Déploiement rapide sans interruption d’activité", "Rapid deployment with no service interruption")
      ],
      ctaPrimary: t("Planifier une visite site", "Schedule an on-site visit"),
      ctaSecondary: t("Découvrir nos offres", "Explore our offers"),
      resultsLabel: t("Résultats attendus", "Expected outcomes"),
      results: [
        t("Confort constant pour les équipes", "Consistent comfort for teams"),
        t("Diminution des arrêts non planifiés", "Fewer unplanned outages"),
        t("Réduction des coûts d’exploitation", "Reduced operating costs")
      ]
    },
    commerces: {
      label: t("Commerces", "Retail & Stores"),
      title: t("Commerces & Retail — Froid commercial rentable", "Retail — Profitable commercial refrigeration"),
      description: t(
        "Disponibilité maximale des vitrines, meubles et chambres froides pour préserver la qualité produits et l’expérience client. Interventions rapides en dehors des heures d’affluence.",
        "Maximum uptime for display cases, merchandisers and cold rooms to preserve product quality and customer experience. Fast interventions outside peak hours."
      ),
      bullets: [
        t("Maintenance préventive orientée disponibilité", "Availability-focused preventive maintenance"),
        t("Nettoyage/dégivrage optimisés et réglages économes", "Optimised cleaning/defrost cycles and efficient settings"),
        t("Suivi températures et alertes en continu", "Continuous temperature monitoring and alerts")
      ],
      ctaPrimary: t("Recevoir une proposition", "Request a proposal"),
      ctaSecondary: t("Contrats adaptés", "Tailored contracts"),
      resultsLabel: t("Résultats attendus", "Expected outcomes"),
      results: [
        t("Stocks préservés, casse réduite", "Protected inventory, reduced losses"),
        t("Disponibilité accrue des linéaires", "Higher fixture availability"),
        t("Consommations maîtrisées toute l’année", "Energy consumption controlled year-round")
      ]
    }
  }
  const toggleDescription = (sector: string) => {
    setOpenDescriptions(prev => ({
      ...prev,
      [sector]: !prev[sector]
    }))
  }
  return (
    <div className="relative z-20 bg-[#181823]">
      {/* Introduction Accroche Premium — disposition 2 colonnes comme home/contact */}
      <motion.section 
        className="py-20 sm:py-32 lg:py-40 bg-[#181823]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
            {/* Titre à gauche */}
            <div className="flex-1">
              <ScrollSlideTitle
                direction="fromLeft"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#E9F8F9] orbit uppercase tracking-tight leading-tight"
              >
                {(isFrench
                  ? ["Maintenance et", "Services haut de gamme"]
                  : ["Premium maintenance", "and services"]
                ).map((line, index) => (
                  <span key={`${isFrench ? "fr" : "en"}-headline-${index}`} className="block">
                    {line}
                  </span>
                ))}
              </ScrollSlideTitle>
            </div>

            {/* Description à droite */}
            <motion.div
              className="flex-1 mt-8 sm:mt-12 lg:mt-16 xl:mt-20 space-y-4 sm:space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-[#537FE7] mb-6 sm:mb-8 lg:mb-10">
                {t("Pour vos installations frigorifiques critiques", "For your mission-critical refrigeration assets")}
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#E9F8F9]/80 leading-relaxed mb-6 sm:mb-8">
                {t(
                  "Nous accompagnons les environnements les plus exigeants – data centers, laboratoires pharmaceutiques, industries agroalimentaires et grandes surfaces – avec des contrats de maintenance sur mesure. Sécurité, performance continue et optimisation énergétique, même sans aucune interruption tolérée.",
                  "We support the most demanding environments—data centres, pharmaceutical labs, agri-food industries and large retailers—with tailored maintenance agreements. Safety, continuous performance and energy optimisation, even where zero downtime is tolerated."
                )}
              </p>
              <p className="text-[#537FE7] text-sm sm:text-base lg:text-lg">
                {t("—Élevés par l'expertise, animés par la fiabilité.", "—Powered by expertise, driven by reliability.")}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Types de Maintenance - Style GenCell */}
      <motion.section 
        id="types-maintenance"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#E9F8F9]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-[#181823] mb-6 orbit">
              {t("Nos Solutions de Maintenance", "Our Maintenance Solutions")}
            </h2>
            <p className="text-[#537FE7] text-lg">
              {t("[adaptées à vos enjeux critiques]", "[tailored to your critical challenges]")}
            </p>
          </motion.div>

          {/* Maintenance Préventive */}
          <motion.div
            className="mb-16 border-b border-[#181823]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#537FE7] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 01 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#181823] mb-4 orbit">
                    {t("Maintenance Préventive", "Preventive Maintenance")}
                  </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  {t(
                    "Inspections régulières, contrôles de performance, anticipation des pannes.",
                    "Regular inspections, performance checks, failure anticipation."
                  )}
                </p>
                <div className="space-y-4">
                  <p className="text-[#181823]/80 leading-relaxed">
                    {t(
                      "Inspections systématiques selon un planning optimisé, contrôles de performance énergétique, nettoyage approfondi des échangeurs et vérification des points critiques. Remplacement préventif des pièces d'usure avant défaillance pour garantir une disponibilité maximale.",
                      "Systematic inspections on an optimised schedule, energy performance checks, deep cleaning of heat exchangers and critical point verification. Preventive replacement of wear parts before failure to guarantee maximum availability."
                    )}
                  </p>
                  <p className="text-[#181823]/80 leading-relaxed">
                    {t(
                      "Nos techniciens habilités aux fluides frigorigènes interviennent avec des protocoles stricts adaptés à chaque secteur : traçabilité pharmaceutique, normes HACCP agroalimentaire, uptime data center.",
                      "Our refrigerant-certified technicians intervene under stringent protocols adapted to each sector: pharmaceutical traceability, HACCP food standards, data centre uptime."
                    )}
                  </p>
                </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Maintenance curative & corrective */}
          <motion.div
            className="mb-16 border-b border-[#181823]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#537FE7] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 02 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#181823] mb-4 orbit">
                    {t("Maintenance curative & corrective", "Corrective & Curative Maintenance")}
                  </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  {t(
                    "Intervention rapide et efficace en cas de dysfonctionnement critique.",
                    "Fast, effective response to critical malfunctions."
                  )}
                </p>
                <div className="space-y-4">
                  <p className="text-[#181823]/80 leading-relaxed">
                  {t(
                    "Service d'urgence 24h/24 et 7j/7 pour vos installations critiques. Diagnostic rapide par nos experts, intervention immédiate avec un stock stratégique de pièces détachées pour minimiser les temps d'arrêt.",
                    "24/7 emergency service for your critical assets. Rapid expert diagnostics and immediate intervention with a strategic spare parts stock to minimise downtime."
                  )}
                  </p>
                  <p className="text-[#181823]/80 leading-relaxed">
                    {t(
                      "Équipes mobiles équipées d'outils de diagnostic avancés, véhicules-ateliers pour interventions complexes et solutions temporaires de secours pour assurer la continuité de service.",
                      "Mobile teams equipped with advanced diagnostic tools, workshop vans for complex interventions and temporary backup solutions to ensure service continuity."
                    )}
                  </p>
                </div>
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
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#537FE7] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 03 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#181823] mb-4 orbit">
                    {t("Maintenance Prédictive", "Predictive Maintenance")}
                  </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  {t(
                    "Capteurs connectés et suivi temps réel pour anticiper les anomalies.",
                    "Connected sensors and real-time monitoring to anticipate faults."
                  )}
                </p>
                <div className="space-y-4">
                  <p className="text-[#181823]/80 leading-relaxed">
                    {t(
                      "Technologies IoT et intelligence artificielle pour analyser les données de fonctionnement : vibrations, températures, pressions, consommations énergétiques. Alertes automatiques en cas de dérive détectée, idéal pour data centers et environnements pharmaceutiques.",
                      "IoT technologies and artificial intelligence analyse operating data: vibration, temperature, pressure, energy consumption. Automatic alerts when deviations are detected—ideal for data centres and pharmaceutical environments."
                    )}
                  </p>
                  <p className="text-[#181823]/80 leading-relaxed">
                    {t(
                      "Tableaux de bord en temps réel, rapports prédictifs mensuels et recommandations d'optimisation pour maximiser la durée de vie de vos équipements tout en réduisant les coûts d'exploitation.",
                      "Real-time dashboards, monthly predictive reports and optimisation recommendations to maximise equipment lifetime while reducing operating costs."
                    )}
                  </p>
                </div>
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
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#537FE7] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 04 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#181823] mb-4 orbit">
                    {t("Contrats Sur Mesure", "Bespoke Service Agreements")}
                  </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  {t(
                    "Fréquence et niveau de service adaptés à votre secteur d'activité.",
                    "Service frequency and SLAs matched to your industry."
                  )}
                </p>
                <div className="space-y-4">
                  <p className="text-[#181823]/80 leading-relaxed">
                  {t(
                    "Contrats premium modulables selon vos exigences : interventions 24h/24 et 7j/7 pour data centers, interventions programmées pour laboratoires, maintenance saisonnière pour grandes surfaces. SLA personnalisés avec garanties de temps d'intervention.",
                    "Premium contracts scaled to your needs: 24/7 interventions for data centres, scheduled visits for laboratories, seasonal maintenance for large retailers. Custom SLAs with guaranteed response times."
                  )}
                  </p>
                  <p className="text-[#181823]/80 leading-relaxed">
                    {t(
                      "Facturation transparente, planning d'interventions optimisé et support technique dédié avec un interlocuteur unique pour simplifier la gestion de vos installations critiques.",
                      "Transparent billing, optimised intervention planning and dedicated technical support with a single point of contact to simplify the management of your critical installations."
                    )}
                  </p>
                </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Premium Associés */}
      <motion.section 
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#181823]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-[#E9F8F9] mb-6 orbit">
              {t("Services Conçus pour vos Enjeux Stratégiques", "Services Designed for Your Strategic Challenges")}
            </h2>
            <p className="text-[#537FE7] text-lg">
              {t("[notre valeur ajoutée premium]", "[our premium added value]")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Support 24/7 */}
            <motion.div
              className="border border-[#E9F8F9]/20 p-4 sm:p-6 lg:p-8 hover:border-[#E9F8F9]/40 transition-colors duration-200 group transform-gpu backface-hidden bg-[#E9F8F9]/5 backdrop-blur-sm"
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
                <h3 className="text-xl font-medium text-[#E9F8F9]">
                  {t("Support et Interventions 24/7", "24/7 Support & Emergency Call-Outs")}
                </h3>
              </div>
              <p className="text-[#E9F8F9]/80 leading-relaxed">
                {t(
                  "Interventions garanties en urgence 24h/24 et 7j/7 pour limiter tout arrêt d'activité. Équipe dédiée aux installations critiques avec engagement de temps d'intervention personnalisé selon votre secteur.",
                  "Guaranteed emergency call-outs 24/7 to keep downtime to a minimum. Dedicated teams for critical installations with sector-specific response time commitments."
                )}
              </p>
            </motion.div>

            {/* Contrôle Avancé */}
            <motion.div
              className="border border-[#E9F8F9]/20 p-4 sm:p-6 lg:p-8 hover:border-[#E9F8F9]/40 transition-colors duration-200 group transform-gpu backface-hidden bg-[#E9F8F9]/5 backdrop-blur-sm"
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
                <h3 className="text-xl font-medium text-[#E9F8F9]">
                  {t("Contrôle & Régulation Avancés", "Advanced Control & Regulation")}
                </h3>
              </div>
              <p className="text-[#E9F8F9]/80 leading-relaxed">
                {t(
                  "Systèmes de supervision connectés, alertes automatiques et reporting mensuel détaillé. Tableau de bord temps réel pour un suivi permanent de vos installations critiques.",
                  "Connected supervisory systems, automatic alerts and detailed monthly reporting. Real-time dashboards provide continuous visibility over critical assets."
                )}
              </p>
            </motion.div>

            {/* Optimisation Énergétique */}
            <motion.div
              className="border border-[#E9F8F9]/20 p-4 sm:p-6 lg:p-8 hover:border-[#E9F8F9]/40 transition-colors duration-200 group transform-gpu backface-hidden bg-[#E9F8F9]/5 backdrop-blur-sm"
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
                <h3 className="text-xl font-medium text-[#E9F8F9]">
                  {t("Optimisation Énergétique", "Energy Optimisation")}
                </h3>
              </div>
              <p className="text-[#E9F8F9]/80 leading-relaxed">
                {t(
                  "Réduction des consommations grâce à nos solutions innovantes : récupération d'énergie, équipements à haut rendement, régulation intelligente et analyse des performances énergétiques.",
                  "Lower consumption through innovative solutions: heat recovery, high-efficiency equipment, smart regulation and detailed energy performance analysis."
                )}
              </p>
            </motion.div>

            {/* Conformité Réglementaire */}
            <motion.div
              className="border border-[#E9F8F9]/20 p-4 sm:p-6 lg:p-8 hover:border-[#E9F8F9]/40 transition-colors duration-200 group transform-gpu backface-hidden bg-[#E9F8F9]/5 backdrop-blur-sm"
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
                <h3 className="text-xl font-medium text-[#E9F8F9]">
                  {t("Conformité Réglementaire", "Regulatory Compliance")}
                </h3>
              </div>
              <p className="text-[#E9F8F9]/80 leading-relaxed">
                {t(
                  "Suivi des fluides frigorigènes, respect des normes environnementales et traçabilité complète. Mise en conformité HACCP et autres référentiels européens selon votre secteur d'activité.",
                  "Tracking of refrigerants, adherence to environmental standards and complete traceability. HACCP compliance and other European frameworks tailored to your industry."
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Engagements Qualité avec Chiffres */}
      <motion.section 
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#E9F8F9]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-[#181823] mb-6 orbit">
              {t("Nos Engagements Qualité", "Our Quality Commitments")}
            </h2>
            <p className="text-[#537FE7] text-lg">
              {t("[des garanties mesurables]", "[measurable guarantees]")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {/* Temps d'intervention */}
            <motion.div
              className="text-center p-4 sm:p-6 lg:p-8"
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
                  {t("Temps d'Intervention", "Response Time")}
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
                  {t("Garanti en Île-de-France pour vos urgences", "Guaranteed across Île-de-France for emergency call-outs")}
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Disponibilité */}
            <motion.div
              className="text-center p-4 sm:p-6 lg:p-8"
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
                  {t("Taux de Disponibilité", "Availability Rate")}
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
                  {t("Sur nos installations critiques", "Across our mission-critical installations")}
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Équipe Certifiée */}
            <motion.div
              className="text-center p-4 sm:p-6 lg:p-8"
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
                  {t("Équipe Certifiée", "Certified Team")}
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
                  {t("Opérations éligibles C2E et RGE", "Operations eligible for C2E and RGE schemes")}
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Traçabilité */}
            <motion.div
              className="text-center p-4 sm:p-6 lg:p-8"
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
                  {t("Traçabilité", "Traceability")}
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
                  {t("Rapports et suivi en temps réel", "Real-time reporting and monitoring")}
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Secteurs d'Application - Pleine largeur */}
      <motion.section 
        id="secteurs"
        className="pt-12 sm:pt-16 lg:pt-20 pb-0 bg-[#E9F8F9]"
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-[#181823] orbit uppercase tracking-tight leading-tight"
            >
              {(isFrench
                ? ["Secteurs que", "nous accompagnons"]
                : ["Sectors we", "support"]
              ).map((line, index) => (
                <span key={`${isFrench ? "fr" : "en"}-sectors-${index}`} className="block">
                  {line}
                </span>
              ))}
            </ScrollSlideTitle>
          </motion.div>
        </div>

        <div className="space-y-0">
          {/* Data Centers */}
          <div className="relative">
            <motion.div
              className="relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              onClick={() => toggleDescription('data-centers')}
            >
              {/* Image de fond */}
              <div 
                className={`relative h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 ${openDescriptions['data-centers'] ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                style={{ backgroundImage: "url('/images/maintenances_services/server_rack.jpg')" }}
              />
              {/* Overlay sombre */}
              <div className="absolute inset-0 bg-[#181823]/60 group-hover:bg-[#181823]/50 transition-colors duration-300" />
              {/* Contenu */}
              <div className="absolute inset-0 z-10 flex items-end">
                {/* Titre en bas à gauche */}
                <div className="pl-2 sm:pl-4 pb-4 sm:pb-6 lg:pb-8">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-[#E9F8F9] satoshi uppercase tracking-tight"
                  >
                    {sectorsContent["data-centers"].label}
                  </ScrollSlideTitle>
                </div>
              </div>
            </motion.div>
            
            {/* Description slide down */}
            <AnimatePresence>
              {openDescriptions['data-centers'] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden bg-[#181823]"
                >
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-3">
                        <h3 className="text-[#E9F8F9] text-lg sm:text-xl font-semibold">
                          {sectorsContent["data-centers"].title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-[#E9F8F9]/90 leading-relaxed">
                          {sectorsContent["data-centers"].description}
                        </p>
                        <ul className="list-disc pl-5 text-[#E9F8F9]/85 space-y-1">
                          {sectorsContent["data-centers"].bullets.map((bullet, idx) => (
                            <li key={`data-centers-bullet-${idx}`}>{bullet}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <a href="/contact#formulaire"><span className="inline-block rounded-sm btn-effect-5 btn-standard">{sectorsContent["data-centers"].ctaPrimary}</span></a>
                          <a href="/maintenances-services#types-maintenance"><span className="inline-block rounded-sm btn-effect-5 btn-standard">{sectorsContent["data-centers"].ctaSecondary}</span></a>
                        </div>
                      </div>
                      <div className="bg-[#E9F8F9]/5 border border-[#E9F8F9]/10 rounded-sm p-4 space-y-2">
                        <p className="text-[#537FE7] text-xs sm:text-sm uppercase tracking-wider">
                          {sectorsContent["data-centers"].resultsLabel}
                        </p>
                        <ul className="space-y-1 text-[#E9F8F9]/90 text-sm sm:text-base">
                          {sectorsContent["data-centers"].results.map((item, idx) => (
                            <li key={`data-centers-result-${idx}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Laboratoires */}
          <div className="relative">
            <motion.div
              className="relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              onClick={() => toggleDescription('laboratoires')}
            >
              {/* Image de fond */}
              <div 
                className={`relative h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 ${openDescriptions['laboratoires'] ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                style={{ backgroundImage: "url('/images/maintenances_services/labo.jpeg')" }}
              />
              {/* Overlay sombre */}
              <div className="absolute inset-0 bg-[#181823]/60 group-hover:bg-[#181823]/50 transition-colors duration-300" />
              {/* Contenu */}
              <div className="absolute inset-0 z-10 flex items-end">
                {/* Titre en bas à gauche */}
                <div className="pl-2 sm:pl-4 pb-4 sm:pb-6 lg:pb-8">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-[#E9F8F9] satoshi uppercase tracking-tight"
                  >
                    {sectorsContent.laboratoires.label}
                  </ScrollSlideTitle>
                </div>
              </div>
            </motion.div>
            
            {/* Description slide down */}
            <AnimatePresence>
              {openDescriptions['laboratoires'] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden bg-[#181823]"
                >
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-3">
                        <h3 className="text-[#E9F8F9] text-lg sm:text-xl font-semibold">
                          {sectorsContent.laboratoires.title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-[#E9F8F9]/90 leading-relaxed">
                          {sectorsContent.laboratoires.description}
                        </p>
                        <ul className="list-disc pl-5 text-[#E9F8F9]/85 space-y-1">
                          {sectorsContent.laboratoires.bullets.map((bullet, idx) => (
                            <li key={`laboratoires-bullet-${idx}`}>{bullet}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <a href="/contact#formulaire"><span className="inline-block rounded-sm btn-effect-5 btn-standard">{sectorsContent.laboratoires.ctaPrimary}</span></a>
                          <a href="/maintenances-services#types-maintenance"><span className="inline-block rounded-sm btn-effect-5 btn-standard">{sectorsContent.laboratoires.ctaSecondary}</span></a>
                        </div>
                      </div>
                      <div className="bg-[#E9F8F9]/5 border border-[#E9F8F9]/10 rounded-sm p-4 space-y-2">
                        <p className="text-[#537FE7] text-xs sm:text-sm uppercase tracking-wider">
                          {sectorsContent.laboratoires.resultsLabel}
                        </p>
                        <ul className="space-y-1 text-[#E9F8F9]/90 text-sm sm:text-base">
                          {sectorsContent.laboratoires.results.map((item, idx) => (
                            <li key={`laboratoires-result-${idx}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Agroalimentaire */}
          <div className="relative">
            <motion.div
              className="relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              onClick={() => toggleDescription('agroalimentaire')}
            >
              {/* Image de fond */}
              <div 
                className={`relative h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 ${openDescriptions['agroalimentaire'] ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                style={{ backgroundImage: "url('/images/maintenances_services/agro_alimentaire.jpg')" }}
              />
              {/* Overlay sombre */}
              <div className="absolute inset-0 bg-[#181823]/60 group-hover:bg-[#181823]/50 transition-colors duration-300" />
              {/* Contenu */}
              <div className="absolute inset-0 z-10 flex items-end">
                {/* Titre en bas à gauche */}
                <div className="pl-2 sm:pl-4 pb-4 sm:pb-6 lg:pb-8">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-[#E9F8F9] satoshi uppercase tracking-tight"
                  >
                    {sectorsContent.agroalimentaire.label}
                  </ScrollSlideTitle>
                </div>
              </div>
            </motion.div>
            
            {/* Description slide down */}
            <AnimatePresence>
              {openDescriptions['agroalimentaire'] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden bg-[#181823]"
                >
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-3">
                        <h3 className="text-[#E9F8F9] text-lg sm:text-xl font-semibold">
                          {sectorsContent.agroalimentaire.title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-[#E9F8F9]/90 leading-relaxed">
                          {sectorsContent.agroalimentaire.description}
                        </p>
                        <ul className="list-disc pl-5 text-[#E9F8F9]/85 space-y-1">
                          {sectorsContent.agroalimentaire.bullets.map((bullet, idx) => (
                            <li key={`agro-bullet-${idx}`}>{bullet}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <a href="/contact#formulaire"><span className="inline-block rounded-sm btn-effect-5 btn-standard">{sectorsContent.agroalimentaire.ctaPrimary}</span></a>
                          <a href="/maintenances-services#types-maintenance"><span className="inline-block rounded-sm btn-effect-5 btn-standard">{sectorsContent.agroalimentaire.ctaSecondary}</span></a>
                        </div>
                      </div>
                      <div className="bg-[#E9F8F9]/5 border border-[#E9F8F9]/10 rounded-sm p-4 space-y-2">
                        <p className="text-[#537FE7] text-xs sm:text-sm uppercase tracking-wider">
                          {sectorsContent.agroalimentaire.resultsLabel}
                        </p>
                        <ul className="space-y-1 text-[#E9F8F9]/90 text-sm sm:text-base">
                          {sectorsContent.agroalimentaire.results.map((item, idx) => (
                            <li key={`agro-result-${idx}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Industrie */}
          <div className="relative">
            <motion.div
              className="relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              onClick={() => toggleDescription('industrie')}
            >
              {/* Image de fond */}
              <div 
                className={`relative h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 ${openDescriptions['industrie'] ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                style={{ backgroundImage: "url('/images/maintenances_services/industry.jpg')" }}
              />
              {/* Overlay sombre */}
              <div className="absolute inset-0 bg-[#181823]/60 group-hover:bg-[#181823]/50 transition-colors duration-300" />
              {/* Contenu */}
              <div className="absolute inset-0 z-10 flex items-end">
                {/* Titre en bas à gauche */}
                <div className="pl-2 sm:pl-4 pb-4 sm:pb-6 lg:pb-8">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-[#E9F8F9] satoshi uppercase tracking-tight"
                  >
                    {sectorsContent.industrie.label}
                  </ScrollSlideTitle>
                </div>
              </div>
            </motion.div>
            
            {/* Description slide down */}
            <AnimatePresence>
              {openDescriptions['industrie'] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden bg-[#181823]"
                >
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-3">
                        <h3 className="text-[#E9F8F9] text-lg sm:text-xl font-semibold">
                          {sectorsContent.industrie.title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-[#E9F8F9]/90 leading-relaxed">
                          {sectorsContent.industrie.description}
                        </p>
                        <ul className="list-disc pl-5 text-[#E9F8F9]/85 space-y-1">
                          {sectorsContent.industrie.bullets.map((bullet, idx) => (
                            <li key={`industrie-bullet-${idx}`}>{bullet}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <a href="/contact#formulaire"><span className="inline-block rounded-sm btn-effect-5 btn-standard">{sectorsContent.industrie.ctaPrimary}</span></a>
                          <a href="/maintenances-services#types-maintenance"><span className="inline-block rounded-sm btn-effect-5 btn-standard">{sectorsContent.industrie.ctaSecondary}</span></a>
                        </div>
                      </div>
                      <div className="bg-[#E9F8F9]/5 border border-[#E9F8F9]/10 rounded-sm p-4 space-y-2">
                        <p className="text-[#537FE7] text-xs sm:text-sm uppercase tracking-wider">
                          {sectorsContent.industrie.resultsLabel}
                        </p>
                        <ul className="space-y-1 text-[#E9F8F9]/90 text-sm sm:text-base">
                          {sectorsContent.industrie.results.map((item, idx) => (
                            <li key={`industrie-result-${idx}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Commerces */}
          <div className="relative">
            <motion.div
              className="relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              onClick={() => toggleDescription('commerces')}
            >
              {/* Image de fond */}
              <div 
                className={`relative h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 ${openDescriptions['commerces'] ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                style={{ backgroundImage: "url('/images/maintenances_services/Coldiretti.jpg')" }}
              />
              {/* Overlay sombre */}
              <div className="absolute inset-0 bg-[#181823]/60 group-hover:bg-[#181823]/50 transition-colors duration-300" />
              {/* Contenu */}
              <div className="absolute inset-0 z-10 flex items-end">
                {/* Titre en bas à gauche */}
                <div className="pl-2 sm:pl-4 pb-4 sm:pb-6 lg:pb-8">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-[#E9F8F9] satoshi uppercase tracking-tight"
                  >
                    {sectorsContent.commerces.label}
                  </ScrollSlideTitle>
                </div>
              </div>
            </motion.div>
            
            {/* Description slide down */}
            <AnimatePresence>
              {openDescriptions['commerces'] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden bg-[#181823]"
                >
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-3">
                        <h3 className="text-[#E9F8F9] text-lg sm:text-xl font-semibold">
                          {sectorsContent.commerces.title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-[#E9F8F9]/90 leading-relaxed">
                          {sectorsContent.commerces.description}
                        </p>
                        <ul className="list-disc pl-5 text-[#E9F8F9]/85 space-y-1">
                          {sectorsContent.commerces.bullets.map((bullet, idx) => (
                            <li key={`commerces-bullet-${idx}`}>{bullet}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <a href="/contact#formulaire"><span className="inline-block rounded-sm btn-effect-5 btn-standard">{sectorsContent.commerces.ctaPrimary}</span></a>
                          <a href="/maintenances-services#types-maintenance"><span className="inline-block rounded-sm btn-effect-5 btn-standard">{sectorsContent.commerces.ctaSecondary}</span></a>
                        </div>
                      </div>
                      <div className="bg-[#E9F8F9]/5 border border-[#E9F8F9]/10 rounded-sm p-4 space-y-2">
                        <p className="text-[#537FE7] text-xs sm:text-sm uppercase tracking-wider">
                          {sectorsContent.commerces.resultsLabel}
                        </p>
                        <ul className="space-y-1 text-[#E9F8F9]/90 text-sm sm:text-base">
                          {sectorsContent.commerces.results.map((item, idx) => (
                            <li key={`commerces-result-${idx}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* CTA Premium */}
      <motion.section 
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#181823] text-center"
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
            {t("Protégez vos Installations Critiques", "Protect Your Mission-Critical Systems")}
          </motion.h2>
          <motion.p
            className="text-lg text-[#E9F8F9]/80 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t(
              "Avec un partenaire de confiance pour votre maintenance frigorifique. Contrats sur mesure, interventions garanties et expertise reconnue dans les environnements les plus exigeants.",
              "Partner with a trusted refrigeration specialist. Tailored agreements, guaranteed interventions and recognised expertise in the most demanding environments."
            )}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <a href="/contact#formulaire" className="w-full sm:w-auto">
              <motion.button 
                className="rounded-sm btn-effect-5 btn-standard w-full whitespace-nowrap"
                whileHover={{ scale: 1.01, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t("Demander un Audit Gratuit", "Request a Complimentary Audit")}
              </motion.button>
            </a>
            <a href="/maintenances-services#types-maintenance" className="w-full sm:w-auto">
              <motion.button 
                className="rounded-sm btn-effect-5 btn-standard w-full whitespace-nowrap"
                whileHover={{ scale: 1.01, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t("Nos solutions de maintenance", "Our maintenance solutions")}
              </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
