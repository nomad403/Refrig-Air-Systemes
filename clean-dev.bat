@echo off
echo 🧹 Nettoyage automatique Next.js...

echo ⏹️ Arrêt des processus Node.js...
taskkill /f /im node.exe 2>nul

echo 🗑️ Suppression dossier .next...
if exist ".next" (
    rmdir /s /q ".next"
    echo ✅ Dossier .next supprimé
) else (
    echo ⚠️ Dossier .next déjà absent
)

echo 🗑️ Nettoyage du cache npm...
npm cache clean --force 2>nul

echo 🔄 Démarrage du serveur de développement...
npm run dev
