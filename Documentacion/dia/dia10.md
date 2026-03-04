# Día 10: Modificaciones, Debugging y Despliegue

## Objetivos del Día
- Hacer modificaciones al proyecto
- Aprender técnicas de debugging
- Entender el ciclo de desarrollo completo
- Preparar el proyecto para producción

---

## 1. Hacer una Modificación Completa (Feature)

### Ejemplo: Agregar campo "teléfono" al perfil de usuario

#### Paso 1: Modificar la Base de Datos

```sql
-- Conectar a MySQL
docker compose exec db mysql -u puente_user -ppuente_password el_puente

-- Agregar columna
ALTER TABLE users ADD COLUMN telefono VARCHAR(20) AFTER apellido;

-- Verificar
DESCRIBE users;

-- Salir
EXIT;
```

#### Paso 2: Modificar el Backend

**Editar `src/backend/routes/profile.js`:**

```javascript
// En la ruta PUT /profile/:username
router.put('/:username', verifyToken, async (req, res) => {
    const { nombre, apellido, email, telefono } = req.body; // Agregar telefono
    
    const query = `
        UPDATE users 
        SET nombre = ?, apellido = ?, email = ?, telefono = ?
        WHERE username = ?
    `;
    
    await pool.query(query, [nombre, apellido, email, telefono, username]);
    // ...
});
```

#### Paso 3: Modificar el Frontend HTML

**Editar `src/frontend/html/puente.html` (o donde esté el perfil):**

```html
<div class="form-group">
    <label for="telefono">Teléfono:</label>
    <input type="tel" id="telefono" name="telefono" placeholder="1234567890">
</div>
```

#### Paso 4: Modificar el Frontend JavaScript

**Editar `src/frontend/js/profile.js`:**

```javascript
// Al cargar el perfil
async function loadProfile() {
    // ...
    document.getElementById('telefono').value = data.telefono || '';
}

// Al actualizar el perfil
async function updateProfile() {
    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value // Agregar
    };
    // ...
}
```

#### Paso 5: Probar la Modificación

```bash
# Reconstruir y reiniciar
docker compose down
docker compose up -d --build

# Verificar logs
docker compose logs -f backend
```

---

## 2. Debugging del Backend

### Técnica 1: Console.log estratégico

```javascript
router.post('/login', async (req, res) => {
    console.log('📥 Login request body:', req.body);
    
    const { username, password } = req.body;
    console.log('🔍 Buscando usuario:', username);
    
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    console.log('📊 Usuarios encontrados:', users.length);
    
    if (users.length === 0) {
        console.log('❌ Usuario no encontrado');
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    console.log('✅ Usuario encontrado, verificando contraseña');
    // ...
});
```

### Técnica 2: Usar debugger de Node.js

**Modificar `src/backend/package.json`:**

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "node --inspect=0.0.0.0:9229 index.js"
  }
}
```

**Modificar `compose.yml`:**

```yaml
backend:
  # ...
  ports:
    - "3001:3000"
    - "9229:9229"  # Puerto para debugger
  command: npm run dev
```

**En VS Code:**
1. Crear `.vscode/launch.json`
2. Agregar configuración para attach a Docker
3. Poner breakpoints en el código
4. Iniciar debugging (F5)

### Técnica 3: Logs estructurados

```javascript
const log = {
    info: (msg, data) => console.log(`ℹ️ [INFO] ${msg}`, data || ''),
    error: (msg, err) => console.error(`❌ [ERROR] ${msg}`, err),
    warn: (msg, data) => console.warn(`⚠️ [WARN] ${msg}`, data || ''),
    debug: (msg, data) => console.log(`🐛 [DEBUG] ${msg}`, data || '')
};

// Uso
log.info('Usuario autenticado', { userId: user.id });
log.error('Error al conectar BD', error);
```

---

## 3. Debugging del Frontend

### Técnica 1: Console.log en pasos clave

```javascript
async function loginUser(credentials) {
    console.log('1️⃣ Credenciales a enviar:', credentials);
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        console.log('2️⃣ Response status:', response.status);
        
        const data = await response.json();
        console.log('3️⃣ Response data:', data);
        
        if (response.ok) {
            console.log('4️⃣ Login exitoso, guardando token');
            saveToken(data.token);
            console.log('5️⃣ Token guardado, redirigiendo');
            window.location.href = '/html/puente.html';
        }
    } catch (error) {
        console.error('❌ Error en loginUser:', error);
    }
}
```

### Técnica 2: DevTools del Navegador

**Network Tab:**
1. Abrir DevTools (F12)
2. Tab "Network"
3. Filtrar por "XHR" o "Fetch"
4. Hacer la acción que llama a la API
5. Inspeccionar:
   - Request headers
   - Request payload
   - Response
   - Timing

**Console Tab:**
```javascript
// Ejecutar código en tiempo real
localStorage.getItem('token')
JSON.parse(localStorage.getItem('user'))

// Modificar datos temporalmente
localStorage.setItem('testKey', 'testValue')

// Ver todas las variables globales
console.log(window)
```

**Application Tab:**
- Ver LocalStorage
- Ver Cookies
- Ver Session Storage
- Limpiar storage

### Técnica 3: Breakpoints en el navegador

1. Abrir DevTools → Sources
2. Buscar tu archivo JS
3. Click en el número de línea para agregar breakpoint
4. Ejecutar la acción
5. Inspeccionar variables en ese momento

---

## 4. Manejo de Errores Robusto

### Backend: Middleware de errores

```javascript
// Middleware para capturar errores
app.use((err, req, res, next) => {
    console.error('💥 Error no manejado:', err);
    
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Uso con async/await
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/users', asyncHandler(async (req, res) => {
    const [users] = await pool.query('SELECT * FROM users');
    res.json(users);
}));
```

### Frontend: Manejo global de errores

```javascript
// Global error handler
window.addEventListener('error', (event) => {
    console.error('Error global:', event.error);
    alert('Ocurrió un error inesperado. Por favor, recarga la página.');
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rechazada:', event.reason);
    alert('Error de conexión. Verifica tu red.');
});

// Función helper para fetch con manejo de errores
async function safeFetch(url, options = {}) {
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en fetch:', error);
        throw error;
    }
}
```

---

## 5. Variables de Entorno y Configuración

### Crear archivo .env para desarrollo local

```bash
# .env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3307
DB_USER=puente_user
DB_PASSWORD=puente_password
DB_NAME=el_puente
JWT_SECRET=mi_secreto_super_seguro
PORT=3000
```

### Configuración del backend

```javascript
import dotenv from 'dotenv';
dotenv.config();

const config = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '24h'
    },
    server: {
        port: process.env.PORT || 3000
    },
    isDevelopment: process.env.NODE_ENV === 'development'
};

export default config;
```

---

## 6. Testing Manual

### Crear un archivo de pruebas manuales

**`tests.md`:**

```markdown
# Test Checklist

## Autenticación
- [ ] Registrar usuario nuevo
- [ ] Intentar registrar usuario duplicado (debe fallar)
- [ ] Login con credenciales correctas
- [ ] Login con credenciales incorrectas (debe fallar)
- [ ] Acceder a página protegida sin token (debe redirigir)
- [ ] Acceder con token válido (debe funcionar)

## Perfil
- [ ] Ver perfil propio
- [ ] Actualizar nombre
- [ ] Actualizar email
- [ ] Subir foto de perfil
- [ ] Actualizar teléfono

## Edge Cases
- [ ] Campos vacíos en formularios
- [ ] Emails inválidos
- [ ] Contraseñas muy cortas
- [ ] Caracteres especiales en username
- [ ] Archivos muy grandes
- [ ] Network offline (modo avión)
```

---

## 7. Optimización de Rendimiento

### Backend: Conexión a BD

```javascript
// Usar connection pooling (ya lo hace mysql2)
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: 10,  // Máximo 10 conexiones
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});
```

### Frontend: Optimizar peticiones

```javascript
// Cachear respuestas
const cache = new Map();

async function fetchWithCache(url, ttl = 60000) {
    const cached = cache.get(url);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
        console.log('📦 Usando caché para:', url);
        return cached.data;
    }
    
    const data = await safeFetch(url);
    cache.set(url, { data, timestamp: Date.now() });
    
    return data;
}
```

---

## 8. Preparar para Producción

### Checklist de Seguridad

```markdown
- [ ] Cambiar todos los passwords por defecto
- [ ] Usar JWT_SECRET fuerte y único
- [ ] Configurar CORS correctamente (no usar *)
- [ ] Hashear todas las contraseñas
- [ ] Sanitizar inputs del usuario
- [ ] Usar HTTPS (no HTTP)
- [ ] Configurar rate limiting
- [ ] No exponer stack traces en producción
- [ ] Validar y sanitizar archivos subidos
- [ ] Configurar headers de seguridad
```

### Configuración de producción

**compose.prod.yml:**

```yaml
services:
  backend:
    environment:
      NODE_ENV: production
      DB_HOST: db_production
      JWT_SECRET: ${JWT_SECRET_PROD}  # Variable de entorno del servidor
    restart: always
    
  db:
    volumes:
      - mysql_prod_data:/var/lib/mysql
    restart: always
    
  frontend:
    restart: always
```

---

## 9. Documentación del Proyecto

### Actualizar README.md

```markdown
# Proyecto El Puente

## Instalación

### Requisitos
- Docker Desktop
- Node.js 18+
- Git

### Pasos
1. Clonar repositorio
   ```bash
   git clone URL_DEL_REPO
   cd Practicas-Castelar
   ```

2. Iniciar servicios
   ```bash
   docker compose up -d --build
   ```

3. Acceder a la aplicación
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3001

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Perfil
- `GET /api/profile/:username` - Obtener perfil
- `PUT /api/profile/:username` - Actualizar perfil
- `POST /api/profile/upload` - Subir archivo

## Estructura del Proyecto
[Ver diagrama de estructura]

## Troubleshooting
[Ver problemas comunes y soluciones]
```

---

## 10. Comandos Útiles de Producción

### Ver recursos utilizados:
```bash
docker stats
```

### Ver logs con timestamp:
```bash
docker compose logs -f --timestamps backend
```

### Limpiar sistema Docker:
```bash
# Eliminar contenedores detenidos
docker container prune

# Eliminar imágenes sin usar
docker image prune

# Limpiar todo (cuidado)
docker system prune -a
```

### Backup automático de BD:
```bash
# Script de backup
docker compose exec db mysqldump -u puente_user -ppuente_password el_puente > backup_$(date +%Y%m%d_%H%M%S).sql
```

---

## ✅ Checklist Final del Día 10
- [ ] Modificación completa implementada (campo teléfono)
- [ ] Técnicas de debugging practicadas
- [ ] Console.logs estratégicos implementados
- [ ] DevTools del navegador dominadas
- [ ] Manejo de errores mejorado
- [ ] Variables de entorno configuradas
- [ ] Testing manual realizado
- [ ] Optimizaciones aplicadas
- [ ] Checklist de seguridad revisado
- [ ] Documentación actualizada

---

## ✅ Checklist de Todo el Programa (10 Días)
- [ ] Día 1: Git y VS Code instalados
- [ ] Día 2: Node.js y npm configurados
- [ ] Día 3: Docker Desktop funcionando
- [ ] Día 4: Proyecto clonado y explorado
- [ ] Día 5: Docker Compose comprendido
- [ ] Día 6: Proyecto ejecutado exitosamente
- [ ] Día 7: Backend y API entendidos
- [ ] Día 8: Frontend y JavaScript dominados
- [ ] Día 9: MySQL y consultas practicadas
- [ ] Día 10: Modificaciones y debugging aplicados

---

## 🎓 Próximos Pasos

### Aprendizaje Continuo
1. **Testing Automatizado**
   - Jest para backend
   - Cypress para frontend

2. **DevOps**
   - CI/CD con GitHub Actions
   - Deployment a servicios cloud

3. **Seguridad Avanzada**
   - OAuth 2.0
   - Rate limiting
   - OWASP Top 10

4. **Escalabilidad**
   - Load balancing
   - Microservicios
   - Redis para caché

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [Express.js](https://expressjs.com/)
- [MySQL](https://dev.mysql.com/doc/)
- [Docker](https://docs.docker.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Tutoriales Recomendados
- FreeCodeCamp
- The Odin Project
- Full Stack Open

---

## 🎉 ¡Felicidades!

Has completado el programa de instalación y configuración de 10 días.
Ahora tienes las habilidades para:
- Configurar un entorno de desarrollo completo
- Trabajar con Docker y contenedores
- Desarrollar aplicaciones full-stack
- Debugear y resolver problemas
- Implementar nuevas features

**¡Sigue aprendiendo y construyendo!** 🚀
