# Proyecto El Puente

Aplicación web con autenticación y módulo de “persona en conflicto”, compuesta por:
- Frontend estático servido por Nginx
- Backend Node.js + Express
- Base de datos MySQL

## Ejecución rápida (Docker)

### Requisitos
- Docker Desktop
- Docker Compose

### Levantar el proyecto
1. Desde la raíz del repo ejecuta:
   ```sh
   docker compose up -d --build
   ```
2. Verifica el estado:
   ```sh
   docker compose ps
   ```

### Accesos
- Frontend: http://localhost:8080
- Backend API: http://localhost:3001
- MySQL: localhost:3307

## Funcionalidades actuales
- Registro e inicio de sesión persistente en MySQL
- Perfil de persona en conflicto:
  - Subida de imagen
  - Comentarios positivos
  - Opción de pixelado al visualizar
  - Listado de perfiles guardados por usuario

## Comandos útiles
- Ver logs:
  ```sh
  docker compose logs -f
  ```
- Reiniciar limpio (incluye base de datos):
  ```sh
  docker compose down -v
  docker compose up -d --build
  ```

## Estructura
- `src/backend`: API, rutas y conexión a base de datos
- `src/frontend`: HTML/CSS/JS del cliente
- `docker-compose.yml`: orquestación de servicios

## Documentación adicional
- `Documentacion/analisis/instalacion.md`
- `src/backend/README.md`
- `src/frontend/README.md`