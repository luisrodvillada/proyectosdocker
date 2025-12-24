# Proyecto Docker – Stack Web Profesional con Acceso Seguro

Este proyecto consiste en un stack Dockerizado completo orientado a entornos reales de empresa, con foco en estabilidad, seguridad y buenas prácticas.

## 🧱 Arquitectura del proyecto

- Frontend servido con **Nginx**
- Backend (API) en **Node.js**
- Base de datos **PostgreSQL**
- Orquestación con **Docker Compose**
- HTTPS habilitado
- Acceso remoto seguro mediante **VPN (Tailscale)**



---

## 🔐 Seguridad y acceso remoto

El host se encuentra **detrás de CG-NAT**, por lo que:

- ❌ No se exponen puertos públicos
- ❌ No se usa port forwarding
- ✅ Se utiliza **Tailscale** (VPN overlay basada en WireGuard)

Gracias a esto:
- El acceso es privado y cifrado
- Solo los dispositivos autorizados pueden acceder
- Se puede acceder desde fuera de la red local (4G, otra WiFi, etc.)

---

## 🌐 Acceso a la aplicación

Una vez conectado a la VPN de Tailscale, la web es accesible mediante:


El acceso funciona tanto desde PC como desde móvil.

---

## 🐳 Docker y orquestación

El stack se gestiona mediante `docker compose` y está preparado para:

- Arranque ordenado de servicios
- Separación de entornos (dev / prod)
- Persistencia de datos
- Healthchecks básicos

Ejemplo de arranque:

```bash
docker compose up -d

Docker / Docker Compose

Nginx

Node.js

PostgreSQL

HTTPS

Tailscale (WireGuard)
