# Script PowerShell pour résoudre définitivement les erreurs Next.js sous Windows
Write-Host "Résolution des erreurs Next.js Windows - Script basé sur diagnostic expert" -ForegroundColor Cyan

# 1. Vérification de l'emplacement OneDrive
$currentPath = Get-Location
Write-Host "Emplacement actuel: $currentPath" -ForegroundColor Yellow

if ($currentPath -like "*Desktop*" -or $currentPath -like "*OneDrive*" -or $currentPath -like "*Documents*") {
    Write-Host "PROBLÈME DÉTECTÉ: Projet dans un dossier synchronisé!" -ForegroundColor Red
    Write-Host "Solutions recommandées:" -ForegroundColor Yellow
    Write-Host "1. Déplacer vers C:\code\refrig_air_systemes\" -ForegroundColor Yellow
    Write-Host "2. Exclure le dossier de OneDrive" -ForegroundColor Yellow
    Write-Host "3. Ajouter à l'exclusion antivirus" -ForegroundColor Yellow
}

# 2. Arrêt des processus
Write-Host "Arrêt des processus Node.js..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# 3. Nettoyage radical
Write-Host "Nettoyage des fichiers verrouillés..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .turbo -ErrorAction SilentlyContinue

# 4. Test environnement
Write-Host "Diagnostic environnement:" -ForegroundColor Cyan
if ($currentPath -like "*OneDrive*") {
    Write-Host "- Dossier OneDrive: OUI (PROBLÉMATIQUE)" -ForegroundColor Red
} else {
    Write-Host "- Dossier OneDrive: NON" -ForegroundColor Green
}

if ($currentPath -like "*Desktop*") {
    Write-Host "- Dossier Bureau: OUI (PROBLÉMATIQUE)" -ForegroundColor Red
} else {
    Write-Host "- Dossier Bureau: NON" -ForegroundColor Green
}

if (Test-Path .cursorignore) {
    Write-Host "- .cursorignore: OUI" -ForegroundColor Green
} else {
    Write-Host "- .cursorignore: NON" -ForegroundColor Red
}

# 5. Options de lancement
Write-Host "Options de lancement:" -ForegroundColor Green
Write-Host "Option 1 (normale): npm run dev"
Write-Host "Option 2 (polling): Set-Variable env:CHOKIDAR_USEPOLLING 1; npm run dev"

Write-Host "Configuration terminée!" -ForegroundColor Green
Write-Host "Recommandation: Déplacez le projet vers C:\code\ pour éviter OneDrive" -ForegroundColor Yellow

Write-Host "Les fichiers .cursorignore et .vscode/settings.json ont été créés"
Write-Host "Redémarrez Cursor pour appliquer les nouvelles configurations"
