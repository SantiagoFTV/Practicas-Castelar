# Día 5: Docker Compose y Servicios del Proyecto

## Objetivos del Día
- Entender Docker Compose en profundidad
- Analizar el archivo compose.yml del proyecto
- Comprender cómo se comunican los servicios
- Entender los volúmenes y redes

---

## 1. ¿Qué es Docker Compose?

Docker Compose permite:
- **Definir** múltiples contenedores en un solo archivo
- **Orquestar** la ejecución de servicios relacionados
- **Gestionar** redes y volúmenes entre contenedores
- **Simplificar** el desarrollo con un solo comando

---

## 2. Anatomía de compose.yml

Abre el archivo `compose.yml` en VS Code:
```bash
code compose.yml
```

### Estructura básica:
```yaml
services:          # Lista de contenedores
  servicio1:
    # configuración
  servicio2:
    # configuración

volumes:           # Almacenamiento persistente
  volumen1:

networks:          # Redes para comunicación
  red1:
```

---

## 3. Servicio 1: Base de Datos (MySQL)

```yaml
db:
  image: mysql:8.0
  container_name: el-puente-db
  environment:
    MYSQL_ROOT_PASSWORD: root
    MYSQL_DATABASE: el_puente
    MYSQL_USER: puente_user
    MYSQL_PASSWORD: puente_password
  ports:
    - "3307:3306"
  volumes:
    - mysql_data:/var/lib/mysql
    - ./src/backend/models/users.sql:/docker-entrypoint-initdb.d/init.sql
  networks:
    - el-puente-network
  healthcheck:
    test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
    timeout: 20s
    retries: 10
```

### Desglose línea por línea:

**image: mysql:8.0**
- Usa la imagen oficial de MySQL versión 8.0

**container_name: el-puente-db**
- Nombre del contenedor (más fácil de identificar)

**environment:**
- Variables de entorno para configurar MySQL
- `MYSQL_ROOT_PASSWORD`: Contraseña del usuario root
- `MYSQL_DATABASE`: Base de datos que se creará automáticamente
- `MYSQL_USER` y `MYSQL_PASSWORD`: Usuario y contraseña para la aplicación

**ports: "3307:3306"**
- Mapeo de puertos: `PUERTO_HOST:PUERTO_CONTENEDOR`
- MySQL corre en el puerto 3306 dentro del contenedor
- Se accede desde el puerto 3307 en tu máquina local
- ¿Por qué 3307? Para evitar conflictos si ya tienes MySQL instalado

**volumes:**
- `mysql_data:/var/lib/mysql`: Persistencia de datos de la BD
- `./src/backend/models/users.sql:/docker-entrypoint-initdb.d/init.sql`: Script de inicialización

**networks:**
- Conecta este contenedor a la red `el-puente-network`

**healthcheck:**
- Verifica que MySQL esté listo antes de iniciar otros servicios
- Usa `mysqladmin ping` para chequear
- Reintenta hasta 10 veces con timeout de 20s

---

## 4. Servicio 2: Backend (Node.js)

```yaml
backend:
  build:
    context: ./src/backend
    dockerfile: Dockerfile
  container_name: el-puente-backend
  environment:
    DB_HOST: db
    DB_PORT: 3306
    DB_USER: puente_user
    DB_PASSWORD: puente_password
    DB_NAME: el_puente
    PORT: 3000
  ports:
    - "3001:3000"
  depends_on:
    db:
      condition: service_healthy
  networks:
    - el-puente-network
  volumes:
    - ./src/backend:/app
    - /app/node_modules
```

### Desglose:

**build:**
- En lugar de usar una imagen pre-construida, construye una imagen personalizada
- `context`: Carpeta donde está el Dockerfile
- `dockerfile`: Nombre del archivo (Dockerfile)

**environment:**
- Variables de entorno para conectar a la base de datos
- **DB_HOST: db** ← Nota que usa el nombre del servicio, no "localhost"

**ports: "3001:3000"**
- El backend corre en el puerto 3000 dentro del contenedor
- Se accede desde el puerto 3001 en tu máquina

**depends_on:**
- Este servicio depende de que `db` esté **healthy** (listo)
- No iniciará hasta que MySQL esté completamente funcional

**volumes:**
- `./src/backend:/app`: Sincroniza código local con el contenedor (hot-reload)
- `/app/node_modules`: Volumen anónimo para node_modules del contenedor

---

## 5. Servicio 3: Frontend (Nginx)

```yaml
frontend:
  build:
    context: ./src/frontend
    dockerfile: Dockerfile
  container_name: el-puente-frontend
  ports:
    - "8080:80"
  depends_on:
    - backend
  networks:
    - el-puente-network
  volumes:
    - ./src/frontend:/usr/share/nginx/html:ro
```

### Desglose:

**ports: "8080:80"**
- Nginx corre en el puerto 80 dentro del contenedor
- Se accede desde http://localhost:8080 en tu navegador

**depends_on: backend**
- Espera a que el backend inicie (pero no verifica salud)

**volumes:**
- Sincroniza archivos del frontend con Nginx
- `:ro` = read-only (solo lectura dentro del contenedor)

---

## 6. Volúmenes y Redes

### Volúmenes definidos:
```yaml
volumes:
  mysql_data:
```

**mysql_data:**
- Volumen nombrado para persistir datos de MySQL
- Sobrevive a reinicios y reconstrucciones de contenedores

### Redes definidas:
```yaml
networks:
  el-puente-network:
```

**el-puente-network:**
- Red privada para que los contenedores se comuniquen entre sí
- Los servicios se pueden encontrar por su nombre

---

## 7. Comunicación entre Servicios

### Diagrama de Conexiones:

```
+----------------+
|   Frontend     |
|  (Nginx:8080)  |
+-------+--------+
        |
        | HTTP requests
        v
+-------+--------+
|    Backend     |
|  (Node:3001)   |
+-------+--------+
        |
        | MySQL connection
        v
+-------+--------+
|   Database     |
|  (MySQL:3307)  |
+----------------+
```

### Cómo se comunican:

1. **Frontend → Backend:**
   - Desde el navegador: `http://localhost:3001/api/...`
   - Dentro de Docker: Los contenedores pueden usar `http://backend:3000`

2. **Backend → Database:**
   - Usa `DB_HOST=db` (nombre del servicio)
   - Puerto 3306 (puerto interno, no 3307)

---

## 8. Comandos de Docker Compose

### Comandos esenciales:

```bash
# Iniciar todos los servicios
docker compose up

# Iniciar en segundo plano (detached)
docker compose up -d

# Iniciar y reconstruir imágenes
docker compose up -d --build

# Ver servicios corriendo
docker compose ps

# Ver logs de todos los servicios
docker compose logs

# Ver logs de un servicio específico
docker compose logs backend

# Seguir logs en tiempo real
docker compose logs -f backend

# Detener todos los servicios
docker compose down

# Detener y eliminar volúmenes
docker compose down -v

# Reiniciar un servicio específico
docker compose restart backend

# Ejecutar comando en un contenedor
docker compose exec backend sh
```

---

## 9. Práctica: Análisis del compose.yml

### Ejercicio 1: Completar la tabla

| Servicio  | Puerto Interno | Puerto Externo | Imagen Base |
|-----------|----------------|----------------|-------------|
| db        | 3306           | 3307           | mysql:8.0   |
| backend   | ?              | ?              | ?           |
| frontend  | ?              | ?              | ?           |

### Ejercicio 2: Preguntas
Responde basándote en el archivo compose.yml:

1. ¿Qué servicio debe iniciarse primero?
2. ¿Qué puerto usarías para acceder a la aplicación web?
3. ¿Dónde se guardan los datos de MySQL?
4. ¿Qué nombre usa el backend para conectarse a la base de datos?

---

## 10. Variables de Entorno

### Visualizar variables del backend:
```bash
docker compose exec backend env | grep DB_
```

### Orden de prioridad:
1. Variables definidas en `compose.yml`
2. Variables en archivo `.env` (si existe)
3. Variables del sistema

---

## 11. Troubleshooting Común

### Problema: Servicio no inicia
```bash
# Ver logs para identificar el error
docker compose logs nombre-servicio
```

### Problema: Puerto ya en uso
```bash
# Ver qué proceso usa el puerto
netstat -ano | findstr :3001

# Cambiar el puerto en compose.yml
ports:
  - "3002:3000"  # Usar otro puerto externo
```

### Problema: Cambios no se reflejan
```bash
# Reconstruir las imágenes
docker compose up -d --build
```

---

## ✅ Checklist del Día 5
- [ ] Archivo compose.yml completamente revisado
- [ ] Entendido cada servicio (db, backend, frontend)
- [ ] Comprendido el mapeo de puertos
- [ ] Entendidas las variables de entorno
- [ ] Visualizado cómo se comunican los servicios
- [ ] Comandos de Docker Compose practicados
- [ ] Ejercicios completados

---

## 📝 Notas Importantes
- Los nombres de servicios en Docker Compose actúan como "hostnames"
- Los volúmenes nombrados persisten datos entre reinicios
- `depends_on` controla el orden de inicio, pero no garantiza que el servicio esté listo

---

## 🎯 Próximo Día
**Día 6**: Primera ejecución del proyecto con Docker Compose
