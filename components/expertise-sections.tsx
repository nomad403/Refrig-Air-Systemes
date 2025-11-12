"use client"

import { motion, AnimatePresence } from "framer-motion"
import TrimmedImage from "./trimmed-image"
import ScrollSlideTitle from "./scroll-slide-title"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

type BilingualText = { fr: string; en: string }

export default function ExpertiseSections() {
  // État d'expansion par domaine (révèle le texte SEO au clic)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const { isFrench } = useLanguage()
  const t = (fr: string, en: string) => (isFrench ? fr : en)

  const domainDetails: Record<string, { subtitle: BilingualText; paragraphs: BilingualText[] }> = {
    "Climatisation Réversible": {
      subtitle: {
        fr: "Confort premium et continuité de service",
        en: "Premium comfort and assured uptime"
      },
      paragraphs: [
        {
          fr: "Systèmes de climatisation de précision dimensionnés pour les environnements exigeants (bureaux haut de gamme, data centers de proximité, espaces retail premium, vitrines réfrigérées et froid commercial).",
          en: "Precision HVAC systems sized for demanding environments—high-end offices, edge data centres, premium retail, refrigerated displays and commercial cold rooms."
        },
        {
          fr: "Régulation fine température/hygrométrie, optimisation énergétique (inverters, récupération de chaleur) et plans de maintenance préventive adaptés à votre niveau de criticité.",
          en: "Fine-grained temperature and humidity control, energy optimisation (inverters, heat recovery) and preventive maintenance programmes aligned with your criticality level."
        },
        {
          fr: "Interventions rapides et traçabilité complète pour garantir disponibilité et confort en continu.",
          en: "Rapid interventions and end-to-end traceability to guarantee continuous availability and comfort."
        }
      ]
    },
    "Pompes à Chaleur Industrielles": {
      subtitle: {
        fr: "Haute efficacité et valorisation énergétique",
        en: "High efficiency and energy recovery"
      },
      paragraphs: [
        {
          fr: "Solutions PAC industrielles pour process et bâtiments tertiaires, avec scénarios de relève N+1 et supervision connectée.",
          en: "Industrial heat-pump solutions for process and tertiary buildings, with N+1 backup scenarios and connected supervision."
        },
        {
          fr: "Intégration avec réseaux d’eau glacée, free-cooling et récupération d’énergie pour réduire l’empreinte carbone et les coûts d’exploitation.",
          en: "Integration with chilled-water loops, free cooling and energy recovery to shrink your carbon footprint and operating costs."
        },
        {
          fr: "Conformité réglementaire et accompagnement complet: étude, mise en service, maintenance proactive.",
          en: "Regulatory compliance and comprehensive support—from studies and commissioning to proactive maintenance."
        }
      ]
    },
    "Chambres Froides Positives & Négatives": {
      subtitle: {
        fr: "Chaîne du froid maîtrisée — agro & pharma",
        en: "Cold chain control for food & pharma"
      },
      paragraphs: [
        {
          fr: "Conception et installation de chambres froides conformes HACCP/ISO 14644, adaptées aux laboratoires, industries agroalimentaires, logistique et froid commercial.",
          en: "Design and installation of HACCP / ISO 14644-compliant cold rooms for laboratories, agri-food, logistics and commercial refrigeration."
        },
        {
          fr: "Suivi de température, alarmes, enregistrements et interventions 24h/24 et 7j/7 pour sécuriser produits et échantillons sensibles.",
          en: "Temperature monitoring, alarms, data logging and 24/7 call-outs to secure sensitive products and samples."
        },
        {
          fr: "Contrats premium avec diagnostics énergétiques et optimisation des cycles de dégivrage pour vitrines réfrigérées et meubles froids.",
          en: "Premium contracts delivering energy diagnostics and defrost optimisation for refrigerated display cases and chill cabinets."
        }
      ]
    },
    "Installations Très Haute Technicité": {
      subtitle: {
        fr: "Très basse température et salles blanches — expertise critique",
        en: "Ultra-low temperature & cleanrooms—critical expertise"
      },
      paragraphs: [
        {
          fr: "Installations cryogéniques très haute technicité jusqu'à -80°C pour conservation d'échantillons biologiques, vaccins et produits pharmaceutiques sensibles.",
          en: "High-tech cryogenic installations down to -80 °C for preserving biological samples, vaccines and sensitive pharmaceutical products."
        },
        {
          fr: "Salles blanches ISO 14644 pour industries pharmaceutiques, électroniques et biotechnologiques avec contrôle particules et régulation précise température/hygrométrie.",
          en: "ISO 14644 cleanrooms for pharmaceutical, electronics and biotech industries with particle control and precise temperature/humidity regulation."
        },
        {
          fr: "Expertise reconnue dans les environnements contrôlés critiques avec surveillance continue et maintenance spécialisée pour garantir la conformité réglementaire.",
          en: "Recognised expertise in critical controlled environments with continuous monitoring and specialised maintenance to ensure regulatory compliance."
        }
      ]
    },
    "Froid Commercial & Vitrines Réfrigérées": {
      subtitle: {
        fr: "Retail & restauration — performance optimisée",
        en: "Retail & foodservice—optimised performance"
      },
      paragraphs: [
        {
          fr: "Installation et maintenance de vitrines réfrigérées, meubles froids, armoires frigorifiques pour supermarchés, boutiques et restaurants.",
          en: "Installation and maintenance of refrigerated display cases, chill cabinets and cold rooms for supermarkets, boutiques and restaurants."
        },
        {
          fr: "Optimisation énergétique des équipements frigorifiques commerciaux avec fluides écologiques et récupération de chaleur.",
          en: "Energy optimisation of commercial refrigeration assets with low-GWP refrigerants and heat recovery."
        },
        {
          fr: "Contrats de maintenance spécialisés pour garantir la continuité commerciale et la conservation optimale des produits frais.",
          en: "Specialised maintenance contracts securing business continuity and optimal preservation of fresh goods."
        }
      ]
    },
    "Groupes à Eau Glacée": {
      subtitle: {
        fr: "Refroidissement central pour sites critiques",
        en: "Central cooling for critical facilities"
      },
      paragraphs: [
        {
          fr: "Groupes froid à haut rendement pour data centers, sites industriels et grands ensembles tertiaires. Installations très haute technicité pour environnements critiques.",
          en: "High-efficiency chillers for data centres, industrial sites and large tertiary complexes—high-tech installations for critical environments."
        },
        {
          fr: "Ingénierie hydraulique (équilibrage, qualité d'eau, redondance), régulation avancée et monitoring continu avec surveillance 24/7.",
          en: "Hydraulic engineering (balancing, water quality, redundancy), advanced control and continuous monitoring with 24/7 supervision."
        },
        {
          fr: "Plans de continuité d'activité, pièces critiques en stock et temps d'intervention garantis pour installations très basse température et salles blanches.",
          en: "Business continuity plans, strategic spare parts and guaranteed response times for ultra-low temperature and cleanroom installations."
        }
      ]
    },
    "Récupérateurs de Chaleur": {
      subtitle: {
        fr: "ROI mesurable et performance durable",
        en: "Measured ROI and lasting performance"
      },
      paragraphs: [
        {
          fr: "Récupération d'énergie sur circuits frigorifiques et CTA pour réduire la facture énergétique. Solutions très haute technicité pour installations critiques.",
          en: "Energy recovery on refrigeration circuits and AHUs to cut energy bills—high-tech solutions for critical sites."
        },
        {
          fr: "Études technico-économiques, calculs de retour sur investissement et intégration sans perturber vos opérations en environnements contrôlés.",
          en: "Techno-economic studies, ROI calculations and seamless integration without disrupting controlled environments."
        },
        {
          fr: "Reporting périodique de performance et ajustements pour maximiser les gains sur installations très basse température et salles blanches.",
          en: "Periodic performance reporting and fine-tuning to maximise gains on ultra-low temperature and cleanroom installations."
        }
      ]
    },
    "Maintenance & Diagnostics": {
      subtitle: {
        fr: "Disponibilité maximale — zéro interruption",
        en: "Maximum availability—zero interruption"
      },
      paragraphs: [
        {
          fr: "Contrats de maintenance premium avec supervision 24/7, télésurveillance et interventions sous 4h en Île-de-France pour installations très haute technicité.",
          en: "Premium maintenance contracts with 24/7 supervision, remote monitoring and sub-4-hour interventions across Île-de-France for high-tech installations."
        },
        {
          fr: "Méthodologie prédictive (capteurs, analyses) pour anticiper les dérives et sécuriser vos installations critiques (data centers, laboratoires, salles blanches, très basse température).",
          en: "Predictive methodology (sensors, analytics) to anticipate drift and secure critical assets—data centres, laboratories, cleanrooms, ultra-low temperature facilities."
        },
        {
          fr: "Tableaux de bord, traçabilité complète et recommandations d'optimisation en continu pour environnements contrôlés et installations cryogéniques.",
          en: "Dashboards, full traceability and continuous optimisation recommendations for controlled environments and cryogenic systems."
        }
      ]
    }
  }

  const getDomainContent = (key: string) => {
    const entry = domainDetails[key]
    return {
      subtitle: isFrench ? entry.subtitle.fr : entry.subtitle.en,
      paragraphs: entry.paragraphs.map((paragraph) => (isFrench ? paragraph.fr : paragraph.en))
    }
  }

  const climatisationContent = getDomainContent("Climatisation Réversible")
  const pacContent = getDomainContent("Pompes à Chaleur Industrielles")
  const coldRoomsContent = getDomainContent("Chambres Froides Positives & Négatives")
  const highTechContent = getDomainContent("Installations Très Haute Technicité")
  const retailContent = getDomainContent("Froid Commercial & Vitrines Réfrigérées")
  const chilledWaterContent = getDomainContent("Groupes à Eau Glacée")
  const heatRecoveryContent = getDomainContent("Récupérateurs de Chaleur")
  const maintenanceContent = getDomainContent("Maintenance & Diagnostics")

  const toggleDomain = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }))
  }
  return (
    <div className="relative z-20 bg-[#181823]">
      {/* En-tête section — même disposition que la bannière contact (2 colonnes) */}
      <motion.section 
        className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-[#537FE7]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
            {/* Titre à gauche */}
            <div className="flex-1">
              <ScrollSlideTitle
                direction="fromLeft"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white orbit uppercase tracking-tight leading-tight max-w-[24ch] sm:max-w-[26ch] lg:max-w-[28ch] text-balance"
              >
                {t("NOTRE EXPERTISE FRIGORIFIQUE", "OUR REFRIGERATION EXPERTISE")}
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
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-6 sm:mb-8 lg:mb-10">
                {t("Pour vos environnements climatisation & froid critiques", "For your mission-critical cooling environments")}
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 leading-relaxed mb-6 sm:mb-8">
                {t(
                  "Conception, installation et maintenance haut de gamme pour data centers, laboratoires, industrie et agroalimentaire. Installations très haute technicité, très basse température et salles blanches. Performances, fiabilité et efficacité énergétique au cœur de chaque projet.",
                  "Premium design, installation and maintenance for data centres, laboratories, industry and agri-food. High-tech, ultra-low temperature and cleanroom installations with performance, reliability and energy efficiency at the core of every project."
                )}
              </p>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                {t("—Élevés par l'expertise, animés par l'excellence.", "—Powered by expertise, driven by excellence.")}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Domaines d'Expertise — vue liste avec séparateurs et détails repliables */}
      <motion.section 
        id="nos-domaines"
        className="py-20 sm:py-32 lg:py-48 px-4 sm:px-6 lg:px-12 bg-[#181823]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-16 sm:mb-24 lg:mb-32 xl:mb-40"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-end">
              <ScrollSlideTitle
                direction="fromRight"
                className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white orbit uppercase tracking-tight leading-tight text-right max-w-[28ch] text-balance"
              >
                {t("NOS DOMAINES D'EXPERTISE", "OUR AREAS OF EXPERTISE")}
              </ScrollSlideTitle>
            </div>
          </motion.div>

          <div className="space-y-0">
            {/* Climatisation - Item */}
            <div className="border-t border-white/10 pt-16 pb-8">
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-24"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-full lg:w-1/2 h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 flex items-center justify-center relative z-10">
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    WebkitMaskImage: 'url(/images/expertises/clim%20reversible.png)',
                    maskImage: 'url(/images/expertises/clim%20reversible.png)',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    backgroundColor: '#537FE7',
                  }}
                />
                <TrimmedImage 
                  src="/images/expertises/clim%20reversible.png" 
                  alt="Climatisation & Réversible"
                  className="w-full h-full object-contain relative z-30"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                />
              </div>
              <div className="w-full lg:w-1/2 text-left relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance text-left"
                  >
                    {t("Climatisation Réversible", "Reversible HVAC")}
                  </ScrollSlideTitle>
                </div>
                <motion.p
                  className="text-lg lg:text-xl text-white/80 leading-relaxed lg:leading-loose text-left"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {t(
                    "Systèmes haute performance pour environnements tertiaires et industriels",
                    "High-performance systems for tertiary and industrial environments"
                  )}
                </motion.p>
                <div className="mt-6 flex justify-start">
                  <motion.button
                    onClick={() => toggleDomain("Climatisation Réversible")}
                    className="rounded-sm btn-effect-5 btn-standard relative"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded["Climatisation Réversible"]
                      ? t("Réduire", "Collapse")
                      : t("Plus de détails", "More details")}
                  </motion.button>
                </div>
                <AnimatePresence initial={false}>
                  {expanded["Climatisation Réversible"] && (
                    <motion.div
                      key="details-clim"
                      initial={{ height: 0, opacity: 0, y: -8 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden mt-6 text-left"
                    >
                      {climatisationContent.subtitle && (
                        <p className="text-white/90 text-base lg:text-lg mb-3 text-left">{climatisationContent.subtitle}</p>
                      )}
                      <div className="space-y-4">
                        {climatisationContent.paragraphs.map((paragraph, idx) => (
                          <p key={idx} className="text-white/80 leading-relaxed text-sm lg:text-base text-left">{paragraph}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            </div>

            {/* Pompes à Chaleur - Item */}
            <div className="border-t border-white/10 pt-16 pb-8">
            <motion.div
              className="flex flex-col lg:flex-row-reverse items-center gap-6 sm:gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-full lg:w-1/2 h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 flex items-center justify-center relative z-10">
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    WebkitMaskImage: 'url(/images/expertises/Whisk_8e1c4946f8ef139bab04376179289556dr-removebg-preview.png)',
                    maskImage: 'url(/images/expertises/Whisk_8e1c4946f8ef139bab04376179289556dr-removebg-preview.png)',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    backgroundColor: '#537FE7',
                  }}
                />
                <TrimmedImage 
                  src="/images/expertises/Whisk_8e1c4946f8ef139bab04376179289556dr-removebg-preview.png" 
                  alt="Pompes à Chaleur Industrielles"
                  className="w-full h-full object-contain relative z-30"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                />
              </div>
              <div className="w-full lg:w-1/2 text-left relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromRight"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance text-left"
                  >
                    {t("Pompes à Chaleur Industrielles", "Industrial Heat Pumps")}
                  </ScrollSlideTitle>
                </div>
                <motion.p
                  className="text-lg lg:text-xl text-white/80 leading-relaxed lg:leading-loose text-left"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {t(
                    "Solutions énergétiques durables et haute efficacité",
                    "High-efficiency, sustainable energy solutions"
                  )}
                </motion.p>
                <div className="mt-6 flex justify-start">
                  <motion.button
                    onClick={() => toggleDomain("Pompes à Chaleur Industrielles")}
                    className="rounded-sm btn-effect-5 btn-standard relative"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded["Pompes à Chaleur Industrielles"]
                      ? t("Réduire", "Collapse")
                      : t("Plus de détails", "More details")}
                  </motion.button>
                </div>
                <AnimatePresence initial={false}>
                  {expanded["Pompes à Chaleur Industrielles"] && (
                    <motion.div
                      key="details-pac"
                      initial={{ height: 0, opacity: 0, y: -8 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden mt-6 text-left"
                    >
                      {pacContent.subtitle && (
                        <p className="text-white/90 text-base lg:text-lg mb-3 text-left">{pacContent.subtitle}</p>
                      )}
                      <div className="space-y-4">
                        {pacContent.paragraphs.map((paragraph, idx) => (
                          <p key={idx} className="text-white/80 leading-relaxed text-sm lg:text-base text-left">{paragraph}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            </div>

            {/* Chambres Froides - Item */}
            <div className="border-t border-white/10 pt-16 pb-8">
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-full lg:w-1/2 h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 flex items-center justify-center relative z-10">
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    WebkitMaskImage: 'url(/images/expertises/chambre_froide.png)',
                    maskImage: 'url(/images/expertises/chambre_froide.png)',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    backgroundColor: '#537FE7',
                  }}
                />
                <TrimmedImage 
                  src="/images/expertises/chambre_froide.png" 
                  alt="Chambres Froides"
                  className="w-full h-full object-contain relative z-30"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                />
              </div>
              <div className="w-full lg:w-1/2 text-left relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance text-left"
                  >
                    {t("Chambres Froides Positives & Négatives", "Positive & Negative Cold Rooms")}
                  </ScrollSlideTitle>
                </div>
                <motion.p
                  className="text-lg lg:text-xl text-white/80 leading-relaxed lg:leading-loose text-left"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {t(
                    "Conformes HACCP pour agroalimentaire et pharmaceutique",
                    "HACCP-compliant for food and pharmaceutical use"
                  )}
                </motion.p>
                <div className="mt-6 flex justify-start">
                  <motion.button
                    onClick={() => toggleDomain("Chambres Froides Positives & Négatives")}
                    className="rounded-sm btn-effect-5 btn-standard relative"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded["Chambres Froides Positives & Négatives"]
                      ? t("Réduire", "Collapse")
                      : t("Plus de détails", "More details")}
                  </motion.button>
                </div>
                <AnimatePresence initial={false}>
                  {expanded["Chambres Froides Positives & Négatives"] && (
                    <motion.div
                      key="details-chambres"
                      initial={{ height: 0, opacity: 0, y: -8 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden mt-6 text-left"
                    >
                      {coldRoomsContent.subtitle && (
                        <p className="text-white/90 text-base lg:text-lg mb-3 text-left">{coldRoomsContent.subtitle}</p>
                      )}
                      <div className="space-y-4">
                        {coldRoomsContent.paragraphs.map((paragraph, idx) => (
                          <p key={idx} className="text-white/80 leading-relaxed text-sm lg:text-base">{paragraph}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            </div>

            {/* Groupes à Eau Glacée - Item */}
            <div className="border-t border-white/10 pt-16 pb-8">
            <motion.div
              className="flex flex-col lg:flex-row-reverse items-center gap-6 sm:gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-full lg:w-1/2 h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 flex items-center justify-center relative z-10">
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    WebkitMaskImage: 'url(/images/expertises/Whisk_156a412801b7bdda1c24335148af6254dr-removebg-preview.png)',
                    maskImage: 'url(/images/expertises/Whisk_156a412801b7bdda1c24335148af6254dr-removebg-preview.png)',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    backgroundColor: '#537FE7',
                  }}
                />
                <TrimmedImage 
                  src="/images/expertises/Whisk_156a412801b7bdda1c24335148af6254dr-removebg-preview.png" 
                  alt="Groupes à Eau Glacée"
                  className="w-full h-full object-contain relative z-30"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                />
              </div>
              <div className="w-full lg:w-1/2 text-left relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromRight"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance text-left"
                  >
                    {t("Groupes à Eau Glacée", "Chilled-Water Plants")}
                  </ScrollSlideTitle>
                </div>
                <motion.p
                  className="text-lg lg:text-xl text-white/80 leading-relaxed lg:leading-loose text-left"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {t(
                    "Refroidissement centralisé pour grands bâtiments et industries",
                    "Centralised cooling for large buildings and industry"
                  )}
                </motion.p>
                <div className="mt-6 flex justify-start">
                  <motion.button
                    onClick={() => toggleDomain("Groupes à Eau Glacée")}
                    className="rounded-sm btn-effect-5 btn-standard relative"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded["Groupes à Eau Glacée"]
                      ? t("Réduire", "Collapse")
                      : t("Plus de détails", "More details")}
                  </motion.button>
                </div>
                <AnimatePresence initial={false}>
                  {expanded["Groupes à Eau Glacée"] && (
                    <motion.div
                      key="details-eauglacee"
                      initial={{ height: 0, opacity: 0, y: -8 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden mt-6 text-left"
                    >
                      {chilledWaterContent.subtitle && (
                        <p className="text-white/90 text-base lg:text-lg mb-3 text-left">{chilledWaterContent.subtitle}</p>
                      )}
                      <div className="space-y-4">
                        {chilledWaterContent.paragraphs.map((paragraph, idx) => (
                          <p key={idx} className="text-white/80 leading-relaxed text-sm lg:text-base text-left">{paragraph}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            </div>

            {/* Récupérateurs de Chaleur - Item */}
            <div className="border-t border-white/10 pt-16 pb-8">
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-full lg:w-1/2 h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 flex items-center justify-center relative z-10">
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    WebkitMaskImage: 'url(/images/expertises/recuperateur.png)',
                    maskImage: 'url(/images/expertises/recuperateur.png)',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    backgroundColor: '#537FE7',
                  }}
                />
                <TrimmedImage 
                  src="/images/expertises/recuperateur.png" 
                  alt="Récupérateurs de Chaleur"
                  className="w-full h-full object-contain relative z-30"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                />
              </div>
              <div className="w-full lg:w-1/2 text-left relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance text-left"
                  >
                    {t("Récupérateurs de Chaleur", "Heat Recovery Systems")}
                  </ScrollSlideTitle>
                </div>
                <motion.p
                  className="text-lg lg:text-xl text-white/80 leading-relaxed lg:leading-loose text-left"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {t(
                    "Technologies Boostherm pour optimisation énergétique",
                    "Boostherm technologies for energy optimisation"
                  )}
                </motion.p>
                <div className="mt-6 flex justify-start">
                  <motion.button
                    onClick={() => toggleDomain("Récupérateurs de Chaleur")}
                    className="rounded-sm btn-effect-5 btn-standard relative"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded["Récupérateurs de Chaleur"]
                      ? t("Réduire", "Collapse")
                      : t("Plus de détails", "More details")}
                  </motion.button>
                </div>
                <AnimatePresence initial={false}>
                  {expanded["Récupérateurs de Chaleur"] && (
                    <motion.div
                      key="details-recup"
                      initial={{ height: 0, opacity: 0, y: -8 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden mt-6 text-left"
                    >
                      {heatRecoveryContent.subtitle && (
                        <p className="text-white/90 text-base lg:text-lg mb-3 text-left">{heatRecoveryContent.subtitle}</p>
                      )}
                      <div className="space-y-4">
                        {heatRecoveryContent.paragraphs.map((paragraph, idx) => (
                          <p key={idx} className="text-white/80 leading-relaxed text-sm lg:text-base">{paragraph}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            </div>

            {/* Maintenance & Diagnostics - Item */}
            <div className="border-t border-white/10 pt-16 pb-8">
            <motion.div
              className="flex flex-col lg:flex-row-reverse items-center gap-4 sm:gap-6 lg:gap-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="w-full lg:w-1/2 h-64 lg:h-80 flex items-center justify-center relative z-10">
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    WebkitMaskImage: 'url(/images/expertises/casque.png)',
                    maskImage: 'url(/images/expertises/casque.png)',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    backgroundColor: '#537FE7',
                  }}
                />
                <TrimmedImage 
                  src="/images/expertises/casque.png" 
                  alt="Maintenance & Diagnostic"
                  className="w-full h-full object-contain relative z-30"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                />
              </div>
              <div className="w-full lg:w-1/2 text-left relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromRight"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance text-left"
                  >
                    {t("Maintenance & Diagnostics", "Maintenance & Diagnostics")}
                  </ScrollSlideTitle>
                </div>
                <motion.p
                  className="text-lg lg:text-xl text-white/80 leading-relaxed lg:leading-loose text-left"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {t(
                    "Contrats premium avec suivi proactif et optimisation",
                    "Premium contracts with proactive monitoring and optimisation"
                  )}
                </motion.p>
                <div className="mt-6 flex justify-start">
                  <motion.button
                    onClick={() => toggleDomain("Maintenance & Diagnostics")}
                    className="rounded-sm btn-effect-5 btn-standard relative"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded["Maintenance & Diagnostics"]
                      ? t("Réduire", "Collapse")
                      : t("Plus de détails", "More details")}
                  </motion.button>
                </div>
                <AnimatePresence initial={false}>
                  {expanded["Maintenance & Diagnostics"] && (
                    <motion.div
                      key="details-maintenance"
                      initial={{ height: 0, opacity: 0, y: -8 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden mt-6 text-left"
                    >
                      {maintenanceContent.subtitle && (
                        <p className="text-white/90 text-base lg:text-lg mb-3 text-left">{maintenanceContent.subtitle}</p>
                      )}
                      <div className="space-y-4">
                        {maintenanceContent.paragraphs.map((paragraph, idx) => (
                          <p key={idx} className="text-white/80 leading-relaxed text-sm lg:text-base text-left">{paragraph}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            </div>
            {/* Fin des items — ajouter une dernière ligne */}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </motion.section>

      {/* Notre Processus / Méthodologie - Style GenCell */}
      <motion.section 
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#537FE7]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20 lg:mb-24 xl:mb-32"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-[#E9F8F9] mb-6 orbit">
              {t("Notre Méthodologie", "Our Methodology")}
            </h2>
            <p className="text-[#181823] text-lg">{t("[notre approche est structurée]", "[our approach is structured]")}</p>
            <p className="text-[#E9F8F9]/60 text-lg mt-2">{t("Du diagnostic à la maintenance", "From audit to lifecycle maintenance")}</p>
          </motion.div>

          {/* Étape 1 - Audit */}
          <motion.div
            className="mb-16 border-b border-[#E9F8F9]/30 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#181823] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 01 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                    {t("Audits & Diagnostic sur Site", "On-Site Audits & Diagnostics")}
                  </h3>
                <p className="text-[#181823] text-lg mb-6">
                  {t(
                    "Analyse complète de vos besoins frigorifiques et énergétiques.",
                    "Comprehensive analysis of your refrigeration and energy requirements."
                  )}
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "Nos ingénieurs frigoristes certifiés réalisent une étude approfondie de votre installation existante, de vos contraintes techniques et de vos objectifs de performance. Nous analysons les charges thermiques, les flux d'air, l'isolation et les points critiques.",
                      "Our certified refrigeration engineers run an in-depth assessment of your existing installation, technical constraints and performance objectives. We analyse thermal loads, airflow, insulation and all critical points."
                    )}
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "Cette phase inclut un bilan énergétique précis avec mesures et simulations thermodynamiques pour identifier les potentiels d'optimisation et garantir le dimensionnement optimal de votre future installation.",
                      "This phase includes a detailed energy review with measurements and thermodynamic simulations to uncover optimisation levers and guarantee optimal sizing of your future installation."
                    )}
                  </p>
                </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Étape 2 - Proposition */}
          <motion.div
            className="mb-16 border-b border-[#E9F8F9]/30 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#181823] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 02 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                    {t("Proposition sur Mesure", "Tailored Proposal")}
                  </h3>
                <p className="text-[#181823] text-lg mb-6">
                  {t(
                    "Étude technique détaillée, plans 3D et simulations de performance.",
                    "Detailed technical study, 3D layouts and performance simulations."
                  )}
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "Notre bureau d'études conçoit une solution technique optimisée avec plans détaillés, schémas de principe, sélection des équipements et simulations de performance. Chaque projet bénéficie d'une approche sur mesure adaptée à vos contraintes spécifiques.",
                      "Our engineering office designs an optimised technical solution with detailed plans, schematics, equipment selection and performance simulations. Every project benefits from a bespoke approach tuned to your specific constraints."
                    )}
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "Nous proposons plusieurs scénarios avec analyse coût/bénéfice, retour sur investissement et conformité aux normes en vigueur (RT2012, RE2020, HACCP selon votre secteur).",
                      "We present several scenarios with cost/benefit analysis, ROI projection and compliance with applicable standards (RT2012, RE2020, HACCP depending on your sector)."
                    )}
                  </p>
                </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Étape 3 - Installation */}
          <motion.div
            className="mb-16 border-b border-[#E9F8F9]/30 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#181823] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 03 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                    {t("Installation par Équipes Certifiées", "Installation by Certified Teams")}
                  </h3>
                <p className="text-[#181823] text-lg mb-6" suppressHydrationWarning>
                  {t(
                    "Réalisation par des techniciens habilités aux fluides frigorigènes avec équipements de pointe.",
                    "Delivered by refrigerant-certified technicians equipped with the latest tools."
                  )}
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed" suppressHydrationWarning>
                    {t(
                      "Nos équipes habilitées aux fluides frigorigènes réalisent l'installation selon les règles de l'art. Nous utilisons exclusivement des équipements de marques reconnues et respectons scrupuleusement les normes de sécurité et environnementales.",
                      "Our refrigerant-certified teams install to the highest standards, using equipment from trusted brands and complying rigorously with safety and environmental regulations."
                    )}
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "Chaque étape fait l'objet d'un contrôle qualité rigoureux avec documentation complète des interventions, tests d'étanchéité et vérifications de conformité.",
                      "Every stage undergoes strict quality control with complete documentation, leak testing and compliance checks."
                    )}
                  </p>
                </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Étape 4 - Mise en Service */}
          <motion.div
            className="mb-16 border-b border-[#E9F8F9]/30 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#181823] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 04 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                    {t("Mise en Service & Tests Performance", "Commissioning & Performance Testing")}
                  </h3>
                <p className="text-[#181823] text-lg mb-6">
                  {t(
                    "Optimisation des réglages et validation des performances attendues.",
                    "Fine-tuning of settings and validation of expected performance."
                  )}
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "La mise en service comprend l'optimisation fine de tous les paramètres de fonctionnement, la calibration des régulations et la validation des performances énergétiques. Nous réalisons des tests complets sur plusieurs cycles de fonctionnement.",
                      "Commissioning includes fine-tuning every operating parameter, calibrating control systems and validating energy performance. We perform full tests across multiple operating cycles."
                    )}
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "Formation complète de vos équipes aux nouveaux équipements, remise de la documentation technique et création du carnet de suivi personnalisé pour optimiser la maintenance future.",
                      "We provide thorough training for your teams on the new equipment, hand over full technical documentation and create a personalised operations log to streamline future maintenance."
                    )}
                  </p>
                </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Étape 5 - Maintenance */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#181823] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 05 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                    {t("Maintenance & Suivi Proactif", "Maintenance & Proactive Monitoring")}
                  </h3>
                <p className="text-[#181823] text-lg mb-6">
                  {t(
                    "Contrats premium avec télésurveillance et interventions préventives.",
                    "Premium contracts with remote monitoring and preventive interventions."
                  )}
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "Nos contrats de maintenance premium incluent des visites préventives programmées, la télésurveillance 24/7 de vos installations critiques et l'intervention d'urgence avec astreinte technique. Nous optimisons en continu les performances de vos équipements.",
                      "Our premium maintenance contracts include scheduled preventive visits, 24/7 remote monitoring of critical assets and emergency interventions with on-call specialists. We continually optimise your equipment's performance."
                    )}
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "Reporting détaillé avec suivi énergétique, recommandations d'amélioration et planification des renouvellements d'équipements pour anticiper vos investissements futurs.",
                      "Detailed reporting with energy tracking, improvement recommendations and renewal planning to anticipate future investments."
                    )}
                  </p>
                </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Certifications & Garanties */}
      <motion.section 
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#E9F8F9]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20 lg:mb-24 xl:mb-32"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-[#181823] mb-6 orbit">
              {t("Certifications & Garanties", "Certifications & Guarantees")}
            </h2>
            <p className="text-[#537FE7] text-lg">{t("[nos engagements qualité]", "[our quality commitments]")}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            <motion.div
              className="p-6 bg-white text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-2 satoshi">
                {t("C2E — Certificats d’Économies d’Énergie", "C2E — Energy Savings Certificates")}
              </h3>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm">
                {t("Montage complet des dossiers et maximisation des primes énergie.", "Full management of paperwork and maximised energy incentives.")}
              </p>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm mt-1">
                {t("ROI accéléré: fiches standardisées ciblées et adaptées à votre site.", "Accelerated ROI with tailored standard sheets for your site.")}
              </p>
            </motion.div>

            <motion.div
              className="p-6 bg-white text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-2 satoshi">
                {t("RGE — Reconnu Garant de l’Environnement", "RGE — Environmentally Certified Contractor")}
              </h3>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm">
                {t("Travaux éligibles aux aides publiques avec qualité d’exécution contrôlée.", "Projects eligible for public incentives with audited quality standards.")}
              </p>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm mt-1">
                {t("Engagement de performance et traçabilité complète jusqu’à la réception.", "Performance commitment and full traceability through handover.")}
              </p>
            </motion.div>

            <motion.div
              className="p-6 bg-white text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-2 satoshi">
                {t("Assurance Décennale", "Ten-Year Liability Insurance")}
              </h3>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm">
                {t("Couverture 10 ans sur nos ouvrages et interfaces multi‑lots.", "Ten-year coverage on our works and multi-trade interfaces.")}
              </p>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm mt-1">
                {t("Sérénité contractuelle et réactivité en cas de sinistre.", "Contractual peace of mind and rapid response in the event of a claim.")}
              </p>
            </motion.div>

            <motion.div
              className="p-6 bg-white text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-2 satoshi">
                {t("Conformité HACCP", "HACCP Compliance")}
              </h3>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm">
                {t("Procédures, enregistrements et plans de nettoyage validés.", "Validated procedures, records and sanitation plans.")}
              </p>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm mt-1">
                {t("Audits réussis: maîtrise des risques et continuité de service assurée.", "Audit success ensured—risk control and service continuity guaranteed.")}
              </p>
            </motion.div>
          </div>

          {/* Nos Engagements */}
          <motion.div
            className="bg-[#181823] rounded-2xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-8 text-center orbit">
              {t("Nos Engagements Qualité", "Our Quality Commitments")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-[#537FE7] text-4xl mb-4">24/7</div>
                <h4 className="text-lg font-medium text-[#E9F8F9] mb-2">{t("Service d'Urgence", "Emergency Service")}</h4>
                <p className="text-[#E9F8F9]/70">
                  {t("Interventions 24h/24 et 7j/7 pour vos installations critiques", "24/7 interventions for your mission-critical installations")}
                </p>
              </div>
              <div className="text-center">
                <div className="text-[#537FE7] text-4xl mb-4">≤ 4h</div>
                <h4 className="text-lg font-medium text-[#E9F8F9] mb-2">{t("Délai d'Intervention", "Response Time")}</h4>
                <p className="text-[#E9F8F9]/70">
                  {t("Réactivité garantie en Île-de-France", "Guaranteed responsiveness across Île-de-France")}
                </p>
              </div>
              <div className="text-center">
                <div className="text-[#537FE7] text-4xl mb-4">10 ans</div>
                <h4 className="text-lg font-medium text-[#E9F8F9] mb-2">{t("Garantie Étendue", "Extended Warranty")}</h4>
                <p className="text-[#E9F8F9]/70">
                  {t("Tranquillité sur le long terme", "Long-term peace of mind")}
                </p>
              </div>
            </div>
          </motion.div>
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
            {t("Votre Projet Frigorifique Commence Ici", "Your Refrigeration Project Starts Here")}
          </motion.h2>
          <motion.p
            className="text-lg text-[#E9F8F9]/80 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t(
              "Confiez-nous votre projet et bénéficiez de notre expertise reconnue. Audit gratuit, devis personnalisé et accompagnement premium.",
              "Entrust us with your project and leverage our recognised expertise. Complimentary audit, tailored quotation and premium support."
            )}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <a href="/contact" className="w-full sm:w-auto">
              <motion.button 
                className="bg-[#537FE7] text-[#E9F8F9] rounded-sm btn-effect-5 btn-standard w-full whitespace-nowrap"
                whileHover={{ scale: 1.01, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t("Demander un Audit Gratuit", "Request a Complimentary Audit")}
              </motion.button>
            </a>
            <a href="/contact" className="w-full sm:w-auto">
              <motion.button 
                className="border border-[#E9F8F9]/30 text-[#E9F8F9] rounded-sm btn-effect-5 btn-standard w-full whitespace-nowrap"
                whileHover={{ scale: 1.01, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t("Devis Sur-Mesure", "Tailored Quote")}
              </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Pop-ups supprimés conformément à la nouvelle UX */}
    </div>
  )
}