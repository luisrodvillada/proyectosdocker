FROM nginx:alpine

# Eliminar config por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nuestra config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar la web real
COPY WEB1 /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

