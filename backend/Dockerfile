# ---------- BUILD STAGE ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copiamos solo lo necesario para instalar deps
COPY package.json package-lock.json* ./

# Instalación limpia y reproducible
RUN npm ci --only=production

# Copiamos el resto del código
COPY . .

# ---------- RUNTIME STAGE ----------
FROM node:18-alpine

WORKDIR /app

# Copiamos solo lo necesario desde el builder
COPY --from=builder /app /app

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "index.js"]

#Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:3000/api/health || exit 1
