@echo off
echo === Script de déploiement du Portfolio BTS ===
echo Ce script va configurer et déployer votre portfolio dans un conteneur Docker

REM Vérifier si Docker est installé
docker --version > nul 2>&1
if %errorlevel% neq 0 (
    echo Docker n'est pas installé. Veuillez l'installer depuis https://www.docker.com/products/docker-desktop
    echo Une fois Docker installé, relancez ce script.
    pause
    exit
)

echo Docker est installé.

REM Construire et démarrer le conteneur
echo Construction et démarrage du conteneur...
docker-compose up -d --build

echo === Déploiement terminé ===
echo Votre portfolio est maintenant accessible à l'adresse: http://localhost
echo Pour accéder au dashboard, ouvrez: http://localhost/dashboard.html

start http://localhost/dashboard.html

pause
