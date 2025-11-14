# Guide SEO - Refrig'Air Systèmes

## 📋 Fichiers SEO configurés

### ✅ Sitemap
- **URL**: `https://www.ras-energies.com/sitemap.xml`
- **Fichier**: `app/sitemap.ts`
- **Pages incluses**:
  - Accueil (priorité 1.0, fréquence: weekly)
  - Expertises (priorité 0.9, fréquence: monthly)
  - Maintenances & Services (priorité 0.9, fréquence: monthly)
  - Qualités & Certifications (priorité 0.8, fréquence: monthly)
  - Contact (priorité 0.8, fréquence: monthly)

### ✅ Robots.txt
- **URL**: `https://www.ras-energies.com/robots.txt`
- **Fichier**: `app/robots.ts`
- **Configuration**:
  - Autorise tous les crawlers sur les pages publiques
  - Bloque `/api/`, `/_next/`, `/admin/`, `/private/`
  - Référence le sitemap

### ✅ Structured Data (JSON-LD)
- **Page d'accueil**: `LocalBusiness` avec services, horaires, zone de service
- **Layout global**: `Organization`, `WebSite`, `Person` (développeur)
- **Pages expertises**: Structured data pour services HVAC

## 🚀 Actions à effectuer dans Google Search Console

### 1. Ajouter la propriété
1. Aller sur [Google Search Console](https://search.google.com/search-console)
2. Ajouter la propriété: `https://www.ras-energies.com`
3. Vérifier la propriété (méthode recommandée: balise HTML dans `<head>`)

### 2. Soumettre le sitemap
1. Dans GSC, aller dans **Sitemaps**
2. Ajouter: `https://www.ras-energies.com/sitemap.xml`
3. Vérifier qu'il est accepté (peut prendre quelques heures)

### 3. Vérifier l'indexation
1. Utiliser l'outil **Inspection d'URL** pour vérifier chaque page:
   - `https://www.ras-energies.com/`
   - `https://www.ras-energies.com/expertises`
   - `https://www.ras-energies.com/maintenances-services`
   - `https://www.ras-energies.com/qualites-certification`
   - `https://www.ras-energies.com/contact`
2. Demander l'indexation pour chaque page

### 4. Vérifier les données structurées
1. Aller dans **Améliorations** > **Données structurées**
2. Vérifier qu'il n'y a pas d'erreurs
3. Tester avec [Google Rich Results Test](https://search.google.com/test/rich-results)

## 📊 Métadonnées SEO par page

### Page d'accueil
- **Title**: "Climatisation & Froid industriel à Paris | Refrig'Air Systèmes"
- **Description**: Optimisée avec mots-clés locaux (Paris, Île-de-France) et services
- **Keywords**: 20+ mots-clés ciblés
- **Structured Data**: `LocalBusiness` complet

### Expertises
- **Title**: "Expertises HVAC - Climatisation & Froid industriel | Paris"
- **Keywords**: Expertise, data centers, laboratoires, agroalimentaire

### Maintenances & Services
- **Title**: "Maintenance HVAC & Services 24/7 | Paris - SLA ≤ 4h"
- **Keywords**: Maintenance, 24/7, SLA, optimisation énergétique

### Qualités & Certifications
- **Title**: "Qualités & Certifications HVAC | C2E, RGE, HACCP, Qualifelec"
- **Keywords**: Certifications, RGE, C2E, HACCP, Qualifelec

### Contact
- **Title**: "Contact & Devis Gratuit | Climatisation & Froid industriel Paris"
- **Keywords**: Devis, contact, audit technique

## 🎯 Mots-clés ciblés (prioritaires)

### Climatisation
- climatisation Paris
- climatisation de précision
- installation climatisation Île-de-France
- climatisation data center
- climatisation laboratoire

### Froid industriel
- froid industriel Paris
- froid commercial Paris
- vitrine réfrigérée
- meuble froid
- très basse température

### Maintenance
- maintenance climatisation Paris
- maintenance HVAC 24/7
- SLA 4h
- maintenance préventive
- réparation climatisation Paris

### Certifications
- certification RGE
- certification C2E
- conformité HACCP
- Qualifelec

## 📝 À compléter manuellement

### Dans `app/page.tsx`
- Remplacer `"+33-1-XX-XX-XX-XX"` par le vrai numéro de téléphone
- Ajuster les coordonnées GPS si nécessaire (latitude/longitude)
- Vérifier les horaires d'ouverture

### Dans `app/layout.tsx`
- Vérifier l'adresse complète dans le structured data
- Ajouter les réseaux sociaux dans `sameAs` si disponibles

## 🔍 Outils de vérification

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/
3. **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
4. **PageSpeed Insights**: https://pagespeed.web.dev/
5. **Screaming Frog SEO Spider**: Pour audit complet

## 📈 Prochaines étapes recommandées

1. ✅ Sitemap configuré
2. ✅ Robots.txt configuré
3. ✅ Structured data ajouté
4. ✅ Métadonnées optimisées
5. ⏳ Soumettre à Google Search Console
6. ⏳ Soumettre à Bing Webmaster Tools
7. ⏳ Créer un compte Google Business Profile
8. ⏳ Obtenir des backlinks de qualité
9. ⏳ Créer du contenu régulier (blog/articles)
10. ⏳ Optimiser les images (alt text, compression)

## 🎨 Optimisations techniques déjà en place

- ✅ URLs canoniques sur toutes les pages
- ✅ Open Graph pour réseaux sociaux
- ✅ Twitter Cards
- ✅ Structured Data JSON-LD
- ✅ Sitemap XML dynamique
- ✅ Robots.txt optimisé
- ✅ Métadonnées complètes par page
- ✅ Mots-clés ciblés par page
- ✅ Descriptions optimisées (150-160 caractères)

