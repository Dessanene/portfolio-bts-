#!/bin/sh
set -e

# Initialisation du serveur
echo "Initialisation du serveur pour le Portfolio BTS..."

# Vérification des fichiers essentiels
if [ ! -f "/usr/share/nginx/html/index.html" ]; then
    echo "ERREUR: index.html non trouvé!"
    exit 1
fi

# Configuration des logs
mkdir -p /var/log/portfolio
touch /var/log/portfolio/access.log
touch /var/log/portfolio/error.log

# Message de démarrage
echo "Portfolio BTS démarré avec succès!"
echo "Accessible à l'adresse: http://localhost:80"
echo "Dashboard accessible à l'adresse: http://localhost:80/dashboard.html"

# Exécuter nginx
exec "$@"
