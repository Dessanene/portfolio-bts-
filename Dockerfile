FROM nginx:alpine

# Copier les fichiers de configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh

# Rendre le script d'entrée exécutable
RUN chmod +x /docker-entrypoint.sh

# Copier les fichiers du portfolio dans le répertoire de nginx
COPY . /usr/share/nginx/html

# Supprimer les fichiers de configuration du répertoire html
RUN rm -f /usr/share/nginx/html/nginx.conf /usr/share/nginx/html/docker-entrypoint.sh /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/docker-compose.yml /usr/share/nginx/html/.dockerignore

# Exposer le port 80
EXPOSE 80

# Utiliser notre script d'entrée
ENTRYPOINT ["/docker-entrypoint.sh"]

# Commande pour démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
