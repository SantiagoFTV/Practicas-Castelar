# Día 7: Exploración del Backend - API y Endpoints

## Objetivos del Día
- Entender la estructura del backend
- Conocer los endpoints de la API
- Aprender cómo funciona la autenticación
- Probar endpoints con herramientas

---

## 1. Instalar Herramientas para Probar APIs

### Opción 1: Thunder Client (Extensión de VS Code)
1. Abrir VS Code
2. Ir a Extensiones (Ctrl+Shift+X)
3. Buscar "Thunder Client"
4. Instalar

### Opción 2: Postman
1. Descargar de: https://www.postman.com/downloads/
2. Instalar y crear cuenta (opcional)

### Opción 3: cURL (Ya disponible en PowerShell)
No requiere instalación adicional.

---

## 2. Estructura del Backend

```
src/backend/
│
├── index.js              # Punto de entrada, configuración de Express
├── package.json          # Dependencias
│
├── config/
│   └── db.js            # Configuración de la base de datos
│
├── models/
│   └── users.sql        # Esquema de la base de datos
│
├── routes/
│   ├── auth.js          # Rutas de autenticación
│   └── profile.js       # Rutas de perfil
│
├── scripts/
│   └── seedUsers.js     # Script para poblar usuarios
│
└── uploads/             # Archivos subidos por usuarios
```

---

## 3. Análisis de index.js

Abre el archivo:
```bash
code src/backend/index.js
```

### Componentes principales:

#### Importaciones
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
```

#### Middlewares
```javascript
app.use(cors());              // Permite peticiones desde otros orígenes
app.use(express.json());      // Parsea JSON en el body
app.use(express.urlencoded({ extended: true }));  // Parsea form data
```

#### Rutas montadas
```javascript
app.use('/api/auth', authRoutes);       // /api/auth/...
app.use('/api/profile', profileRoutes); // /api/profile/...
```

#### Servidor
```javascript
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 4. Rutas de Autenticación (auth.js)

Abre:
```bash
code src/backend/routes/auth.js
```

### Endpoints disponibles:

#### 1. POST /api/auth/register
**Propósito**: Registrar un nuevo usuario

**Body esperado**:
```json
{
  "username": "usuario_test",
  "email": "test@ejemplo.com",
  "password": "password123",
  "nombre": "Test",
  "apellido": "Usuario"
}
```

**Respuesta exitosa**:
```json
{
  "message": "Usuario registrado exitosamente"
}
```

#### 2. POST /api/auth/login
**Propósito**: Iniciar sesión

**Body esperado**:
```json
{
  "username": "usuario_test",
  "password": "password123"
}
```

**Respuesta exitosa**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "usuario_test",
    "email": "test@ejemplo.com"
  }
}
```

### Conceptos importantes:

**bcryptjs**: Encripta las contraseñas
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```

**jsonwebtoken (JWT)**: Genera tokens de autenticación
```javascript
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
```

---

## 5. Rutas de Perfil (profile.js)

Abre:
```bash
code src/backend/routes/profile.js
```

### Endpoints disponibles:

#### 1. GET /api/profile/:username
**Propósito**: Obtener datos del perfil de usuario

**Headers requeridos**:
```
Authorization: Bearer TOKEN_AQUI
```

**Respuesta**:
```json
{
  "id": 1,
  "username": "usuario_test",
  "email": "test@ejemplo.com",
  "nombre": "Test",
  "apellido": "Usuario",
  "foto_perfil": null
}
```

#### 2. PUT /api/profile/:username
**Propósito**: Actualizar perfil de usuario

**Headers**:
```
Authorization: Bearer TOKEN_AQUI
```

**Body**:
```json
{
  "email": "nuevo@email.com",
  "nombre": "Nuevo Nombre"
}
```

#### 3. POST /api/profile/upload
**Propósito**: Subir archivos (foto de perfil, etc.)

**Tipo**: multipart/form-data

**Campo**: `file`

---

## 6. Configuración de la Base de Datos (db.js)

Abre:
```bash
code src/backend/config/db.js
```

### Análisis:

```javascript
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'el_puente',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

**Connection Pool**: Mantiene múltiples conexiones reutilizables
- Más eficiente que crear una conexión por cada petición
- `connectionLimit: 10`: Máximo 10 conexiones simultáneas

---

## 7. Probar los Endpoints

### Asegúrate de que el proyecto esté corriendo:
```bash
docker compose up -d
```

### Probar con cURL (PowerShell)

#### Registrar un usuario:
```powershell
$body = @{
    username = "test_user"
    email = "test@test.com"
    password = "password123"
    nombre = "Test"
    apellido = "User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/auth/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

#### Iniciar sesión:
```powershell
$body = @{
    username = "test_user"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body

# Guardar el token
$token = $response.token
echo $token
```

#### Obtener perfil (con autenticación):
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/profile/test_user" `
    -Method Get `
    -Headers @{
        "Authorization" = "Bearer $token"
    }
```

---

## 8. Probar con Thunder Client (VS Code)

### 1. Abrir Thunder Client
- Icono de rayo en la barra lateral de VS Code

### 2. Nueva Request - Registro
- Method: **POST**
- URL: `http://localhost:3001/api/auth/register`
- Body → JSON:
```json
{
  "username": "thunder_user",
  "email": "thunder@test.com",
  "password": "password123",
  "nombre": "Thunder",
  "apellido": "Client"
}
```
- Click en **Send**

### 3. Nueva Request - Login
- Method: **POST**
- URL: `http://localhost:3001/api/auth/login`
- Body → JSON:
```json
{
  "username": "thunder_user",
  "password": "password123"
}
```
- Click en **Send**
- **Copiar el token** de la respuesta

### 4. Nueva Request - Perfil
- Method: **GET**
- URL: `http://localhost:3001/api/profile/thunder_user`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer TOKEN_COPIADO_AQUI`
- Click en **Send**

---

## 9. Entender JWT (JSON Web Token)

### ¿Qué es un JWT?
Un string codificado que contiene información del usuario.

### Estructura:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.xyz123
  ↑ Header          ↑ Payload          ↑ Signature
```

### Decodificar un JWT:
Ir a https://jwt.io y pegar el token para ver su contenido.

### Cómo se usa:
1. Usuario hace login → Recibe token
2. Usuario guarda el token (localStorage, cookie, etc.)
3. Cada petición posterior incluye el token en el header
4. Backend verifica el token y permite/deniega acceso

---

## 10. Middleware de Autenticación

Busca en el código del proyecto un middleware como:
```javascript
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.userId = decoded.id;
    next();
  });
};
```

Este middleware:
1. Extrae el token del header
2. Verifica que sea válido
3. Extrae el ID del usuario
4. Permite continuar (next())

---

## 11. Gestión de Errores

Observa cómo se manejan los errores en las rutas:

```javascript
try {
  // Código que puede fallar
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
}
```

### Códigos de estado HTTP comunes:
- **200**: OK
- **201**: Creado
- **400**: Bad Request (datos inválidos)
- **401**: No autenticado
- **403**: No autorizado
- **404**: No encontrado
- **500**: Error del servidor

---

## 12. Práctica: Crear un Endpoint Nuevo

### Ejercicio: Agregar endpoint para obtener todos los usuarios

En `src/backend/routes/auth.js`, agrega:

```javascript
// GET /api/auth/users - Obtener todos los usuarios (admin)
router.get('/users', async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, username, email, nombre, apellido FROM users'
    );
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});
```

### Probar el nuevo endpoint:
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/auth/users" -Method Get
```

---

## 13. Ver Queries SQL en Acción

Agrega logs temporales para ver las queries:

```javascript
const query = 'SELECT * FROM users WHERE username = ?';
console.log('Ejecutando query:', query);
const [rows] = await pool.query(query, [username]);
console.log('Resultados:', rows);
```

---

## ✅ Checklist del Día 7
- [ ] Estructura del backend comprendida
- [ ] Archivo index.js revisado
- [ ] Endpoints de auth.js identificados
- [ ] Endpoints de profile.js identificados
- [ ] Thunder Client o Postman instalado
- [ ] Endpoint de registro probado
- [ ] Endpoint de login probado
- [ ] Token JWT obtenido y decodificado
- [ ] Endpoint de perfil probado con autenticación
- [ ] Concepto de middleware entendido

---

## 📝 Notas Importantes
- Nunca compartas tu JWT_SECRET en producción
- Las contraseñas siempre deben hashearse, nunca guardarse en texto plano
- Los tokens JWT tienen expiración (configurable)

---

## 🎯 Próximo Día
**Día 8**: Exploración del frontend - JavaScript y comunicación con el backend
