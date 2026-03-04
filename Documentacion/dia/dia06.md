# Día 6: Primera Ejecución del Proyecto

## Objetivos del Día
- Ejecutar el proyecto por primera vez
- Verificar que todos los servicios funcionen
- Acceder a la aplicación web
- Resolver problemas comunes

---

## 1. Pre-requisitos

### Verificar que todo esté instalado:
```bash
# Git
git --version

# Node.js
node --version

# Docker
docker --version

# Docker Compose
docker compose version
```

### Verificar que Docker Desktop esté corriendo:
- Busca el ícono de ballena en la barra de tareas
- Debe estar activo (no gris)

---

## 2. Preparar el Proyecto

### Navegar a la carpeta del proyecto:
```bash
cd C:\Users\SANTIAGO\Desktop\Practicas-Castelar
```

### Abrir en VS Code:
```bash
code .
```

### Verificar la estructura:
```bash
ls
```

Debes ver:
- `compose.yml`
- `src/` (carpeta)
- `package.json`
- etc.

---

## 3. Instalar Dependencias Locales (Opcional)

Aunque Docker manejará las dependencias, es útil tenerlas localmente para el editor:

```bash
# Dependencias raíz
npm install

# Dependencias del backend
cd src/backend
npm install
cd ../..
```

---

## 4. Revisar Variables de Entorno

### Verificar que no exista .env o crear uno si es necesario:
```bash
# Ver si existe
ls .env

# Si no existe y hay .env.example
cp .env.example .env
```

**Nota**: En este proyecto, las variables están definidas en `compose.yml`, así que no es estrictamente necesario.

---

## 5. Primera Ejecución con Docker Compose

### Iniciar todos los servicios:
```bash
docker compose up -d --build
```

**Desglose del comando:**
- `docker compose`: Usa Docker Compose
- `up`: Inicia los servicios
- `-d`: Modo detached (segundo plano)
- `--build`: Construye las imágenes antes de iniciar

### Qué esperar:
Verás algo como:
```
[+] Building ...
[+] Running 4/4
 ✔ Network el-puente-network      Created
 ✔ Container el-puente-db          Started
 ✔ Container el-puente-backend     Started
 ✔ Container el-puente-frontend    Started
```

**Tiempo estimado**: 2-5 minutos la primera vez (descarga de imágenes)

---

## 6. Verificar que Todo Esté Corriendo

### Ver el estado de los contenedores:
```bash
docker compose ps
```

Deberías ver algo como:
```
NAME                    STATUS          PORTS
el-puente-db           Up 2 minutes    0.0.0.0:3307->3306/tcp
el-puente-backend      Up 2 minutes    0.0.0.0:3001->3000/tcp
el-puente-frontend     Up 2 minutes    0.0.0.0:8080->80/tcp
```

**Todos deben estar en estado "Up"** ✅

---

## 7. Verificar los Logs

### Ver logs de todos los servicios:
```bash
docker compose logs
```

### Ver logs de un servicio específico:
```bash
# Base de datos
docker compose logs db

# Backend
docker compose logs backend

# Frontend
docker compose logs frontend
```

### Seguir logs en tiempo real:
```bash
docker compose logs -f backend
```

### Qué buscar en los logs:

**Backend debe mostrar:**
```
Server running on port 3000
Database connected successfully
```

**Database debe mostrar:**
```
MySQL init process done. Ready for start up.
```

---

## 8. Probar los Servicios

### Verificar cada servicio individualmente:

#### 1. Base de datos (MySQL)
```bash
# Conectar a MySQL
docker compose exec db mysql -u puente_user -ppuente_password el_puente

# Dentro de MySQL, ver las tablas
SHOW TABLES;

# Ver usuarios (si la tabla existe)
SELECT * FROM users;

# Salir
exit;
```

#### 2. Backend (API)
Abrir navegador o usar PowerShell:

```powershell
# Verificar que el servidor responda
curl http://localhost:3001

# O mejor, probar endpoint de salud (si existe)
curl http://localhost:3001/api/health
```

#### 3. Frontend (Aplicación web)
Abrir navegador y visitar:
```
http://localhost:8080
```

Deberías ver la página principal de la aplicación.

---

## 9. Explorar la Aplicación

### Páginas disponibles:

1. **Página principal**
   ```
   http://localhost:8080
   ```

2. **Login**
   ```
   http://localhost:8080/html/login.html
   ```

3. **Registro**
   ```
   http://localhost:8080/html/register.html
   ```

4. **Recuperar contraseña**
   ```
   http://localhost:8080/html/forgot.html
   ```

### Probar el registro de usuario:
1. Ir a http://localhost:8080/html/register.html
2. Llenar el formulario
3. Hacer clic en "Registrarse"
4. Verificar en la consola del navegador (F12) si hay errores

---

## 10. Verificar la Base de Datos

### Ver si el usuario se registró:
```bash
# Entrar a MySQL
docker compose exec db mysql -u puente_user -ppuente_password el_puente

# Ver usuarios registrados
SELECT * FROM users;
```

---

## 11. Comandos Útiles Durante el Desarrollo

### Reiniciar un servicio:
```bash
docker compose restart backend
```

### Ver logs en tiempo real:
```bash
docker compose logs -f
```

### Detener todos los servicios:
```bash
docker compose down
```

### Detener y eliminar volúmenes (datos):
```bash
docker compose down -v
```

### Reconstruir y reiniciar:
```bash
docker compose up -d --build
```

### Ejecutar comando en un contenedor:
```bash
# Entrar al contenedor del backend
docker compose exec backend sh

# Ver archivos
ls -la

# Salir
exit
```

---

## 12. Troubleshooting

### Problema: "Unable to get image"
**Solución**: Docker Desktop no está corriendo
```bash
# Verificar
docker ps
```
Si da error, inicia Docker Desktop y espera a que cargue.

---

### Problema: "Port already in use"
**Solución**: Cambiar el puerto en compose.yml
```yaml
ports:
  - "3002:3000"  # Cambiar 3001 por 3002
```

---

### Problema: "Backend no se conecta a la BD"
**Solución**: Revisar logs del backend
```bash
docker compose logs backend
```

Verificar que la base de datos esté "healthy":
```bash
docker compose ps
```

---

### Problema: "Cambios no se reflejan"
**Solución**: Reconstruir imágenes
```bash
docker compose up -d --build
```

---

### Problema: "Error de permisos con volúmenes"
**Solución**: Reiniciar Docker Desktop y ejecutar:
```bash
docker compose down -v
docker compose up -d --build
```

---

## 13. Detener el Proyecto

### Cuando termines de trabajar:
```bash
# Detener servicios (mantiene datos)
docker compose down

# Detener y eliminar todo (incluyendo datos)
docker compose down -v
```

---

## 14. Checklist de Verificación

### ✅ Señales de que todo funciona:

- [ ] `docker compose ps` muestra todos los servicios "Up"
- [ ] Logs del backend muestran "Server running"
- [ ] Logs de DB muestran "Ready for start up"
- [ ] http://localhost:8080 carga la página principal
- [ ] Puedes registrar un usuario
- [ ] El usuario aparece en la base de datos
- [ ] No hay errores en la consola del navegador

---

## 15. Práctica: Ciclo Completo

### Ejercicio final del día:

1. **Detener todo**
   ```bash
   docker compose down -v
   ```

2. **Iniciar desde cero**
   ```bash
   docker compose up -d --build
   ```

3. **Verificar servicios**
   ```bash
   docker compose ps
   docker compose logs -f
   ```

4. **Probar la aplicación**
   - Abrir http://localhost:8080
   - Registrar un usuario
   - Verificar en la base de datos

5. **Detener nuevamente**
   ```bash
   docker compose down
   ```

---

## ✅ Checklist del Día 6
- [ ] Proyecto ejecutado exitosamente
- [ ] Todos los servicios corriendo (db, backend, frontend)
- [ ] Aplicación accesible en http://localhost:8080
- [ ] Usuario registrado exitosamente
- [ ] Base de datos verificada
- [ ] Logs revisados sin errores críticos
- [ ] Comandos de gestión practicados

---

## 📝 Notas Importantes
- Guarda la salida de los logs si hay errores
- La primera ejecución siempre es más lenta (descarga de imágenes)
- Los datos se mantienen entre reinicios (gracias a los volúmenes)

---

## 🎯 Próximo Día
**Día 7**: Exploración del código del backend y endpoints de la API
