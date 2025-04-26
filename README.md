# Portfolio BTS

Ce portfolio présente mon parcours, mes compétences, mes expériences professionnelles ainsi que ma veille technologique et les travaux réalisés pour l'épreuve E4 du BTS SIO.

Déployé sur GitHub Pages : https://dessanene.github.io/portfolio-bts-/

## Déploiement en conteneur

Ce portfolio peut être facilement déployé dans un conteneur Docker, ce qui permet une installation rapide et cohérente sur n'importe quelle plateforme.

### Prérequis

- [Docker](https://www.docker.com/products/docker-desktop) installé sur votre machine
- [Docker Compose](https://docs.docker.com/compose/install/) (inclus avec Docker Desktop sur Windows et Mac)

### Installation rapide

1. Clonez ce dépôt :
   ```
   git clone https://github.com/Dessanene/portfolio-bts-.git
   cd portfolio-bts-
   ```

2. Exécutez le script de déploiement :
   - Sur Windows : double-cliquez sur `deploy.bat` ou exécutez-le dans PowerShell
   - Sur Linux/Mac : `chmod +x deploy.sh && ./deploy.sh`

3. Accédez au portfolio à l'adresse : http://localhost
4. Accédez au dashboard à l'adresse : http://localhost/dashboard.html

### Installation manuelle

Si vous préférez une installation manuelle :

```bash
# Construire et démarrer le conteneur
docker-compose up -d --build
```

### Déploiement sur des plateformes cloud

Ce portfolio est compatible avec la plupart des plateformes de conteneurs cloud comme :
- Heroku
- DigitalOcean App Platform
- Google Cloud Run
- AWS Elastic Container Service
- Azure Container Instances

## Structure du projet

- `index.html` - Page d'accueil
- `profil.html` - Présentation de mon profil
- `competences.html` - Mes compétences techniques
- `stages.html` - Mes expériences de stage
- `veille.html` - Ma veille technologique
- `epreuve-e4.html` - Travaux pour l'épreuve E4
- `dashboard.html` - Interface d'administration
- `Dockerfile` et `docker-compose.yml` - Configuration Docker
- `nginx.conf` - Configuration du serveur web

## Technologies utilisées

- HTML5 / CSS3
- JavaScript
- Docker
- Nginx
