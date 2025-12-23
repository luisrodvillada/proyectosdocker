# proyectosdocker
22/12

Creación de imagenes optimizadas 

Añadimos Healthchecks y dependencias reales (PASO 2)
Qué hicimos

Añadimos healthchecks a:

Postgres (pg_isready)

Backend (/api/health)

Web (/)

Ajustamos depends_on para que:

El backend espere a la BD

La web espere al backend

Para qué sirve

Evitar errores al arrancar

Docker sabe cuándo algo está realmente “listo”

Stack más estable y profesional

👉 Este fue el segundo bloque.

23/12

chore(docker): stabilize multi-service stack with env-based config and healthchecks

- Restructured frontend into a single nginx container
- Added multi-stage build for backend API
- Centralized configuration using env/dev/.env
- Implemented healthchecks for PostgreSQL and backend API
- Fixed Docker DNS networking and internal-only service exposure
- Removed hardcoded secrets from docker-compose
- Cleaned up volumes, paths, and container dependencies



