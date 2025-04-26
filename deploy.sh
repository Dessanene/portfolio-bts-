#!/bin/bash

# Script de déploiement pour le portfolio BTS
echo "=== Script de déploiement du Portfolio BTS ==="
echo "Ce script va configurer et déployer votre portfolio dans un conteneur Docker"

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "Docker n'est pas installé. Installation..."
    # Installation de Docker selon la plateforme
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        if [ "$ID" == "ubuntu" ] || [ "$ID" == "debian" ]; then
            sudo apt-get update
            sudo apt-get install -y docker.io docker-compose
        elif [ "$ID" == "centos" ] || [ "$ID" == "fedora" ]; then
            sudo yum install -y docker docker-compose
        fi
    else
        echo "Système d'exploitation non pris en charge. Veuillez installer Docker manuellement."
        exit 1
    fi
    
    # Démarrer Docker
    sudo systemctl start docker
    sudo systemctl enable docker
fi

echo "Docker est installé."

# Construire et démarrer le conteneur
echo "Construction et démarrage du conteneur..."
docker-compose up -d --build

echo "=== Déploiement terminé ==="
echo "Votre portfolio est maintenant accessible à l'adresse: http://localhost"
echo "Pour accéder au dashboard, ouvrez: http://localhost/dashboard.html"
