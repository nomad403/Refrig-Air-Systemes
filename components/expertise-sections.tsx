"use client"

import { motion } from "framer-motion"
import TrimmedImage from "./trimmed-image"
import ScrollSlideTitle from "./scroll-slide-title"

export default function ExpertiseSections() {
  return (
    <div className="relative z-20 bg-[#181823]">
      {/* Header Section - Accroche Premium */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-[#537FE7] text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl lg:text-6xl font-light text-white mb-8 leading-tight orbit"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            NOTRE EXPERTISE FRIGORIFIQUE À VOTRE SERVICE
          </motion.h1>
          <motion.div
            className="text-xl lg:text-2xl font-light text-white/70 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            [notre expertise est reconnue]
          </motion.div>
          <motion.p
            className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Conception, installation, entretien haut de gamme sur mesure pour les exigences les plus strictes.
          </motion.p>
          <motion.p
            className="text-white text-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            —Élevés par l'expertise, animés par l'excellence.
          </motion.p>
        </div>
      </motion.section>

      {/* Domaines d'Expertise avec Images */}
      <motion.section 
        className="py-32 lg:py-48 px-6 lg:px-12 bg-[#181823]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-32 lg:mb-40"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-[#537FE7] mb-6 orbit">
              NOS DOMAINES D'EXPERTISE
            </h2>
          </motion.div>

          <div className="space-y-32 lg:space-y-48">
            {/* Climatisation - Image à gauche, texte à droite */}
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-full lg:w-1/2 h-72 lg:h-96 flex items-center justify-center relative z-10">
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
                  className="w-auto h-auto max-h-full max-w-full relative z-30 scale-[1.35]"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left relative flex flex-col justify-center">
                <div className="relative z-0">
                  <ScrollSlideTitle
                    direction="fromLeft"
                    className="fluid-title satoshi font-bold uppercase tracking-tight text-white mb-6 lg:mb-8 max-w-[28ch] text-balance"
                  >
                    Climatisation & Réversible
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
              </div>
            </motion.div>

            {/* Pompes à Chaleur - Image à droite, texte à gauche */}
            <motion.div
              className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-full lg:w-1/2 h-72 lg:h-96 flex items-center justify-center relative z-10">
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
                  className="w-auto h-auto max-h-full max-w-full relative z-30 scale-110"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
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
              </div>
            </motion.div>

            {/* Chambres Froides - Image à gauche, texte à droite */}
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-full lg:w-1/2 h-72 lg:h-96 flex items-center justify-center relative z-10">
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
                  className="w-auto h-auto max-h-full max-w-full relative z-30 scale-130"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
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
              </div>
            </motion.div>

            {/* Groupes à Eau Glacée - Image à droite, texte à gauche */}
            <motion.div
              className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-full lg:w-1/2 h-72 lg:h-96 flex items-center justify-center relative z-10">
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
                  className="w-auto h-auto max-h-full max-w-full relative z-30 scale-110"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
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
              </div>
            </motion.div>

            {/* Récupérateurs de Chaleur - Image à gauche, texte à droite */}
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-full lg:w-1/2 h-72 lg:h-96 flex items-center justify-center relative z-10">
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
                  className="w-auto h-auto max-h-full max-w-full relative z-30 scale-115"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
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
              </div>
            </motion.div>

            {/* Maintenance Préventive - Image à droite, texte à gauche */}
            <motion.div
              className="flex flex-col lg:flex-row-reverse items-center gap-2 lg:gap-4"
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
                  className="w-auto h-auto max-h-full max-w-full relative z-30 scale-125"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
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
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Notre Processus / Méthodologie - Style GenCell */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-[#181823]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-24 lg:mb-32"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-[#E9F8F9] mb-6 orbit">
              Notre Méthodologie
            </h2>
            <p className="text-[#537FE7] text-lg">[notre approche est structurée]</p>
            <p className="text-[#E9F8F9]/60 text-lg mt-2">Du diagnostic à la maintenance</p>
          </motion.div>

          {/* Étape 1 - Audit */}
          <motion.div
            className="mb-16 border-b border-[#E9F8F9]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 01 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Audits & Diagnostic sur Site
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
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
            className="mb-16 border-b border-[#E9F8F9]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 02 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Proposition sur Mesure
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
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
            className="mb-16 border-b border-[#E9F8F9]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 03 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Installation par Équipes Certifiées
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  Réalisation par des techniciens QUALI-FROID avec équipements de pointe.
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Nos équipes certifiées QUALI-FROID et habilitées aux fluides frigorigènes réalisent l'installation selon les règles de l'art. Nous utilisons exclusivement des équipements de marques reconnues et respectons scrupuleusement les normes de sécurité et environnementales.
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
            className="mb-16 border-b border-[#E9F8F9]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 04 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Mise en Service & Tests Performance
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
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
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 05 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Maintenance & Suivi Proactif
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
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
        className="py-20 px-6 lg:px-12 bg-[#E9F8F9]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-24 lg:mb-32"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* QUALI-FROID */}
            <motion.div
              className="text-center p-6 transition-colors duration-200 transform-gpu backface-hidden bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img 
                  src="/images/certifications/qualifroid.svg" 
                  alt="Logo QUALI-FROID"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-light text-[#181823] mb-2 satoshi">QUALI-FROID</h3>
              <p className="text-[#181823]/70 satoshi font-light leading-relaxed text-sm">Qualification professionnelle frigoristes</p>
            </motion.div>

            {/* RGE */}
            <motion.div
              className="text-center p-6 transition-colors duration-200 transform-gpu backface-hidden bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img 
                  src="/images/certifications/rge.svg" 
                  alt="Logo RGE Reconnu Garant de l'Environnement"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-light text-[#181823] mb-2 satoshi">RGE</h3>
              <p className="text-[#181823]/70 satoshi font-light leading-relaxed text-sm">Reconnu Garant de l'Environnement</p>
            </motion.div>

            {/* Assurance Décennale */}
            <motion.div
              className="text-center p-6 transition-colors duration-200 transform-gpu backface-hidden bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img 
                  src="/images/certifications/assurance-decennale.svg" 
                  alt="Logo Assurance Décennale"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-light text-[#181823] mb-2 satoshi">Assurance Décennale</h3>
              <p className="text-[#181823]/70 satoshi font-light leading-relaxed text-sm">Garantie 10 ans sur les gros œuvres</p>
            </motion.div>

            {/* Conformité HACCP */}
            <motion.div
              className="text-center p-6 transition-colors duration-200 transform-gpu backface-hidden bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img 
                  src="/images/certifications/haccp.svg" 
                  alt="Logo Conformité HACCP"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-light text-[#181823] mb-2 satoshi">Conformité HACCP</h3>
              <p className="text-[#181823]/70 satoshi font-light leading-relaxed text-sm">Normes alimentaires et pharmaceutiques</p>
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
                <p className="text-[#E9F8F9]/70">Astreinte technique pour vos installations critiques</p>
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
              Devis Sur-Mesure
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}