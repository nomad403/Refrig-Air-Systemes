# Configuration Resend pour le formulaire de contact

## 📧 Configuration de l'envoi d'emails

Le formulaire de contact utilise **Resend** pour envoyer les emails à `rasenergies@gmail.com`.

### Étapes de configuration

1. **Créer un compte Resend**
   - Allez sur [https://resend.com](https://resend.com)
   - Créez un compte gratuit (3000 emails/mois gratuits)

2. **Obtenir votre clé API**
   - Connectez-vous à votre compte Resend
   - Allez dans **Settings** > **API Keys**
   - Cliquez sur **Create API Key**
   - Donnez un nom (ex: "RAS Energies Website")
   - Copiez la clé API (commence par `re_`)

3. **Configurer le domaine d'envoi (optionnel mais recommandé)**
   - Dans Resend, allez dans **Domains**
   - Ajoutez votre domaine `ras-energies.com`
   - Suivez les instructions pour vérifier le domaine (ajout de records DNS)
   - Une fois vérifié, vous pourrez utiliser `contact@ras-energies.com` comme adresse d'envoi

4. **Ajouter la clé API dans votre projet**
   - Créez un fichier `.env.local` à la racine du projet
   - Ajoutez la ligne suivante :
   ```
   RESEND_API_KEY=re_votre_cle_api_ici
   ```

5. **Pour Vercel (production)**
   - Allez dans votre projet Vercel
   - **Settings** > **Environment Variables**
   - Ajoutez `RESEND_API_KEY` avec votre clé API
   - Sélectionnez tous les environnements (Production, Preview, Development)

### ⚠️ Note importante : Vérification du domaine

**Si vous obtenez une erreur 500 lors de l'envoi du formulaire**, c'est probablement parce que le domaine `ras-energies.com` n'est pas encore vérifié dans Resend.

**Solution temporaire :**
1. Dans Vercel, modifiez la variable d'environnement `RESEND_FROM` :
   - Remplacez `contact@ras-energies.com` par `onboarding@resend.dev`
   - Ou utilisez : `Refrig'Air Systèmes <onboarding@resend.dev>`
2. Redéployez votre application sur Vercel

**Solution permanente (recommandée) :**
1. Connectez-vous à votre compte Resend
2. Allez dans **Domains** > **Add Domain**
3. Entrez `ras-energies.com`
4. Ajoutez les records DNS demandés dans votre hébergeur de domaine
5. Attendez la vérification (quelques minutes)
6. Une fois vérifié, utilisez `contact@ras-energies.com` dans `RESEND_FROM`

### Test

Pour tester le formulaire :
1. Remplissez le formulaire de contact sur le site
2. Vérifiez que l'email arrive bien à `rasenergies@gmail.com`
3. Vérifiez les logs dans la console Resend pour voir les détails d'envoi

### Support

- Documentation Resend : [https://resend.com/docs](https://resend.com/docs)
- Support Resend : support@resend.com





