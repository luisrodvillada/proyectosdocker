FROM node:18-alpine

WORKDIR /app

# Copiar solo package.json para aprovechar cache de Docker
COPY package.json ./

# Instalar dependencias (solo producción, no incluimos devDependencies)
RUN npm install --production

# Copiar el código de la aplicación
COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "index.js"]