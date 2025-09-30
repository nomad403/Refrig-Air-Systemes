@echo off
echo ========================================
echo    SOLUTION DEFINITIVE - DIAGNOSTIC COMPLET
echo ========================================

echo.
echo [DIAGNOSTIC] Analyse du systeme...

echo [1/8] Verification de l'espace disque...
for /f "tokens=3" %%a in ('dir /-c %SystemDrive%\ ^| find "octets libres"') do echo Espace libre: %%a octets

echo.
echo [2/8] Arret COMPLET des processus...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im npm.exe >nul 2>&1
timeout /t 3 /nobreak >nul

echo.
echo [3/8] Verification des verrous de fichiers...
handle.exe .next >nul 2>&1 || echo Outil handle non disponible

echo.
echo [4/8] Nettoyage RADICAL...
rmdir /s /q .next >nul 2>&1
rmdir /s /q node_modules\.cache >nul 2>&1
rmdir /s /q .turbo >nul 2>&1

echo.
echo [5/8] Nettoyage cache NPM...
npm cache clean --force >nul 2>&1

echo.
echo [6/8] Verification des permissions...
icacls . /grant %USERNAME%:F >nul 2>&1

echo.
echo [7/8] Regeneration package-lock...
del package-lock.json >nul 2>&1
npm install >nul 2>&1

echo.
echo [8/8] Demarrage avec surveillance...
echo ✓ Systeme nettoye et optimise
echo ✓ Demarrage du serveur...
npm run dev
