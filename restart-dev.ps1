# Script PowerShell pour redémarrage propre et robuste
Write-Host "🔄 Redémarrage propre du serveur Next.js..." -ForegroundColor Cyan

# 1. Arrêt des processus Node.js
Write-Host "1. Arrêt des processus Node.js..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# 2. Nettoyage des caches
Write-Host "2. Nettoyage des caches..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# 3. Vérification des ports
Write-Host "3. Vérification des ports..." -ForegroundColor Yellow
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port3000) {
    Write-Host "⚠ Port 3000 encore utilisé, nettoyage..." -ForegroundColor Red
    Stop-Process -Id $port3000.OwningProcess -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 3
}

# 4. Démarrage propre
Write-Host "4. Démarrage du serveur..." -ForegroundColor Green
npm run dev
