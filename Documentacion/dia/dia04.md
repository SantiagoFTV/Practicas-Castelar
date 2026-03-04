# Día 4: Clonar el Proyecto y Entender su Estructura

## Objetivos del Día
- Clonar el repositorio del proyecto
- Entender la estructura de carpetas
- Revisar los archivos de configuración principales

---

## 1. Clonar el Proyecto

### Si el proyecto está en GitHub/GitLab
```bash
# Navegar a tu carpeta de proyectos
cd C:\Users\TU_USUARIO\Desktop\Proyectos

# Clonar el repositorio (reemplazar con la URL real)
git clone URL_DEL_REPOSITORIO

# Entrar a la carpeta del proyecto
cd Practicas-Castelar
```

### Si ya tienes una copia local
Simplemente navega a la carpeta del proyecto:
```bash
cd C:\Users\SANTIAGO\Desktop\Practicas-Castelar
```

### Abrir el proyecto en VS Code
```bash
code .
```

---

## 2. Estructura del Proyecto

```
Practicas-Castelar/
│
├── compose.yml              # Configuración de Docker Compose
├── package.json             # Dependencias raíz del proyecto
├── README.md               # Documentación principal
├── DOCKER.md               # Documentación de Docker
│
├── Documentacion/          # Carpeta de documentación
│   ├── analisis/
│   ├── sprints/
│   └── dia/                # Guías de instalación (esta carpeta)
│
├── src/                    # Código fuente
│   ├── backend/            # API del servidor
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── index.js        # Punto de entrada del backend
│   │   ├── config/         # Configuración de base de datos
│   │   ├── models/         # Modelos y esquemas SQL
│   │   ├── routes/         # Rutas de la API
│   │   └── scripts/        # Scripts de inicialización
│   │
│   └── frontend/           # Interfaz de usuario
│       ├── Dockerfile
│       ├── nginx.conf      # Configuración del servidor web
│       ├── html/           # Páginas HTML
│       ├── css/            # Estilos
│       └── js/             # JavaScript del frontend
│
└── Presentaciones/         # Material de presentaciones
```

---

## 3. Archivos Clave del Proyecto

### 3.1 compose.yml
Archivo principal que define todos los servicios del proyecto.

```yaml
services:
  db:                        # Base de datos MySQL
  backend:                   # Servidor Node.js/Express
  frontend:                  # Servidor web Nginx
```

**Lee este archivo** para entender cómo se conectan los servicios.

### 3.2 package.json (raíz)
Dependencias comunes del proyecto.

### 3.3 src/backend/package.json
Dependencias del servidor:
- **express**: Framework web
- **mysql2**: Cliente de MySQL
- **bcryptjs**: Encriptación de contraseñas
- **jsonwebtoken**: Autenticación JWT
- **cors**: Permitir peticiones cross-origin
- **multer**: Subida de archivos

### 3.4 src/backend/index.js
Archivo principal del servidor backend. Revísalo para entender:
- Configuración de Express
- Rutas disponibles
- Middlewares utilizados

---

## 4. Exploración del Backend

### Abrir y revisar estos archivos:

#### 📄 src/backend/config/db.js
```bash
code src/backend/config/db.js
```
- Configuración de conexión a MySQL
- Variables de entorno utilizadas

#### 📄 src/backend/routes/auth.js
```bash
code src/backend/routes/auth.js
```
- Rutas de autenticación (login, register)
- Endpoints disponibles

#### 📄 src/backend/routes/profile.js
```bash
code src/backend/routes/profile.js
```
- Rutas de perfil de usuario
- Manejo de archivos

#### 📄 src/backend/models/users.sql
```bash
code src/backend/models/users.sql
```
- Esquema de la base de datos
- Tablas y campos

---

## 5. Exploración del Frontend

### Páginas HTML disponibles:

1. **index.html** - Página principal
2. **login.html** - Inicio de sesión
3. **register.html** - Registro de usuarios
4. **forgot.html** - Recuperar contraseña
5. **puente.html** - Página interna de la aplicación

### Archivos JavaScript:

- **main.js** - Funciones comunes
- **login.js** - Lógica de login
- **register.js** - Lógica de registro
- **profile.js** - Gestión de perfil
- **index-scripts.js** - Scripts de la página principal
- **puente-scripts.js** - Scripts de la aplicación

---

## 6. Revisar Variables de Entorno

### Archivo .env.example
El proyecto puede tener un archivo `.env.example` que muestra las variables necesarias.

### Crear tu archivo .env
```bash
# En la raíz del proyecto
code .env
```

Contenido típico:
```env
# Base de datos
DB_HOST=db
DB_PORT=3306
DB_USER=puente_user
DB_PASSWORD=puente_password
DB_NAME=el_puente

# Backend
PORT=3000

# JWT
JWT_SECRET=tu_clave_secreta_aqui
```

**Nota**: El archivo `.env` no se sube a Git y es personal para cada desarrollador.

---

## 7. Entender los Dockerfiles

### Backend Dockerfile
```bash
code src/backend/Dockerfile
```

Este archivo define:
- Imagen base de Node.js
- Instalación de dependencias
- Comando para iniciar el servidor

### Frontend Dockerfile
```bash
code src/frontend/Dockerfile
```

Este archivo define:
- Imagen base de Nginx
- Copia de archivos estáticos
- Configuración del servidor web

---

## 8. Práctica: Exploración Guiada

### Tarea 1: Contar las rutas del backend
Abre `src/backend/routes/auth.js` y cuenta cuántos endpoints hay:
- POST /register
- POST /login
- ¿Hay más?

### Tarea 2: Identificar las páginas
Lista las páginas HTML y describe su propósito basándote en sus nombres.

### Tarea 3: Ver la estructura de la BD
Abre `src/backend/models/users.sql` y anota:
- Nombre de la tabla
- Campos principales
- Tipos de datos

---

## 9. Comandos Útiles para Explorar

```bash
# Ver la estructura del proyecto
tree /F

# Buscar todos los archivos JavaScript
ls -R *.js

# Ver el tamaño del proyecto
du -sh .

# Contar líneas de código (ejemplo)
(Get-ChildItem -Recurse -Include *.js,*.html,*.css | Get-Content | Measure-Object -Line).Lines
```

---

## ✅ Checklist del Día 4
- [ ] Proyecto clonado o localizado
- [ ] Proyecto abierto en VS Code
- [ ] Estructura de carpetas comprendida
- [ ] Archivo compose.yml revisado
- [ ] Backend explorado (index.js, routes, config)
- [ ] Frontend explorado (html, js, css)
- [ ] Dockerfiles revisados
- [ ] Variables de entorno identificadas

---

## 📝 Notas Importantes
- No es necesario entender todo el código aún
- Familiarízate con dónde está cada cosa
- Anota dudas para investigar después

---

## 🎯 Próximo Día
**Día 5**: Entender Docker Compose y los servicios del proyecto
