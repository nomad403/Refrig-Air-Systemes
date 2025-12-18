import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    // Vérifier que toutes les variables d'environnement sont disponibles
    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM
    const toEmail = process.env.RESEND_TO

    if (!apiKey) {
      console.error("RESEND_API_KEY n'est pas configurée")
      return NextResponse.json(
        { error: "Configuration serveur manquante. Veuillez contacter l'administrateur." },
        { status: 500 }
      )
    }

    if (!fromEmail) {
      console.error("RESEND_FROM n'est pas configurée")
      return NextResponse.json(
        { error: "Configuration serveur manquante. Veuillez contacter l'administrateur." },
        { status: 500 }
      )
    }

    if (!toEmail) {
      console.error("RESEND_TO n'est pas configurée")
      return NextResponse.json(
        { error: "Configuration serveur manquante. Veuillez contacter l'administrateur." },
        { status: 500 }
      )
    }

    // Initialiser Resend uniquement au moment de l'exécution
    const resend = new Resend(apiKey)

    const body = await request.json()
    const { nom, entreprise, email, telephone, secteur, urgence, message } = body

    // Validation des champs requis
    if (!nom || !email || !telephone || !entreprise || !message) {
      return NextResponse.json(
        { error: "Tous les champs requis doivent être remplis." },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide." },
        { status: 400 }
      )
    }

    // Préparer le contenu de l'email
    const urgencyLabels: Record<string, { fr: string; en: string }> = {
      critique: { fr: "CRITIQUE - Intervention immédiate", en: "CRITICAL – Immediate intervention" },
      urgent: { fr: "URGENT - Sous 24h", en: "URGENT – Within 24h" },
      normal: { fr: "NORMAL - Planning standard", en: "STANDARD – Scheduled timeline" },
      projet: { fr: "PROJET - Étude préalable", en: "PROJECT – Preliminary study" },
    }

    const sectorLabels: Record<string, { fr: string; en: string }> = {
      "data-center": { fr: "Data Center / IT", en: "Data Centre / IT" },
      laboratoire: { fr: "Laboratoire / Pharmacie", en: "Laboratory / Pharmaceutical" },
      agroalimentaire: { fr: "Agroalimentaire", en: "Agri-food" },
      industrie: { fr: "Industrie", en: "Industry" },
      commercial: { fr: "Commercial / Tertiaire", en: "Commercial / Services" },
      autre: { fr: "Autre", en: "Other" },
    }

    const urgencyText = urgence ? urgencyLabels[urgence]?.fr || urgence : "Non spécifié"
    const sectorText = secteur ? sectorLabels[secteur]?.fr || secteur : "Non spécifié"

    // Fonction pour échapper les caractères HTML
    const escapeHtml = (text: string): string => {
      const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      }
      return text.replace(/[&<>"']/g, (m) => map[m])
    }

    // Échapper toutes les valeurs utilisées dans le HTML
    const safeNom = escapeHtml(nom)
    const safeEntreprise = escapeHtml(entreprise)
    const safeEmail = escapeHtml(email)
    const safeTelephone = escapeHtml(telephone)
    const safeSectorText = escapeHtml(sectorText)
    const safeUrgencyText = escapeHtml(urgencyText)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    // Envoyer l'email avec Resend
    // Utilise les variables d'environnement configurées dans Vercel
    // Note: Si le domaine n'est pas vérifié dans Resend, utilisez temporairement "onboarding@resend.dev"
    console.log("Tentative d'envoi d'email:", {
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      hasApiKey: !!apiKey
    })

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Nouveau contact depuis le site web - ${safeEntreprise}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #181823; color: #E9F8F9; padding: 20px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 30px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #181823; margin-bottom: 5px; display: block; }
              .value { color: #666; }
              .message-box { background-color: white; padding: 15px; border-left: 4px solid #537FE7; margin-top: 10px; }
              .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Nouveau Contact - Refrig'Air Systèmes</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Nom et prénom :</span>
                  <span class="value">${safeNom}</span>
                </div>
                <div class="field">
                  <span class="label">Entreprise :</span>
                  <span class="value">${safeEntreprise}</span>
                </div>
                <div class="field">
                  <span class="label">Email :</span>
                  <span class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></span>
                </div>
                <div class="field">
                  <span class="label">Téléphone :</span>
                  <span class="value"><a href="tel:${safeTelephone}">${safeTelephone}</a></span>
                </div>
                ${secteur ? `
                <div class="field">
                  <span class="label">Secteur d'activité :</span>
                  <span class="value">${safeSectorText}</span>
                </div>
                ` : ''}
                ${urgence ? `
                <div class="field">
                  <span class="label">Niveau d'urgence :</span>
                  <span class="value">${safeUrgencyText}</span>
                </div>
                ` : ''}
                <div class="field">
                  <span class="label">Message :</span>
                  <div class="message-box">
                    ${safeMessage}
                  </div>
                </div>
              </div>
              <div class="footer">
                <p>Ce message a été envoyé depuis le formulaire de contact du site web.</p>
                <p>Vous pouvez répondre directement à cet email pour contacter ${safeNom}.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Nouveau contact depuis le site web - Refrig'Air Systèmes

Nom et prénom : ${nom}
Entreprise : ${entreprise}
Email : ${email}
Téléphone : ${telephone}
${secteur ? `Secteur d'activité : ${sectorText}\n` : ''}${urgence ? `Niveau d'urgence : ${urgencyText}\n` : ''}
Message :
${message}
      `.trim(),
    })

    if (error) {
      console.error("Erreur Resend complète:", JSON.stringify(error, null, 2))
      console.error("Type d'erreur:", typeof error)
      console.error("Message d'erreur:", error?.message || error)
      
      // Messages d'erreur plus spécifiques selon le type d'erreur Resend
      let errorMessage = "Erreur lors de l'envoi de l'email."
      if (error && typeof error === 'object' && 'message' in error) {
        const resendError = error as { message?: string; name?: string }
        if (resendError.message?.includes('domain') || resendError.message?.includes('Domain')) {
          errorMessage = "Le domaine email n'est pas vérifié dans Resend. Veuillez vérifier votre configuration."
        } else if (resendError.message?.includes('API key') || resendError.message?.includes('Unauthorized')) {
          errorMessage = "Clé API Resend invalide ou manquante."
        } else {
          errorMessage = resendError.message || errorMessage
        }
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? {
            resendError: error,
            fromEmail,
            toEmail,
            hasApiKey: !!apiKey
          } : undefined
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Email envoyé avec succès.",
        id: data?.id 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erreur serveur:", error)
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue"
    const errorStack = error instanceof Error ? error.stack : undefined
    
    return NextResponse.json(
      { 
        error: "Une erreur est survenue lors du traitement de votre demande.",
        details: process.env.NODE_ENV === 'development' ? {
          message: errorMessage,
          stack: errorStack
        } : undefined
      },
      { status: 500 }
    )
  }
}

