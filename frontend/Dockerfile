FROM nginx:alpine

# Copiar archivos al servidor web
COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Sobrescribir la configuración por defecto de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
