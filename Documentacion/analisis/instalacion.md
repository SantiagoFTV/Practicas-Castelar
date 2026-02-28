# Guía de instalación y prueba del proyecto

## Requisitos previos
- Node.js (v18 o superior)
- npm
- Navegador web

## Instalación del backend

1. Abre una terminal y navega a la carpeta `src/backend`.
2. Instala las dependencias necesarias:
   ```bash
   npm install express cors dotenv mysql2 bcryptjs jsonwebtoken
   ```
3. (Opcional) Si quieres usar la base de datos real, instala y activa MySQL (puedes usar XAMPP) y configura el archivo `.env` con tus datos de conexión.
4. Para pruebas rápidas, el login y registro funcionan con usuarios en memoria (archivo `models/tempUsers.js`). No necesitas activar MySQL ni configurar la base de datos para probar el login.
5. Inicia el servidor backend:
   ```bash
   npm start
   ```
   Verás en la terminal:
   ```
   Servidor backend escuchando en puerto 3000
   Accede a: http://localhost:3000/html/login.html
   ```

## Instalación del frontend

1. El frontend se sirve automáticamente desde el backend. No necesitas instalar nada extra.
2. Accede en tu navegador a la URL que aparece en la terminal del backend, por ejemplo:
   - [http://localhost:3000/html/login.html](http://localhost:3000/html/login.html)

## Usuarios de prueba

Puedes iniciar sesión con estos usuarios:
- **Correo:** demo@demo.com  
  **Contraseña:** demo123
- **Correo:** prueba@correo.com  
  **Contraseña:** prueba123

## Flujo de prueba

1. Accede a la URL del login.
2. Inicia sesión con uno de los usuarios de prueba.
3. Serás redirigido al menú principal (`index.html`).
4. Desde el menú puedes navegar a los diferentes apartados.

## Notas
- Si quieres agregar más usuarios, edita el archivo `src/backend/models/tempUsers.js`.
- Si quieres usar la base de datos real, activa MySQL y configura el backend.
- Si tienes problemas de conexión, asegúrate de que el backend esté corriendo y accede al frontend desde el puerto 3000.

---

¿Necesitas ayuda con algún paso? ¡Avísame!
