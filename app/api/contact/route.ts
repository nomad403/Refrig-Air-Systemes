import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Initialiser Resend avec la clé API depuis les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
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

    // Envoyer l'email avec Resend
    // Note: Utilisez votre domaine vérifié dans Resend pour remplacer "onboarding@resend.dev"
    // Une fois le domaine ras-energies.com vérifié, changez pour: "Refrig'Air Systèmes <contact@ras-energies.com>"
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Refrig'Air Systèmes <onboarding@resend.dev>",
      to: ["rasenergies@gmail.com"],
      replyTo: email,
      subject: `Nouveau contact depuis le site web - ${entreprise}`,
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
                  <span class="value">${nom}</span>
                </div>
                <div class="field">
                  <span class="label">Entreprise :</span>
                  <span class="value">${entreprise}</span>
                </div>
                <div class="field">
                  <span class="label">Email :</span>
                  <span class="value"><a href="mailto:${email}">${email}</a></span>
                </div>
                <div class="field">
                  <span class="label">Téléphone :</span>
                  <span class="value"><a href="tel:${telephone}">${telephone}</a></span>
                </div>
                ${secteur ? `
                <div class="field">
                  <span class="label">Secteur d'activité :</span>
                  <span class="value">${sectorText}</span>
                </div>
                ` : ''}
                ${urgence ? `
                <div class="field">
                  <span class="label">Niveau d'urgence :</span>
                  <span class="value">${urgencyText}</span>
                </div>
                ` : ''}
                <div class="field">
                  <span class="label">Message :</span>
                  <div class="message-box">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
              </div>
              <div class="footer">
                <p>Ce message a été envoyé depuis le formulaire de contact du site web.</p>
                <p>Vous pouvez répondre directement à cet email pour contacter ${nom}.</p>
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
      console.error("Erreur Resend:", error)
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email." },
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
    return NextResponse.json(
      { error: "Une erreur est survenue lors du traitement de votre demande." },
      { status: 500 }
    )
  }
}

