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
