# Script PowerShell pour nettoyage automatique Next.js
Write-Host "🧹 Nettoyage automatique Next.js..." -ForegroundColor Cyan

# Arrêt des processus Node.js
Write-Host "⏹️ Arrêt des processus Node.js..." -ForegroundColor Yellow
try {
    Get-Process "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Processus Node.js arrêtés" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Aucun processus Node.js à arrêter" -ForegroundColor Yellow
}

# Suppression du dossier .next
Write-Host "🗑️ Suppression dossier .next..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    Write-Host "✅ Dossier .next supprimé" -ForegroundColor Green
} else {
    Write-Host "⚠️ Dossier .next déjà absent" -ForegroundColor Yellow
}

# Nettoyage cache
Write-Host "🗑️ Nettoyage du cache..." -ForegroundColor Yellow
npm cache clean --force 2>$null

# Attendre un peu
Start-Sleep -Seconds 2

# Démarrage du serveur
Write-Host "🔄 Démarrage du serveur de développement..." -ForegroundColor Cyan
npm run dev
