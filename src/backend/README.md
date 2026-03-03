# Proyecto El Puente - Backend

## Descripción
Backend para la aplicación El Puente. Permite registro/login persistente en MySQL y gestión de perfiles de persona en conflicto con imagen y opción de pixelado.

## Tecnologías
- Node.js + Express
- MySQL
- Multer (subida de archivos)
- Variables de entorno en `.env`

## Instalación
1. Ve a la carpeta `src/backend`.
2. Instala dependencias:
   ```bash
  npm install
   ```
3. Configura el archivo `.env` con conexión a MySQL.
4. Inicia el servidor:
   ```bash
   npm start
   ```
   Verás en la terminal:
   ```
   Servidor backend escuchando en puerto 3000
   Accede a: http://localhost:3000/html/login.html
   ```

## Endpoints principales
- `POST /api/auth/register` — Registro de usuario
- `POST /api/auth/login` — Login de usuario (devuelve token)
- `POST /api/profile` — Crea perfil en conflicto con imagen
- `GET /api/profile/mine` — Lista perfiles del usuario autenticado
- `GET /api/profile/image/:filename` — Sirve imagen subida

## Autenticación
- El token devuelto en login se envía como `Authorization: Bearer <token>`.
- Registro y login consultan tabla `users` en MySQL.

## Scripts
- `npm install` — Instala dependencias
- `npm start` — Inicia el servidor

## Carpeta scripts
Coloca aquí utilidades para:
- Inicializar o poblar la base de datos
- Migraciones
- Backups
- Pruebas automáticas

## Base de datos
El backend usa MySQL como fuente principal de datos:
- `users` para autenticación
- `conflict_profiles` para perfiles en conflicto

---
¿Dudas o problemas? Consulta instalacion.md o pide ayuda.
