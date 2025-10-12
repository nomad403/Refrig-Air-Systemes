"use client"

import { motion, AnimatePresence } from "framer-motion"
import TrimmedImage from "./trimmed-image"
import ScrollSlideTitle from "./scroll-slide-title"
import { useState } from "react"

export default function ExpertiseSections() {
  // État d'expansion par domaine (révèle le texte SEO au clic)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const domainDetails: Record<string, { subtitle: string; paragraphs: string[] }> = {
    "Climatisation Réversible": {
      subtitle: "Confort premium et continuité de service",
      paragraphs: [
        "Systèmes de climatisation de précision dimensionnés pour les environnements exigeants (bureaux haut de gamme, data centers de proximité, espaces retail premium, vitrines réfrigérées et froid commercial).",
        "Régulation fine température/hygrométrie, optimisation énergétique (inverters, récupération de chaleur) et plans de maintenance préventive adaptés à votre niveau de criticité.",
        "Interventions rapides et traçabilité complète pour garantir disponibilité et confort en continu."
      ]
    },
    "Pompes à Chaleur Industrielles": {
      subtitle: "Haute efficacité et valorisation énergétique",
      paragraphs: [
        "Solutions PAC industrielles pour process et bâtiments tertiaires, avec scénarios de relève N+1 et supervision connectée.",
        "Intégration avec réseaux d’eau glacée, free-cooling et récupération d’énergie pour réduire l’empreinte carbone et les coûts d’exploitation.",
        "Conformité réglementaire et accompagnement complet: étude, mise en service, maintenance proactive."
      ]
    },
    "Chambres Froides Positives & Négatives": {
      subtitle: "Chaîne du froid maîtrisée — agro & pharma",
      paragraphs: [
        "Conception et installation de chambres froides conformes HACCP/ISO 14644, adaptées aux laboratoires, industries agroalimentaires, logistique et froid commercial.",
        "Suivi de température, alarmes, enregistrements et interventions 24h/24 et 7j/7 pour sécuriser produits et échantillons sensibles.",
        "Contrats premium avec diagnostics énergétiques et optimisation des cycles de dégivrage pour vitrines réfrigérées et meubles froids."
      ]
    },
    "Installations Très Haute Technicité": {
      subtitle: "Très basse température et salles blanches — expertise critique",
      paragraphs: [
        "Installations cryogéniques très haute technicité jusqu'à -80°C pour conservation d'échantillons biologiques, vaccins et produits pharmaceutiques sensibles.",
        "Salles blanches ISO 14644 pour industries pharmaceutiques, électroniques et biotechnologiques avec contrôle particules et régulation précise température/hygrométrie.",
        "Expertise reconnue dans les environnements contrôlés critiques avec surveillance continue et maintenance spécialisée pour garantir la conformité réglementaire."
      ]
    },
    "Froid Commercial & Vitrines Réfrigérées": {
      subtitle: "Retail & restauration — performance optimisée",
      paragraphs: [
        "Installation et maintenance de vitrines réfrigérées, meubles froids, armoires frigorifiques pour supermarchés, boutiques et restaurants.",
        "Optimisation énergétique des équipements frigorifiques commerciaux avec fluides écologiques et récupération de chaleur.",
        "Contrats de maintenance spécialisés pour garantir la continuité commerciale et la conservation optimale des produits frais."
      ]
    },
    "Groupes à Eau Glacée": {
      subtitle: "Refroidissement central pour sites critiques",
      paragraphs: [
        "Groupes froid à haut rendement pour data centers, sites industriels et grands ensembles tertiaires. Installations très haute technicité pour environnements critiques.",
        "Ingénierie hydraulique (équilibrage, qualité d'eau, redondance), régulation avancée et monitoring continu avec surveillance 24/7.",
        "Plans de continuité d'activité, pièces critiques en stock et temps d'intervention garantis pour installations très basse température et salles blanches."
      ]
    },
    "Récupérateurs de Chaleur": {
      subtitle: "ROI mesurable et performance durable",
      paragraphs: [
        "Récupération d'énergie sur circuits frigorifiques et CTA pour réduire la facture énergétique. Solutions très haute technicité pour installations critiques.",
        "Études technico-économiques, calculs de retour sur investissement et intégration sans perturber vos opérations en environnements contrôlés.",
        "Reporting périodique de performance et ajustements pour maximiser les gains sur installations très basse température et salles blanches."
      ]
    },
    "Maintenance & Diagnostics": {
      subtitle: "Disponibilité maximale — zéro interruption",
      paragraphs: [
        "Contrats de maintenance premium avec supervision 24/7, télésurveillance et interventions sous 4h en Île-de-France pour installations très haute technicité.",
        "Méthodologie prédictive (capteurs, analyses) pour anticiper les dérives et sécuriser vos installations critiques (data centers, laboratoires, salles blanches, très basse température).",
        "Tableaux de bord, traçabilité complète et recommandations d'optimisation en continu pour environnements contrôlés et installations cryogéniques."
      ]
    }
  }

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
                NOTRE EXPERTISE FRIGORIFIQUE
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
                Pour vos environnements climatisation & froid critiques
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 leading-relaxed mb-6 sm:mb-8">
                Conception, installation et maintenance haut de gamme pour data centers, laboratoires, industrie et agroalimentaire. Installations très haute technicité, très basse température et salles blanches. Performances, fiabilité et efficacité énergétique au cœur de chaque projet.
              </p>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                —Élevés par l'expertise, animés par l'excellence.
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
                NOS DOMAINES D'EXPERTISE
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
              <div className="w-full lg:w-1/2 text-center lg:text-left relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance"
                  >
                    Climatisation Réversible
                  </ScrollSlideTitle>
                </div>
                <motion.p
                  className="text-lg lg:text-xl text-white/80 leading-relaxed lg:leading-loose"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Systèmes haute performance pour environnements tertiaires et industriels
                </motion.p>
                <div className="mt-6">
                  <motion.button
                    onClick={() => toggleDomain("Climatisation Réversible")}
                    className="rounded-sm btn-effect-5 btn-standard relative"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded["Climatisation Réversible"] ? "Réduire" : "Plus de détails"}
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
                      {domainDetails["Climatisation Réversible"].subtitle && (
                        <p className="text-white/90 text-base lg:text-lg mb-3">{domainDetails["Climatisation Réversible"].subtitle}</p>
                      )}
                      <div className="space-y-4">
                        {domainDetails["Climatisation Réversible"].paragraphs.map((p, idx) => (
                          <p key={idx} className="text-white/80 leading-relaxed text-sm lg:text-base">{p}</p>
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
              <div className="w-full lg:w-1/2 text-center lg:text-right relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromRight"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance"
                  >
                    Pompes à Chaleur Industrielles
                  </ScrollSlideTitle>
                </div>
                <motion.p
                  className="text-lg lg:text-xl text-white/80 leading-relaxed lg:leading-loose"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Solutions énergétiques durables et haute efficacité
                </motion.p>
                <div className="mt-6 self-center lg:self-end">
                  <motion.button
                    onClick={() => toggleDomain("Pompes à Chaleur Industrielles")}
                    className="rounded-sm btn-effect-5 btn-standard relative"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded["Pompes à Chaleur Industrielles"] ? "Réduire" : "Plus de détails"}
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
                      className="overflow-hidden mt-6 text-right"
                    >
                      {domainDetails["Pompes à Chaleur Industrielles"].subtitle && (
                        <p className="text-white/90 text-base lg:text-lg mb-3">{domainDetails["Pompes à Chaleur Industrielles"].subtitle}</p>
                      )}
                      <div className="space-y-4">
                        {domainDetails["Pompes à Chaleur Industrielles"].paragraphs.map((p, idx) => (
                          <p key={idx} className="text-white/80 leading-relaxed text-sm lg:text-base">{p}</p>
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
              <div className="w-full lg:w-1/2 text-center lg:text-left relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance"
                  >
                    Chambres Froides Positives & Négatives
                  </ScrollSlideTitle>
                </div>
                <motion.p
                  className="text-lg lg:text-xl text-white/80 leading-relaxed lg:leading-loose"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Conformes HACCP pour agroalimentaire et pharmaceutique
                </motion.p>
                <div className="mt-6">
                  <motion.button
                    onClick={() => toggleDomain("Chambres Froides Positives & Négatives")}
                    className="rounded-sm btn-effect-5 btn-standard relative"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded["Chambres Froides Positives & Négatives"] ? "Réduire" : "Plus de détails"}
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
                      {domainDetails["Chambres Froides Positives & Négatives"].subtitle && (
                        <p className="text-white/90 text-base lg:text-lg mb-3">{domainDetails["Chambres Froides Positives & Négatives"].subtitle}</p>
                      )}
                      <div className="space-y-4">
                        {domainDetails["Chambres Froides Positives & Négatives"].paragraphs.map((p, idx) => (
                          <p key={idx} className="text-white/80 leading-relaxed text-sm lg:text-base">{p}</p>
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
              <div className="w-full lg:w-1/2 text-center lg:text-right relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromRight"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance"
                  >
                    Groupes à Eau Glacée
                  </ScrollSlideTitle>
                </div>
                <motion.p
                  className="text-lg lg:text-xl text-white/80 leading-relaxed lg:leading-loose"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Refroidissement centralisé pour grands bâtiments et industries
                </motion.p>
                <div className="mt-6 self-center lg:self-end">
                  <motion.button
                    onClick={() => toggleDomain("Groupes à Eau Glacée")}
                    className="rounded-sm btn-effect-5 btn-standard relative"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded["Groupes à Eau Glacée"] ? "Réduire" : "Plus de détails"}
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
                      className="overflow-hidden mt-6 text-right"
                    >
                      {domainDetails["Groupes à Eau Glacée"].subtitle && (
                        <p className="text-white/90 text-base lg:text-lg mb-3">{domainDetails["Groupes à Eau Glacée"].subtitle}</p>
                      )}
                      <div className="space-y-4">
                        {domainDetails["Groupes à Eau Glacée"].paragraphs.map((p, idx) => (
                          <p key={idx} className="text-white/80 leading-relaxed text-sm lg:text-base">{p}</p>
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
              <div className="w-full lg:w-1/2 text-center lg:text-left relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance"
                  >
                    Récupérateurs de Chaleur
                  </ScrollSlideTitle>
                </div>
                <motion.p
                  className="text-lg lg:text-xl text-white/80 leading-relaxed lg:leading-loose"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Technologies Boostherm pour optimisation énergétique
                </motion.p>
                <div className="mt-6">
                  <motion.button
                    onClick={() => toggleDomain("Récupérateurs de Chaleur")}
                    className="rounded-sm btn-effect-5 btn-standard relative"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded["Récupérateurs de Chaleur"] ? "Réduire" : "Plus de détails"}
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
                      {domainDetails["Récupérateurs de Chaleur"].subtitle && (
                        <p className="text-white/90 text-base lg:text-lg mb-3">{domainDetails["Récupérateurs de Chaleur"].subtitle}</p>
                      )}
                      <div className="space-y-4">
                        {domainDetails["Récupérateurs de Chaleur"].paragraphs.map((p, idx) => (
                          <p key={idx} className="text-white/80 leading-relaxed text-sm lg:text-base">{p}</p>
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
              <div className="w-full lg:w-1/2 text-center lg:text-right relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromRight"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance"
                  >
                    Maintenance & Diagnostics
                  </ScrollSlideTitle>
                </div>
                <motion.p
                  className="text-lg lg:text-xl text-white/80 leading-relaxed lg:leading-loose"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Contrats premium avec suivi proactif et optimisation
                </motion.p>
                <div className="mt-6 self-center lg:self-end">
                  <motion.button
                    onClick={() => toggleDomain("Maintenance & Diagnostics")}
                    className="rounded-sm btn-effect-5 btn-standard relative"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded["Maintenance & Diagnostics"] ? "Réduire" : "Plus de détails"}
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
                      className="overflow-hidden mt-6 text-right"
                    >
                      {domainDetails["Maintenance & Diagnostics"].subtitle && (
                        <p className="text-white/90 text-base lg:text-lg mb-3">{domainDetails["Maintenance & Diagnostics"].subtitle}</p>
                      )}
                      <div className="space-y-4">
                        {domainDetails["Maintenance & Diagnostics"].paragraphs.map((p, idx) => (
                          <p key={idx} className="text-white/80 leading-relaxed text-sm lg:text-base">{p}</p>
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
              Notre Méthodologie
            </h2>
            <p className="text-[#181823] text-lg">[notre approche est structurée]</p>
            <p className="text-[#E9F8F9]/60 text-lg mt-2">Du diagnostic à la maintenance</p>
          </motion.div>

          {/* Étape 1 - Audit */}
          <motion.div
            className="mb-16 border-b border-[#E9F8F9]/30 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-6">
              <span className="text-[#181823] text-lg font-mono mr-4">[ 01 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Audits & Diagnostic sur Site
                </h3>
                <p className="text-[#181823] text-lg mb-6">
                  Analyse complète de vos besoins frigorifiques et énergétiques.
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Nos ingénieurs frigoristes certifiés réalisent une étude approfondie de votre installation existante, de vos contraintes techniques et de vos objectifs de performance. Nous analysons les charges thermiques, les flux d'air, l'isolation et les points critiques.
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Cette phase inclut un bilan énergétique précis avec mesures et simulations thermodynamiques pour identifier les potentiels d'optimisation et garantir le dimensionnement optimal de votre future installation.
                  </p>
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
            <div className="flex items-start mb-6">
              <span className="text-[#181823] text-lg font-mono mr-4">[ 02 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Proposition sur Mesure
                </h3>
                <p className="text-[#181823] text-lg mb-6">
                  Étude technique détaillée, plans 3D et simulations de performance.
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Notre bureau d'études conçoit une solution technique optimisée avec plans détaillés, schémas de principe, sélection des équipements et simulations de performance. Chaque projet bénéficie d'une approche sur mesure adaptée à vos contraintes spécifiques.
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Nous proposons plusieurs scénarios avec analyse coût/bénéfice, retour sur investissement et conformité aux normes en vigueur (RT2012, RE2020, HACCP selon votre secteur).
                  </p>
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
            <div className="flex items-start mb-6">
              <span className="text-[#181823] text-lg font-mono mr-4">[ 03 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Installation par Équipes Certifiées
                </h3>
                <p className="text-[#181823] text-lg mb-6" suppressHydrationWarning>
                  Réalisation par des techniciens habilités aux fluides frigorigènes avec équipements de pointe.
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed" suppressHydrationWarning>
                    Nos équipes habilitées aux fluides frigorigènes réalisent l'installation selon les règles de l'art. Nous utilisons exclusivement des équipements de marques reconnues et respectons scrupuleusement les normes de sécurité et environnementales.
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Chaque étape fait l'objet d'un contrôle qualité rigoureux avec documentation complète des interventions, tests d'étanchéité et vérifications de conformité.
                  </p>
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
            <div className="flex items-start mb-6">
              <span className="text-[#181823] text-lg font-mono mr-4">[ 04 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Mise en Service & Tests Performance
                </h3>
                <p className="text-[#181823] text-lg mb-6">
                  Optimisation des réglages et validation des performances attendues.
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    La mise en service comprend l'optimisation fine de tous les paramètres de fonctionnement, la calibration des régulations et la validation des performances énergétiques. Nous réalisons des tests complets sur plusieurs cycles de fonctionnement.
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Formation complète de vos équipes aux nouveaux équipements, remise de la documentation technique et création du carnet de suivi personnalisé pour optimiser la maintenance future.
                  </p>
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
            <div className="flex items-start mb-6">
              <span className="text-[#181823] text-lg font-mono mr-4">[ 05 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Maintenance & Suivi Proactif
                </h3>
                <p className="text-[#181823] text-lg mb-6">
                  Contrats premium avec télésurveillance et interventions préventives.
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Nos contrats de maintenance premium incluent des visites préventives programmées, la télésurveillance 24/7 de vos installations critiques et l'intervention d'urgence avec astreinte technique. Nous optimisons en continu les performances de vos équipements.
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Reporting détaillé avec suivi énergétique, recommandations d'amélioration et planification des renouvellements d'équipements pour anticiper vos investissements futurs.
                  </p>
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
              Certifications & Garanties
            </h2>
            <p className="text-[#537FE7] text-lg">[nos engagements qualité]</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            <motion.div
              className="p-6 bg-white text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-2 satoshi">C2E — Certificats d’Économies d’Énergie</h3>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm">Montage complet des dossiers et maximisation des primes énergie.</p>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm mt-1">ROI accéléré: fiches standardisées ciblées et adaptées à votre site.</p>
            </motion.div>

            <motion.div
              className="p-6 bg-white text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-2 satoshi">RGE — Reconnu Garant de l’Environnement</h3>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm">Travaux éligibles aux aides publiques avec qualité d’exécution contrôlée.</p>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm mt-1">Engagement de performance et traçabilité complète jusqu’à la réception.</p>
            </motion.div>

            <motion.div
              className="p-6 bg-white text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-2 satoshi">Assurance Décennale</h3>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm">Couverture 10 ans sur nos ouvrages et interfaces multi‑lots.</p>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm mt-1">Sérénité contractuelle et réactivité en cas de sinistre.</p>
            </motion.div>

            <motion.div
              className="p-6 bg-white text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-2 satoshi">Conformité HACCP</h3>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm">Procédures, enregistrements et plans de nettoyage validés.</p>
              <p className="text-[#181823]/70 satoshi leading-relaxed text-sm mt-1">Audits réussis: maîtrise des risques et continuité de service assurée.</p>
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
              Nos Engagements Qualité
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-[#537FE7] text-4xl mb-4">24/7</div>
                <h4 className="text-lg font-medium text-[#E9F8F9] mb-2">Service d'Urgence</h4>
                <p className="text-[#E9F8F9]/70">Interventions 24h/24 et 7j/7 pour vos installations critiques</p>
              </div>
              <div className="text-center">
                <div className="text-[#537FE7] text-4xl mb-4">≤ 4h</div>
                <h4 className="text-lg font-medium text-[#E9F8F9] mb-2">Délai d'Intervention</h4>
                <p className="text-[#E9F8F9]/70">Réactivité garantie en Île-de-France</p>
              </div>
              <div className="text-center">
                <div className="text-[#537FE7] text-4xl mb-4">10 ans</div>
                <h4 className="text-lg font-medium text-[#E9F8F9] mb-2">Garantie Étendue</h4>
                <p className="text-[#E9F8F9]/70">Tranquillité sur le long terme</p>
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
            Votre Projet Frigorifique Commence Ici
          </motion.h2>
          <motion.p
            className="text-lg text-[#E9F8F9]/80 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Confiez-nous votre projet et bénéficiez de notre expertise reconnue. Audit gratuit, devis personnalisé et accompagnement premium.
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
                whileHover={{ scale: 1.05, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Demander un Audit Gratuit
              </motion.button>
            </a>
            <a href="/contact" className="w-full sm:w-auto">
              <motion.button 
                className="border border-[#E9F8F9]/30 text-[#E9F8F9] rounded-sm btn-effect-5 btn-standard w-full whitespace-nowrap"
                whileHover={{ scale: 1.05, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Devis Sur-Mesure
              </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Pop-ups supprimés conformément à la nouvelle UX */}
    </div>
  )
}