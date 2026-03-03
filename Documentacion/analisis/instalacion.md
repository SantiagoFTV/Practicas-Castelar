# Guía de instalación y prueba del proyecto

## Requisitos previos
- Docker Desktop
- Docker Compose
- Navegador web

## Ejecución con Docker Compose

1. Abre una terminal en la raíz del proyecto.
2. Inicia los servicios:
   ```bash
   docker compose up -d --build
   ```
3. Verifica estado:
   ```bash
   docker compose ps
   ```

## Instalación del frontend

1. El frontend corre en el contenedor Nginx.
2. Accede desde el navegador:
   - [http://localhost:8080](http://localhost:8080)

## Flujo de prueba

1. Regístrate desde la pantalla de registro.
2. Inicia sesión con tu nuevo usuario.
3. Entra a la vista de perfil en conflicto.
4. Sube imagen, activa o desactiva pixelado, y guarda.
5. Verifica el perfil en la sección “Perfiles guardados”.

## Puertos actuales

- Frontend: `8080`
- Backend API: `3001`
- MySQL: `3307`

## Notas
- Registro y login usan MySQL real (`users`).
- Perfiles de conflicto usan tabla `conflict_profiles`.
- Si cambias modelos SQL, recrea contenedores y volumen de DB:
  ```bash
  docker compose down -v
  docker compose up -d --build
  ```

---

¿Necesitas ayuda con algún paso? ¡Avísame!
