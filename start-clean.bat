@echo off
echo ========================================
echo    DEMARRAGE PROPRE - Refrig'Air Systemes
echo ========================================

echo.
echo [1/4] Arret des processus Node.js...
taskkill /f /im node.exe >nul 2>&1
echo ✓ Processus Node.js arretes

echo.
echo [2/4] Nettoyage du cache Next.js...
if exist .next rmdir /s /q .next >nul 2>&1
echo ✓ Cache Next.js supprime

echo.
echo [3/4] Nettoyage du cache Node modules...
if exist node_modules\.cache rmdir /s /q node_modules\.cache >nul 2>&1
echo ✓ Cache Node modules supprime

echo.
echo [4/4] Demarrage du serveur de developpement...
echo ✓ Lancement en cours...
echo.
npm run dev
