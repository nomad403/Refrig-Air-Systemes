"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import ScrollSlideTitle from "./scroll-slide-title"

// Composant formulaire minimaliste
function ContactFormMinimal() {
  const [formData, setFormData] = useState({
    nom: "",
    entreprise: "",
    email: "",
    telephone: "",
    secteur: "",
    urgence: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-[#181823] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#E9F8F9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-medium text-[#181823] mb-4">Message envoyé avec succès</h3>
        <p className="text-[#181823]/70 mb-6">
          Nos experts vous contacteront sous 24h pour étudier votre projet de maintenance climatisation.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-3 bg-[#181823] text-[#E9F8F9] rounded-sm hover:bg-[#181823]/90 transition-colors"
        >
          Nouveau message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div>
        <label className="block text-sm font-medium text-[#181823] mb-3 uppercase tracking-wide">
          NOM
        </label>
          <input
            type="text"
            name="nom"
            required
            value={formData.nom}
            onChange={handleChange}
            className="w-full bg-transparent border-0 border-b border-[#181823]/30 pb-2 focus:border-[#181823] focus:outline-none transition-colors text-[#181823] placeholder-[#181823]/40"
            placeholder=""
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-3 uppercase tracking-wide">
            EMAIL
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border-0 border-b border-[#181823]/30 pb-2 focus:border-[#181823] focus:outline-none transition-colors text-[#181823] placeholder-[#181823]/40"
            placeholder=""
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div>
        <label className="block text-sm font-medium text-[#181823] mb-3 uppercase tracking-wide">
          TÉLÉPHONE
        </label>
          <input
            type="tel"
            name="telephone"
            required
            value={formData.telephone}
            onChange={handleChange}
            className="w-full bg-transparent border-0 border-b border-[#181823]/30 pb-2 focus:border-[#181823] focus:outline-none transition-colors text-[#181823] placeholder-[#181823]/40"
            placeholder=""
          />
        </div>
        <div>
        <label className="block text-sm font-medium text-[#181823] mb-3 uppercase tracking-wide">
          ENTREPRISE
        </label>
          <input
            type="text"
            name="entreprise"
            required
            value={formData.entreprise}
            onChange={handleChange}
            className="w-full bg-transparent border-0 border-b border-[#181823]/30 pb-2 focus:border-[#181823] focus:outline-none transition-colors text-[#181823] placeholder-[#181823]/40"
            placeholder=""
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-[#181823] mb-3 uppercase tracking-wide">
          NIVEAU D'URGENCE
        </label>
        <motion.select
          name="urgence"
          value={formData.urgence}
          onChange={handleChange}
          className="w-full bg-transparent border-0 border-b border-[#181823]/30 pb-2 focus:border-[#181823] focus:outline-none transition-colors text-[#181823] cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <motion.option 
            value=""
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
          >
            Sélectionner le niveau d'urgence
          </motion.option>
          <motion.option 
            value="critique"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            CRITIQUE - Intervention immédiate
          </motion.option>
          <motion.option 
            value="urgent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            URGENT - Sous 24h
          </motion.option>
          <motion.option 
            value="normal"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            NORMAL - Planning standard
          </motion.option>
          <motion.option 
            value="projet"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            PROJET - Étude préalable
          </motion.option>
        </motion.select>
      </motion.div>

      <div>
        <label className="block text-sm font-medium text-[#181823] mb-3 uppercase tracking-wide">
          MESSAGE
        </label>
        <textarea
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-transparent border-0 border-b border-[#181823]/30 pb-2 focus:border-[#181823] focus:outline-none transition-colors text-[#181823] placeholder-[#181823]/40 resize-none"
          placeholder=""
        />
      </div>

      <div className="flex justify-start">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-[#181823] text-[#E9F8F9] text-sm font-medium rounded-sm hover:bg-[#181823]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
                 {isSubmitting ? "ENVOI EN COURS..." : "ENVOYER"}
        </motion.button>
      </div>
    </form>
  )
}

// Composant formulaire de contact premium
function ContactForm() {
  const [formData, setFormData] = useState({
    nom: "",
    entreprise: "",
    email: "",
    telephone: "",
    secteur: "",
    urgence: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-[#537FE7] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-medium text-[#181823] mb-4">Message envoyé avec succès</h3>
        <p className="text-[#181823]/70 mb-6">
          Nos experts vous contacteront sous 24h pour étudier votre projet de maintenance climatisation.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-3 bg-[#537FE7] text-white rounded-sm hover:bg-[#537FE7]/90 transition-colors"
        >
          Nouveau message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-2">
            Nom et prénom *
          </label>
          <input
            type="text"
            name="nom"
            required
            value={formData.nom}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors"
            placeholder="Jean Dupont"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-2">
            Entreprise *
          </label>
          <input
            type="text"
            name="entreprise"
            required
            value={formData.entreprise}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors"
            placeholder="Nom de votre société"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors"
            placeholder="jean.dupont@entreprise.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-2">
            Téléphone *
          </label>
          <input
            type="tel"
            name="telephone"
            required
            value={formData.telephone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors"
            placeholder="01 23 45 67 89"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-2">
            Secteur d'activité *
          </label>
          <select
            name="secteur"
            required
            value={formData.secteur}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors"
          >
            <option value="">Sélectionnez votre secteur</option>
            <option value="data-center">Data Center / IT</option>
            <option value="laboratoire">Laboratoire / Pharmacie</option>
            <option value="agroalimentaire">Agroalimentaire</option>
            <option value="industrie">Industrie</option>
            <option value="commercial">Commercial / Tertiaire</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-2">
            Urgence
          </label>
          <select
            name="urgence"
            value={formData.urgence}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors"
          >
            <option value="">Niveau d'urgence</option>
            <option value="critique">Critique - Intervention immédiate</option>
            <option value="urgent">Urgent - Sous 24h</option>
            <option value="normal">Normal - Planning standard</option>
            <option value="projet">Projet - Étude préalable</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#181823] mb-2">
          Description de votre besoin *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors resize-none"
          placeholder="Décrivez votre installation, le type de maintenance souhaité, vos contraintes techniques..."
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#537FE7] text-white font-medium rounded-sm hover:bg-[#537FE7]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
      </motion.button>
    </form>
  )
}

export default function ContactSections() {
  return (
    <div className="relative z-20 bg-[#181823]">
      {/* Introduction Premium */}
      <motion.section 
        id="intro-contact"
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#E9F8F9] orbit uppercase tracking-tight leading-tight max-w-[24ch] sm:max-w-[26ch] lg:max-w-[28ch] text-balance"
              >
                CONTACTEZ NOS<br/>EXPERTS MAINTENANCE
              </ScrollSlideTitle>
            </div>

            {/* Description en dessous à droite */}
            <motion.div
              className="flex-1 mt-8 sm:mt-12 lg:mt-16 xl:mt-20 space-y-4 sm:space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-[#537FE7] mb-6 sm:mb-8 lg:mb-10">
                Pour vos installations climatisation et froid critiques
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#E9F8F9]/80 leading-relaxed mb-6 sm:mb-8">
                Nos ingénieurs frigoristes habilités aux fluides frigorigènes vous accompagnent dans la maintenance de vos installations critiques. Data centers, laboratoires pharmaceutiques, industrie agroalimentaire : expertise reconnue et interventions garanties.
              </p>
              <p className="text-[#537FE7] text-sm sm:text-base lg:text-lg">
                —Réponse garantie sous 24h pour vos projets premium.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Formulaire de Contact - Design Minimaliste */}
      <motion.section 
        id="formulaire"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#E9F8F9]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Contenu à gauche */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#181823] mb-4 sm:mb-6 satoshi uppercase tracking-tight">
                  Contact
                </h2>
                <p className="text-base sm:text-lg text-[#181823]/70 leading-relaxed">
                  Nos experts maintenance climatisation vous accompagnent dans vos projets critiques. 
                  Data centers, laboratoires, industrie : expertise reconnue et interventions garanties.
                </p>
              </div>

              <div className="text-xs sm:text-sm text-[#181823]/60 leading-relaxed">
                <p>
                  Maintenance préventive et corrective pour installations climatisation critiques. 
                  Interventions 24h/24 et 7j/7, garanties sous 4h en Île-de-France. 
                  Opérations éligibles C2E et conformité réglementaire assurées.
                </p>
              </div>
            </motion.div>

            {/* Formulaire à droite - Design minimaliste */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <ContactFormMinimal />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Informations de Contact */}
      <motion.section 
        id="infos"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Image de fond */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/images/contact/concentrated-cleaner-in-rubber-gloves-cleaning-air-conditioning-unit-1024x682.jpg')"
          }}
        />
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-[#181823]/70" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Section gauche */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-xs sm:text-sm font-medium text-[#E9F8F9] mb-6 sm:mb-8 uppercase tracking-wider">—Nos bureaux</h2>
              </div>
            </motion.div>

            {/* Section droite */}
            <motion.div
              className="space-y-8 sm:space-y-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Nom de l'entreprise */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#E9F8F9] uppercase tracking-tight satoshi">
                  REFRIG'AIR<br/>SYSTEMES
                </h1>
              </div>

              {/* Informations de contact */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <p className="text-base sm:text-lg text-[#E9F8F9] mb-1">149 Avenue du Maine</p>
                  <p className="text-base sm:text-lg text-[#E9F8F9] mb-3 sm:mb-4">75014 Paris</p>
                  <p className="text-xs sm:text-sm text-[#E9F8F9]/80 mb-2">tel: 06 67 80 90 74</p>
                  <p className="text-xs sm:text-sm text-[#E9F8F9]/80">contact@refrigairsystemes.com</p>
                </div>

                <div className="pt-6 sm:pt-8">
                  <p className="text-xs sm:text-sm text-[#E9F8F9]/70">
                    Ou envoyez-nous un email à contact@refrigairsystemes.com
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Final */}
      <motion.section 
        id="cta-final"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#181823] text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-light text-[#E9F8F9] mb-4 sm:mb-6 orbit"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Prêt à Optimiser vos Installations ?
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-[#E9F8F9]/80 mb-6 sm:mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Rejoignez nos clients premium qui font confiance à notre expertise pour la maintenance de leurs installations climatisation et froid critiques. Contrats sur mesure, interventions garanties et optimisation énergétique.
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
                Contrat de Maintenance
              </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
