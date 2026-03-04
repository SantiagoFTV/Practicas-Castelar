# Día 8: Exploración del Frontend - JavaScript y API

## Objetivos del Día
- Entender la estructura del frontend
- Analizar el código JavaScript
- Ver cómo se comunican frontend y backend
- Entender el flujo de autenticación en el cliente

---

## 1. Estructura del Frontend

```
src/frontend/
│
├── html/                    # Páginas HTML
│   ├── index.html          # Página principal
│   ├── login.html          # Inicio de sesión
│   ├── register.html       # Registro
│   ├── forgot.html         # Recuperar contraseña
│   └── puente.html         # App principal (después de login)
│
├── css/
│   └── styles.css          # Estilos de la aplicación
│
├── js/                      # Lógica JavaScript
│   ├── main.js             # Funciones compartidas
│   ├── login.js            # Lógica de login
│   ├── register.js         # Lógica de registro
│   ├── profile.js          # Gestión de perfil
│   ├── index-scripts.js    # Scripts de index.html
│   └── puente-scripts.js   # Scripts de puente.html
│
├── Dockerfile              # Configuración del contenedor
└── nginx.conf              # Configuración del servidor web
```

---

## 2. Análisis de las Páginas HTML

### Abrir las páginas principales:

```bash
code src/frontend/html/index.html
code src/frontend/html/login.html
code src/frontend/html/register.html
```

### Patrón común en todas las páginas:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <!-- Contenido de la página -->
    
    <script src="../js/main.js"></script>
    <script src="../js/nombre-especifico.js"></script>
</body>
</html>
```

---

## 3. Archivo main.js - Funciones Compartidas

Abre:
```bash
code src/frontend/js/main.js
```

### Funciones típicas en main.js:

#### 1. Configuración de la API
```javascript
const API_URL = 'http://localhost:3001/api';
```

#### 2. Gestión de tokens
```javascript
// Guardar token
function saveToken(token) {
    localStorage.setItem('token', token);
}

// Obtener token
function getToken() {
    return localStorage.getItem('token');
}

// Eliminar token (logout)
function removeToken() {
    localStorage.removeItem('token');
}
```

#### 3. Verificar autenticación
```javascript
function isAuthenticated() {
    return !!getToken();
}

function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/html/login.html';
    }
}
```

#### 4. Función para hacer peticiones
```javascript
async function fetchAPI(endpoint, options = {}) {
    const token = getToken();
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
}
```

---

## 4. register.js - Lógica de Registro

Abre:
```bash
code src/frontend/js/register.js
```

### Flujo típico de registro:

```javascript
// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitar envío tradicional del formulario
        
        // Obtener datos del formulario
        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value
        };
        
        try {
            // Hacer petición a la API
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Registro exitoso
                alert('Usuario registrado exitosamente');
                window.location.href = '/html/login.html';
            } else {
                // Error del servidor
                alert(data.error || 'Error al registrar');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        }
    });
});
```

---

## 5. login.js - Lógica de Login

Abre:
```bash
code src/frontend/js/login.js
```

### Flujo típico de login:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const credentials = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Guardar token
                saveToken(data.token);
                
                // Guardar datos del usuario
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirigir a la app
                window.location.href = '/html/puente.html';
            } else {
                alert(data.error || 'Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        }
    });
});
```

---

## 6. profile.js - Gestión de Perfil

Abre:
```bash
code src/frontend/js/profile.js
```

### Funciones típicas:

#### Cargar datos del perfil:
```javascript
async function loadProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
        const data = await fetchAPI(`/profile/${user.username}`);
        
        // Mostrar datos en la página
        document.getElementById('username').textContent = data.username;
        document.getElementById('email').textContent = data.email;
        document.getElementById('nombre').textContent = data.nombre;
        
        if (data.foto_perfil) {
            document.getElementById('profilePic').src = data.foto_perfil;
        }
    } catch (error) {
        console.error('Error al cargar perfil:', error);
    }
}
```

#### Actualizar perfil:
```javascript
async function updateProfile(formData) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
        const data = await fetchAPI(`/profile/${user.username}`, {
            method: 'PUT',
            body: JSON.stringify(formData)
        });
        
        alert('Perfil actualizado');
        loadProfile(); // Recargar datos
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar');
    }
}
```

#### Subir foto de perfil:
```javascript
async function uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch(`${API_URL}/profile/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            body: formData // No establecer Content-Type para FormData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Foto subida exitosamente');
            loadProfile();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

---

## 7. LocalStorage - Almacenamiento del Navegador

### ¿Qué es LocalStorage?
Almacenamiento persistente en el navegador del usuario.

### Operaciones básicas:

```javascript
// Guardar
localStorage.setItem('clave', 'valor');

// Guardar objeto (convertir a JSON)
localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test' }));

// Obtener
const valor = localStorage.getItem('clave');

// Obtener objeto (parsear JSON)
const user = JSON.parse(localStorage.getItem('user'));

// Eliminar
localStorage.removeItem('clave');

// Limpiar todo
localStorage.clear();
```

### Ver localStorage en el navegador:
1. Abrir DevTools (F12)
2. Tab "Application" o "Almacenamiento"
3. Buscar "Local Storage"
4. Expandir http://localhost:8080

---

## 8. Fetch API - Hacer Peticiones HTTP

### GET Request:
```javascript
const response = await fetch('http://localhost:3001/api/auth/users');
const data = await response.json();
console.log(data);
```

### POST Request:
```javascript
const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'test',
        password: 'pass123'
    })
});

const data = await response.json();
```

### Con autenticación:
```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:3001/api/profile/test', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
```

---

## 9. Práctica: Debugging en el Navegador

### Abrir DevTools (F12)

#### Console:
- Ver `console.log()` outputs
- Ejecutar JavaScript en tiempo real
- Ver errores

#### Network:
- Ver todas las peticiones HTTP
- Inspeccionar headers y respuestas
- Ver tiempos de carga

#### Application:
- Ver localStorage
- Ver cookies
- Ver caché

### Ejercicio práctico:

1. Abrir http://localhost:8080/html/register.html
2. Abrir DevTools (F12)
3. Ir a tab "Network"
4. Registrar un usuario
5. Observar la petición POST
6. Click en la petición
7. Ver:
   - **Headers**: Método, URL, headers enviados
   - **Payload**: Datos enviados
   - **Response**: Respuesta del servidor

---

## 10. Manejo de Errores en el Frontend

### Try-Catch:
```javascript
try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error || 'Error desconocido');
    }
    
    // Usar data
} catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error: ' + error.message);
}
```

### Validación de formularios:
```javascript
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateForm() {
    const email = document.getElementById('email').value;
    
    if (!validateEmail(email)) {
        alert('Email inválido');
        return false;
    }
    
    return true;
}
```

---

## 11. Flujo Completo: Registro → Login → Perfil

### Diagrama del flujo:

```
1. Usuario visita register.html
   ↓
2. Llena formulario y hace submit
   ↓
3. JavaScript envía POST a /api/auth/register
   ↓
4. Backend guarda usuario en BD
   ↓
5. Redirige a login.html
   ↓
6. Usuario ingresa credenciales
   ↓
7. JavaScript envía POST a /api/auth/login
   ↓
8. Backend valida y devuelve token
   ↓
9. JavaScript guarda token en localStorage
   ↓
10. Redirige a puente.html
   ↓
11. JavaScript carga datos del perfil con el token
```

---

## 12. Práctica: Agregar Validación al Registro

Modificar `register.js` para agregar validación:

```javascript
function validatePassword(password) {
    if (password.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/[A-Z]/.test(password)) {
        return 'La contraseña debe contener al menos una mayúscula';
    }
    if (!/[0-9]/.test(password)) {
        return 'La contraseña debe contener al menos un número';
    }
    return null;
}

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const error = validatePassword(password);
    
    if (error) {
        alert(error);
        return;
    }
    
    // Continuar con el registro...
});
```

---

## 13. CORS - Cross-Origin Resource Sharing

### ¿Por qué es necesario?
El frontend (puerto 8080) hace peticiones al backend (puerto 3001).
  
Por seguridad, los navegadores bloquean esto a menos que el backend lo permita.

### Configuración en el backend:
```javascript
import cors from 'cors';

app.use(cors());  // Permite todos los orígenes
```

O más seguro:
```javascript
app.use(cors({
    origin: 'http://localhost:8080',  // Solo este origen
    credentials: true
}));
```

---

## ✅ Checklist del Día 8
- [ ] Estructura del frontend comprendida
- [ ] Archivo main.js revisado
- [ ] Lógica de registro entendida (register.js)
- [ ] Lógica de login entendida (login.js)
- [ ] Gestión de perfil revisada (profile.js)
- [ ] LocalStorage y su uso comprendido
- [ ] Fetch API practicada
- [ ] DevTools del navegador exploradas
- [ ] Flujo completo de autenticación entendido
- [ ] Validación de formularios implementada

---

## 📝 Notas Importantes
- LocalStorage no es seguro para datos sensibles (usar solo el token)
- Los tokens pueden expirar (implementar refresh tokens en producción)
- Siempre validar datos en el frontend Y en el backend

---

## 🎯 Próximo Día
**Día 9**: Base de datos MySQL - Consultas y gestión avanzada
