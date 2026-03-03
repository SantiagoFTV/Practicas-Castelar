# Docker - Guía de Uso

## Requisitos previos

- Docker instalado
- Docker Compose instalado

## Estructura de servicios

El proyecto está configurado con 3 servicios principales:

1. **MySQL** (puerto 3306) - Base de datos
2. **Backend** - Node.js + Express (puerto 3000)
3. **Frontend** - Nginx (puerto 80)

## Instrucciones de uso

### 1. Copiar archivo de configuración

```bash
copy .env.example .env
```

O si ya existe `.env`, revisar que tenga las variables correctas.

### 2. Iniciar los contenedores

```bash
docker-compose up -d
```

Para ver los logs:
```bash
docker-compose logs -f
```

### 3. Acceder a la aplicación

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000/api
- **Base de datos**: localhost:3306

## Comandos útiles

### Ver estado de los servicios
```bash
docker-compose ps
```

### Detener los servicios
```bash
docker-compose down
```

### Detener y eliminar volúmenes (elimina la BD)
```bash
docker-compose down -v
```

### Reconstruir imágenes
```bash
docker-compose build --no-cache
```

### Acceder a la consola del backend
```bash
docker-compose exec backend sh
```

### Ver logs de un servicio específico
```bash
docker-compose logs backend
docker-compose logs db
docker-compose logs frontend
```

### Recrear solo un servicio
```bash
docker-compose up -d --build backend
```

## Variables de entorno

Las variables de conexión a la BD se encuentran en el `docker-compose.yml`:

- **DB_HOST**: db (nombre del servicio Docker)
- **DB_USER**: puente_user
- **DB_PASSWORD**: puente_password
- **DB_NAME**: el_puente

Si necesitas cambiarlas, modifica el archivo `docker-compose.yml` y reconstruye:

```bash
docker-compose down -v
docker-compose up -d --build
```

## Notas importantes

- La base de datos se inicializa automáticamente con `models/users.sql`
- El backend espera que la BD esté disponible antes de iniciar
- El frontend se sirve en puerto 80 (requiere permisos de administrador en algunos sistemas)
- Los cambios en código se reflejan automáticamente gracias a los volúmenes montados

## Solución de problemas

### El backend no se conecta a la BD
```bash
docker-compose logs db
```
Verifica que el contenedor `db` esté saludable.

### Puerto ya en uso
```bash
# Para cambiar puertos, edita docker-compose.yml:
# ports:
#   - "3001:3000"  # Cambiar puerto externo
```

### Limpiar todo e iniciar de cero
```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```
