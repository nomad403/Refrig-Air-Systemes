"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import ScrollSlideTitle from "./scroll-slide-title"
import { useLanguage } from "@/contexts/language-context"

// Composant formulaire minimaliste
function ContactFormMinimal() {
  const { isFrench } = useLanguage()
  const t = (fr: string, en: string) => (isFrench ? fr : en)
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
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi")
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error("Erreur:", error)
      alert(
        t(
          "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement.",
          "An error occurred while sending. Please try again or contact us directly."
        )
      )
    } finally {
      setIsSubmitting(false)
    }
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
        <h3 className="text-2xl font-medium text-[#181823] mb-4">
          {t("Message envoyé avec succès", "Message sent successfully")}
        </h3>
        <p className="text-[#181823]/70 mb-6">
          {t(
            "Nos experts vous contacteront sous 24h pour étudier votre projet de maintenance climatisation.",
            "Our experts will contact you within 24 hours to review your HVAC maintenance project."
          )}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-3 bg-[#181823] text-[#E9F8F9] rounded-sm hover:bg-[#181823]/90 transition-colors"
        >
          {t("Nouveau message", "New message")}
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div>
        <label className="block text-sm font-medium text-[#181823] mb-3 uppercase tracking-wide">
          {t("NOM", "NAME")}
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
            {t("EMAIL", "EMAIL")}
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
          {t("TÉLÉPHONE", "PHONE")}
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
          {t("ENTREPRISE", "COMPANY")}
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
          {t("NIVEAU D'URGENCE", "URGENCY LEVEL")}
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
            {t("Sélectionner le niveau d'urgence", "Select urgency level")}
          </motion.option>
          <motion.option 
            value="critique"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {t("CRITIQUE - Intervention immédiate", "CRITICAL – Immediate intervention")}
          </motion.option>
          <motion.option 
            value="urgent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {t("URGENT - Sous 24h", "URGENT – Within 24h")}
          </motion.option>
          <motion.option 
            value="normal"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {t("NORMAL - Planning standard", "STANDARD – Scheduled timeline")}
          </motion.option>
          <motion.option 
            value="projet"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {t("PROJET - Étude préalable", "PROJECT – Preliminary study")}
          </motion.option>
        </motion.select>
      </motion.div>

      <div>
        <label className="block text-sm font-medium text-[#181823] mb-3 uppercase tracking-wide">
          {t("MESSAGE", "MESSAGE")}
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
                 {isSubmitting ? t("ENVOI EN COURS...", "SENDING...") : t("ENVOYER", "SEND")}
        </motion.button>
      </div>
    </form>
  )
}

// Composant formulaire de contact premium
function ContactForm() {
  const { isFrench } = useLanguage()
  const t = (fr: string, en: string) => (isFrench ? fr : en)
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
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi")
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error("Erreur:", error)
      alert(
        t(
          "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement.",
          "An error occurred while sending. Please try again or contact us directly."
        )
      )
    } finally {
      setIsSubmitting(false)
    }
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
        <h3 className="text-2xl font-medium text-[#181823] mb-4">
          {t("Message envoyé avec succès", "Message sent successfully")}
        </h3>
        <p className="text-[#181823]/70 mb-6">
          {t(
            "Nos experts vous contacteront sous 24h pour étudier votre projet de maintenance climatisation.",
            "Our experts will contact you within 24 hours to review your HVAC maintenance request."
          )}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-3 bg-[#537FE7] text-white rounded-sm hover:bg-[#537FE7]/90 transition-colors"
        >
          {t("Nouveau message", "New message")}
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-2">
            {t("Nom et prénom *", "Full name *")}
          </label>
          <input
            type="text"
            name="nom"
            required
            value={formData.nom}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors"
            placeholder={t("Jean Dupont", "Jane Doe")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-2">
            {t("Entreprise *", "Company *")}
          </label>
          <input
            type="text"
            name="entreprise"
            required
            value={formData.entreprise}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors"
            placeholder={t("Nom de votre société", "Your company name")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-2">
            {t("Email *", "Email *")}
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors"
            placeholder={t("jean.dupont@entreprise.com", "jane.doe@company.com")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-2">
            {t("Téléphone *", "Phone *")}
          </label>
          <input
            type="tel"
            name="telephone"
            required
            value={formData.telephone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors"
            placeholder={t("01 23 45 67 89", "+33 1 23 45 67 89")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-2">
            {t("Secteur d'activité *", "Industry *")}
          </label>
          <select
            name="secteur"
            required
            value={formData.secteur}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors"
          >
            <option value="">{t("Sélectionnez votre secteur", "Select your industry")}</option>
            <option value="data-center">{t("Data Center / IT", "Data Centre / IT")}</option>
            <option value="laboratoire">{t("Laboratoire / Pharmacie", "Laboratory / Pharmaceutical")}</option>
            <option value="agroalimentaire">{t("Agroalimentaire", "Agri-food")}</option>
            <option value="industrie">{t("Industrie", "Industry")}</option>
            <option value="commercial">{t("Commercial / Tertiaire", "Commercial / Services")}</option>
            <option value="autre">{t("Autre", "Other")}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#181823] mb-2">
            {t("Urgence", "Urgency")}
          </label>
          <select
            name="urgence"
            value={formData.urgence}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors"
          >
            <option value="">{t("Niveau d'urgence", "Urgency level")}</option>
            <option value="critique">{t("Critique - Intervention immédiate", "Critical – Immediate intervention")}</option>
            <option value="urgent">{t("Urgent - Sous 24h", "Urgent – Within 24h")}</option>
            <option value="normal">{t("Normal - Planning standard", "Standard – Scheduled timeline")}</option>
            <option value="projet">{t("Projet - Étude préalable", "Project – Preliminary study")}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#181823] mb-2">
          {t("Description de votre besoin *", "Describe your need *")}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#181823]/20 rounded-sm focus:border-[#537FE7] focus:outline-none transition-colors resize-none"
          placeholder={t(
            "Décrivez votre installation, le type de maintenance souhaité, vos contraintes techniques...",
            "Describe your installation, the maintenance needed, your technical constraints..."
          )}
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#537FE7] text-white font-medium rounded-sm hover:bg-[#537FE7]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? t("Envoi en cours...", "Sending...") : t("Envoyer ma demande", "Submit my request")}
      </motion.button>
    </form>
  )
}

export default function ContactSections() {
  const { isFrench } = useLanguage()
  const t = (fr: string, en: string) => (isFrench ? fr : en)
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
                {(isFrench
                  ? ["Contactez nos", "experts maintenance"]
                  : ["Talk to our", "maintenance experts"]
                ).map((line, index) => (
                  <span key={`intro-headline-${index}`} className="block">
                    {line}
                  </span>
                ))}
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
                {t(
                  "Pour vos installations climatisation et froid critiques",
                  "Supporting your mission-critical HVAC and refrigeration assets"
                )}
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#E9F8F9]/80 leading-relaxed mb-6 sm:mb-8">
                {t(
                  "Nos ingénieurs frigoristes habilités aux fluides frigorigènes vous accompagnent dans la maintenance de vos installations critiques. Data centers, laboratoires pharmaceutiques, industrie agroalimentaire : expertise reconnue et interventions garanties.",
                  "Our certified refrigeration engineers maintain your critical infrastructure. Data centres, pharmaceutical labs, agri-food facilities—proven expertise with guaranteed response times."
                )}
              </p>
              <p className="text-[#537FE7] text-sm sm:text-base lg:text-lg">
                {t("—Réponse garantie sous 24h pour vos projets premium.", "—Guaranteed response within 24 hours for premium projects.")}
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
                  {t("Contact", "Contact")}
                </h2>
                <p className="text-base sm:text-lg text-[#181823]/70 leading-relaxed">
                  {t(
                    "Nos experts maintenance climatisation vous accompagnent dans vos projets critiques. Data centers, laboratoires, industrie : expertise reconnue et interventions garanties.",
                    "Our HVAC maintenance specialists support your critical projects. Data centres, laboratories, industry: recognised expertise with guaranteed interventions."
                  )}
                </p>
              </div>

              <div className="text-xs sm:text-sm text-[#181823]/60 leading-relaxed">
                <p>
                  {t(
                    "Maintenance préventive et corrective pour installations climatisation critiques. Interventions 24h/24 et 7j/7, garanties sous 4h en Île-de-France. Opérations éligibles C2E et conformité réglementaire assurées.",
                    "Preventive and corrective maintenance for critical HVAC systems. 24/7 interventions with response times under 4 hours across Île-de-France. C2E eligible work with full regulatory compliance."
                  )}
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
                <h2 className="text-xs sm:text-sm font-medium text-[#E9F8F9] mb-6 sm:mb-8 uppercase tracking-wider">
                  {t("—Nos bureaux", "—Our offices")}
                </h2>
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
                  {"REFRIG'AIR"}
                  <span className="block">SYSTEMES</span>
                </h1>
              </div>

              {/* Informations de contact */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <p className="text-base sm:text-lg text-[#E9F8F9] mb-1">
                    {t("149 Avenue du Maine", "149 Avenue du Maine")}
                  </p>
                  <p className="text-base sm:text-lg text-[#E9F8F9] mb-3 sm:mb-4">
                    {t("75014 Paris", "75014 Paris")}
                  </p>
                  <p className="text-xs sm:text-sm text-[#E9F8F9]/80 mb-2">
                    {t("tel: 06 67 80 90 74", "tel: +33 6 67 80 90 74")}
                  </p>
                  <p className="text-xs sm:text-sm text-[#E9F8F9]/80">rasenergies@gmail.com</p>
                </div>

                <div className="pt-6 sm:pt-8">
                  <p className="text-xs sm:text-sm text-[#E9F8F9]/70">
                    {t(
                      "Ou envoyez-nous un email à rasenergies@gmail.com",
                      "Or email us at rasenergies@gmail.com"
                    )}
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
            {t("Prêt à Optimiser vos Installations ?", "Ready to optimise your assets?")}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-[#E9F8F9]/80 mb-6 sm:mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t(
              "Rejoignez nos clients premium qui font confiance à notre expertise pour la maintenance de leurs installations climatisation et froid critiques. Contrats sur mesure, interventions garanties et optimisation énergétique.",
              "Join our premium clients who trust our expertise for maintaining their critical HVAC and refrigeration systems. Bespoke contracts, guaranteed interventions and energy optimisation."
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
                {t("Contrat de Maintenance", "Maintenance Contract")}
              </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
