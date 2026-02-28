# Proyecto El Puente

## Guía de Instalación

### Requisitos
- Node.js y npm
- MySQL
- Editor de código (VS Code recomendado)

### Instalación Backend
1. Ve a la carpeta `src/backend`.
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Crea la base de datos y ejecuta el script `models.sql` en tu gestor (MySQL o PostgreSQL).
4. Crea un archivo `.env` con tus datos de conexión:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=elpuente
   ```
5. Inicia el servidor:
   ```sh
   npm start
   ```

### Instalación Frontend
1. Ve a la carpeta `src/frontend`.
2. No requiere instalación de dependencias (HTML, CSS, JS puros).
3. Abre los archivos HTML desde la carpeta `src/frontend/html` en tu navegador.

## Estructura del Proyecto
- `src/backend`: Código del servidor, base de datos y autenticación.
- `src/frontend/html`: Archivos HTML para las vistas.
- `src/frontend/js`: Archivos JavaScript para la lógica de frontend.
- `src/frontend/styles.css`: Estilos personalizados.

## ¿Cómo enseñar a alguien a desarrollar este proyecto?

1. **Explica la estructura**: Muestra cómo están organizados los archivos y carpetas.
2. **Backend**:
   - Enseña cómo funciona Express y la conexión a la base de datos.
   - Explica los endpoints principales (`/api/auth/register`, `/api/auth/login`).
   - Muestra cómo se usan variables de entorno y cómo proteger credenciales.
3. **Frontend**:
   - Explica cómo los formularios HTML interactúan con el backend usando JS.
   - Muestra cómo se organiza el JS en archivos separados por funcionalidad.
   - Enseña cómo modificar estilos y vistas.
4. **Desarrollo colaborativo**:
   - Usa Git para control de versiones.
   - Divide tareas por carpetas (backend/frontend).
   - Haz revisiones de código y pruebas.
5. **Pruebas y depuración**:
   - Usa la consola del navegador para depurar JS.
   - Usa Postman o Insomnia para probar la API.
   - Revisa los logs del servidor para errores.

## Consejos
- Mantén el código ordenado y documentado.
- Haz commits frecuentes y claros.
- Pregunta y comparte dudas en equipo.

---

¿Dudas? Puedes agregar más detalles en los README de cada carpeta para guiar a nuevos desarrolladores.