# ── Dockerfile ──────────────────────────────────────────────────────────────
# Sert le site statique (HTML/CSS/JS) via Nginx dans une image légère (alpine).
# Aucune étape de "build" n'est nécessaire ici puisque le site est déjà
# du HTML/CSS/JS pur (pas de framework à compiler).

FROM nginx:1.27-alpine

# Supprime la config par défaut de Nginx et la remplace par la nôtre
# (gzip, cache des assets, page 404, etc.)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie tout le contenu du site dans le dossier servi par Nginx.
# Le .dockerignore évite de copier les fichiers inutiles (voir plus bas).
COPY . /usr/share/nginx/html

EXPOSE 80

# Nginx tourne déjà en foreground par défaut dans cette image, pas besoin
# de CMD custom, mais on le rend explicite pour la lisibilité :
CMD ["nginx", "-g", "daemon off;"]