# Proyecto El Puente - Backend

## Descripción
Backend para la aplicación El Puente. Permite registro, login y gestión de usuarios. Funciona con usuarios en memoria para pruebas rápidas, y puede conectarse a MySQL si se desea usar base de datos real.

## Tecnologías
- Node.js + Express
- MySQL (opcional)
- Autenticación JWT (simulada)
- Variables de entorno en `.env`

## Instalación
1. Ve a la carpeta `src/backend`.
2. Instala dependencias:
   ```bash
   npm install express cors dotenv mysql2 bcryptjs jsonwebtoken
   ```
3. (Opcional) Configura el archivo `.env` si quieres usar MySQL.
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

## Usuarios de prueba
Puedes iniciar sesión con:
- **Correo:** demo@demo.com  
  **Contraseña:** demo123
- **Correo:** prueba@correo.com  
  **Contraseña:** prueba123

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
Para pruebas rápidas, no necesitas MySQL. Si quieres usar la base de datos real, activa MySQL y configura el backend.

---
¿Dudas o problemas? Consulta instalacion.md o pide ayuda.
