FROM nginx:alpine

# Reemplaza la configuración por defecto y copia la nuestra
RUN rm /etc/nginx/conf.d/default.conf
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copia la web estática (la carpeta WEB1 debe estar en el mismo directorio proyecto1/)
COPY ./WEB1 /usr/share/nginx/html

EXPOSE 9090

CMD ["nginx", "-g", "daemon off;"]