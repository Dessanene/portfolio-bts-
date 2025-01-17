# Utiliser une version spécifique de nginx:alpine pour plus de stabilité
FROM nginx:1.24-alpine

# Copier seulement les fichiers nécessaires
COPY --chown=nginx:nginx index.html /usr/share/nginx/html/
COPY --chown=nginx:nginx css/ /usr/share/nginx/html/css/
COPY --chown=nginx:nginx js/ /usr/share/nginx/html/js/
COPY --chown=nginx:nginx images/ /usr/share/nginx/html/images/
COPY --chown=nginx:nginx assets/ /usr/share/nginx/html/assets/

# Configuration nginx optimisée
RUN echo 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    gzip on;\n\
    gzip_types text/plain text/css application/javascript;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
        add_header Cache-Control "public, max-age=3600";\n\
    }\n\
    location ~* \.(css|js)$ {\n\
        expires 7d;\n\
        add_header Cache-Control "public, no-transform";\n\
    }\n\
    location ~* \.(jpg|jpeg|png|gif|ico)$ {\n\
        expires 30d;\n\
        add_header Cache-Control "public, no-transform";\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Changer vers l'utilisateur non-root
USER nginx

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
