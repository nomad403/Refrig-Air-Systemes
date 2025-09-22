"use client"

import { motion } from "framer-motion"

export default function ExpertiseSections() {
  return (
    <div className="relative z-20 bg-[#181823]">
      {/* Header Section - Accroche Premium */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-[#181823] text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl lg:text-6xl font-light text-[#E9F8F9] mb-8 leading-tight orbit"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            NOTRE EXPERTISE FRIGORIFIQUE À VOTRE SERVICE
          </motion.h1>
          <motion.div
            className="text-xl lg:text-2xl font-light text-[#537FE7] mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            [notre expertise est reconnue]
          </motion.div>
          <motion.p
            className="text-lg text-[#E9F8F9]/80 max-w-4xl mx-auto leading-relaxed mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Conception, installation, entretien haut de gamme sur mesure pour les exigences les plus strictes.
          </motion.p>
          <motion.p
            className="text-[#537FE7] text-sm"
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
              Nos Domaines d'Expertise
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Climatisation */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-6">
                Climatisation & Réversible
              </h3>
              <div className="mb-6 overflow-hidden">
                <motion.img 
                  src="/images/expertises/Whisk_efd2273a347e26db2ea40ba11bbf31d5dr-removebg-preview.png" 
                  alt="Climatisation & Réversible"
                  className="w-full h-48 object-contain"
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                />
              </div>
              <p className="text-[#181823]/70 leading-relaxed">
                Systèmes haute performance pour environnements tertiaires et industriels
              </p>
            </motion.div>

            {/* Pompes à Chaleur */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-6">
                Pompes à Chaleur Industrielles
              </h3>
              <div className="mb-6 overflow-hidden">
                <motion.img 
                  src="/images/expertises/Whisk_8e1c4946f8ef139bab04376179289556dr-removebg-preview.png" 
                  alt="Pompes à Chaleur Industrielles"
                  className="w-full h-48 object-contain"
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                />
              </div>
              <p className="text-[#181823]/70 leading-relaxed">
                Solutions énergétiques durables et haute efficacité
              </p>
            </motion.div>

            {/* Chambres Froides */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-6">
                Chambres Froides Positives & Négatives
              </h3>
              <div className="mb-6 overflow-hidden">
                <motion.img 
                  src="/images/expertises/Whisk_4bd159c6b3f9bb195284a95e5bbed094dr-removebg-preview.png" 
                  alt="Chambres Froides"
                  className="w-full h-48 object-contain"
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                />
              </div>
              <p className="text-[#181823]/70 leading-relaxed">
                Conformes HACCP pour agroalimentaire et pharmaceutique
              </p>
            </motion.div>

            {/* Groupes à Eau Glacée */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-6">
                Groupes à Eau Glacée
              </h3>
                <div className="mb-6 overflow-hidden">
                  <motion.img 
                    src="/images/expertises/Whisk_156a412801b7bdda1c24335148af6254dr-removebg-preview.png" 
                    alt="Groupes à Eau Glacée"
                    className="w-4/5 h-48 object-contain mx-auto"
                    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                  />
                </div>
              <p className="text-[#181823]/70 leading-relaxed">
                Refroidissement centralisé pour grands bâtiments et industries
              </p>
            </motion.div>

            {/* Récupérateurs de Chaleur */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-6">
                Récupérateurs de Chaleur
              </h3>
              <div className="mb-6 overflow-hidden">
                <motion.img 
                  src="/images/expertises/Whisk_2fe1bda0bea1b6e93e64685bc5a92f2ddr-removebg-preview.png" 
                  alt="Récupérateurs de Chaleur"
                  className="w-full h-48 object-contain"
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                />
              </div>
              <p className="text-[#181823]/70 leading-relaxed">
                Technologies Boostherm pour optimisation énergétique
              </p>
            </motion.div>

            {/* Maintenance Préventive */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-[#181823] mb-6">
                Maintenance & Diagnostic Énergétique
              </h3>
              <div className="mb-6 overflow-hidden">
                <motion.img 
                  src="/images/expertises/Whisk_21b1bd84fcfd855afb54b91686200f97dr-removebg-preview.png" 
                  alt="Maintenance & Diagnostic"
                  className="w-full h-48 object-contain"
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                />
              </div>
              <p className="text-[#181823]/70 leading-relaxed">
                Contrats premium avec suivi proactif et optimisation
              </p>
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
            className="text-center mb-16"
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
            className="text-center mb-16"
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
              className="text-center bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-[#537FE7]/10 rounded-full flex items-center justify-center">
                <span className="text-[#537FE7] font-bold text-xl">QF</span>
              </div>
              <h3 className="text-lg font-medium text-[#181823] mb-2">QUALI-FROID</h3>
              <p className="text-[#181823]/60 text-sm">Qualification professionnelle frigoristes</p>
            </motion.div>

            {/* RGE */}
            <motion.div
              className="text-center bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-xl">RGE</span>
              </div>
              <h3 className="text-lg font-medium text-[#181823] mb-2">RGE</h3>
              <p className="text-[#181823]/60 text-sm">Reconnu Garant de l'Environnement</p>
            </motion.div>

            {/* Assurance Décennale */}
            <motion.div
              className="text-center bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#181823] mb-2">Assurance Décennale</h3>
              <p className="text-[#181823]/60 text-sm">Garantie 10 ans sur les gros œuvres</p>
            </motion.div>

            {/* Conformité HACCP */}
            <motion.div
              className="text-center bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">HACCP</span>
              </div>
              <h3 className="text-lg font-medium text-[#181823] mb-2">Conformité HACCP</h3>
              <p className="text-[#181823]/60 text-sm">Normes alimentaires et pharmaceutiques</p>
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