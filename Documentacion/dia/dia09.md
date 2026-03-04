# Día 9: Base de Datos MySQL - Consultas y Gestión

## Objetivos del Día
- Conectarse directamente a MySQL
- Entender el esquema de la base de datos
- Practicar consultas SQL
- Aprender a gestionar datos

---

## 1. Conectarse a MySQL

### Asegúrate de que el proyecto esté corriendo:
```bash
docker compose up -d
```

### Método 1: Desde Docker (Recomendado)
```bash
# Conectar a MySQL usando Docker
docker compose exec db mysql -u puente_user -ppuente_password el_puente
```

**Nota**: No hay espacio entre `-p` y la contraseña.

### Método 2: Desde MySQL Workbench (si lo tienes instalado)
1. Abrir MySQL Workbench
2. Nueva conexión:
   - Host: `localhost`
   - Port: `3307`
   - Usuario: `puente_user`
   - Password: `puente_password`
   - Database: `el_puente`

### Método 3: Cliente de línea de comandos (si tienes MySQL instalado)
```bash
mysql -h localhost -P 3307 -u puente_user -ppuente_password el_puente
```

---

## 2. Esquema de la Base de Datos

### Ver el archivo de inicialización:
```bash
code src/backend/models/users.sql
```

### Estructura típica de la tabla `users`:

```sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    foto_perfil VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Campos de la tabla:

| Campo       | Tipo          | Descripción                           |
|-------------|---------------|---------------------------------------|
| id          | INT           | Identificador único (auto-incremental)|
| username    | VARCHAR(50)   | Nombre de usuario (único)             |
| email       | VARCHAR(100)  | Correo electrónico (único)            |
| password    | VARCHAR(255)  | Contraseña hasheada (bcrypt)          |
| nombre      | VARCHAR(50)   | Nombre del usuario                    |
| apellido    | VARCHAR(50)   | Apellido del usuario                  |
| foto_perfil | VARCHAR(255)  | Ruta de la foto de perfil             |
| created_at  | TIMESTAMP     | Fecha de creación                     |
| updated_at  | TIMESTAMP     | Fecha de última actualización         |

---

## 3. Comandos Básicos de MySQL

### Una vez conectado a MySQL:

```sql
-- Ver todas las bases de datos
SHOW DATABASES;

-- Usar una base de datos específica
USE el_puente;

-- Ver todas las tablas
SHOW TABLES;

-- Ver estructura de una tabla
DESCRIBE users;
-- o
SHOW COLUMNS FROM users;

-- Ver la creación de la tabla
SHOW CREATE TABLE users;

-- Ver el estado del servidor
STATUS;

-- Salir
EXIT;
-- o
QUIT;
```

---

## 4. Consultas SELECT - Leer Datos

### Ver todos los usuarios:
```sql
SELECT * FROM users;
```

### Seleccionar columnas específicas:
```sql
SELECT id, username, email FROM users;
```

### Filtrar por condición (WHERE):
```sql
-- Buscar usuario por username
SELECT * FROM users WHERE username = 'test_user';

-- Buscar por ID
SELECT * FROM users WHERE id = 1;

-- Buscar por email
SELECT * FROM users WHERE email LIKE '%@test.com';
```

### Ordenar resultados (ORDER BY):
```sql
-- Ordenar por fecha de creación (más recientes primero)
SELECT * FROM users ORDER BY created_at DESC;

-- Ordenar alfabéticamente por username
SELECT * FROM users ORDER BY username ASC;
```

### Limitar resultados (LIMIT):
```sql
-- Obtener los primeros 5 usuarios
SELECT * FROM users LIMIT 5;

-- Obtener usuarios del 6 al 10 (paginación)
SELECT * FROM users LIMIT 5 OFFSET 5;
```

### Contar registros (COUNT):
```sql
-- Contar total de usuarios
SELECT COUNT(*) FROM users;

-- Contar usuarios con foto de perfil
SELECT COUNT(*) FROM users WHERE foto_perfil IS NOT NULL;
```

### Agrupar resultados (GROUP BY):
```sql
-- Contar usuarios por dominio de email
SELECT 
    SUBSTRING_INDEX(email, '@', -1) AS dominio,
    COUNT(*) AS cantidad
FROM users
GROUP BY dominio;
```

---

## 5. Consultas INSERT - Insertar Datos

### Insertar un usuario (simulación - normalmente lo hace la app):
```sql
INSERT INTO users (username, email, password, nombre, apellido)
VALUES (
    'sql_user',
    'sql@example.com',
    '$2b$10$abcdefghijklmnopqrstuv',  -- Password hasheado simulado
    'SQL',
    'Usuario'
);
```

### Insertar múltiples registros:
```sql
INSERT INTO users (username, email, password, nombre, apellido)
VALUES 
    ('usuario1', 'user1@example.com', '$2b$10$xyz', 'Uno', 'Usuario'),
    ('usuario2', 'user2@example.com', '$2b$10$abc', 'Dos', 'Usuario'),
    ('usuario3', 'user3@example.com', '$2b$10$def', 'Tres', 'Usuario');
```

---

## 6. Consultas UPDATE - Actualizar Datos

### Actualizar un campo:
```sql
-- Actualizar email de un usuario
UPDATE users 
SET email = 'nuevo_email@example.com'
WHERE username = 'sql_user';
```

### Actualizar múltiples campos:
```sql
UPDATE users 
SET 
    nombre = 'Nuevo Nombre',
    apellido = 'Nuevo Apellido',
    foto_perfil = '/uploads/foto123.jpg'
WHERE id = 1;
```

### ⚠️ IMPORTANTE: Siempre usar WHERE
```sql
-- MAL - Actualizará TODOS los registros
UPDATE users SET email = 'test@test.com';

-- BIEN - Solo actualiza el usuario específico
UPDATE users SET email = 'test@test.com' WHERE id = 1;
```

---

## 7. Consultas DELETE - Eliminar Datos

### Eliminar un registro:
```sql
DELETE FROM users WHERE id = 5;
```

### Eliminar múltiples registros:
```sql
-- Eliminar usuarios sin foto de perfil
DELETE FROM users WHERE foto_perfil IS NULL;
```

### ⚠️ PELIGRO: Eliminar todos los registros
```sql
-- Esto eliminará TODOS los usuarios (ten cuidado)
DELETE FROM users;
```

### Truncar tabla (más rápido que DELETE):
```sql
-- Vacía la tabla y reinicia el auto_increment
TRUNCATE TABLE users;
```

---

## 8. Consultas Avanzadas

### JOIN (si tuvieras múltiples tablas):
```sql
-- Ejemplo conceptual (requeriría otra tabla)
SELECT 
    u.username,
    p.title
FROM users u
INNER JOIN posts p ON u.id = p.user_id;
```

### Subconsultas:
```sql
-- Usuarios creados después del usuario más antiguo
SELECT * FROM users 
WHERE created_at > (
    SELECT MIN(created_at) FROM users
);
```

### CASE (condicionales):
```sql
SELECT 
    username,
    CASE 
        WHEN foto_perfil IS NOT NULL THEN 'Con foto'
        ELSE 'Sin foto'
    END AS estado_foto
FROM users;
```

---

## 9. Índices y Rendimiento

### Ver índices de una tabla:
```sql
SHOW INDEX FROM users;
```

### Crear un índice:
```sql
-- Crear índice en email para búsquedas más rápidas
CREATE INDEX idx_email ON users(email);
```

### Ver plan de ejecución de una query:
```sql
EXPLAIN SELECT * FROM users WHERE email = 'test@test.com';
```

---

## 10. Backup y Restauración

### Hacer backup de la base de datos:
```bash
docker compose exec db mysqldump -u puente_user -ppuente_password el_puente > backup.sql
```

### Restaurar desde un backup:
```bash
docker compose exec -T db mysql -u puente_user -ppuente_password el_puente < backup.sql
```

---

## 11. Transacciones

### ¿Qué son las transacciones?
Conjunto de operaciones que se ejecutan como una unidad:
- O todas se ejecutan exitosamente
- O ninguna se ejecuta (rollback)

### Ejemplo:
```sql
-- Iniciar transacción
START TRANSACTION;

-- Operación 1
UPDATE users SET nombre = 'Test' WHERE id = 1;

-- Operación 2
UPDATE users SET apellido = 'User' WHERE id = 1;

-- Si todo está bien, confirmar
COMMIT;

-- Si algo salió mal, revertir
-- ROLLBACK;
```

---

## 12. Práctica: Análisis de Datos

### Ejercicio 1: Estadísticas básicas
```sql
-- Total de usuarios
SELECT COUNT(*) AS total_usuarios FROM users;

-- Usuario más antiguo
SELECT username, created_at 
FROM users 
ORDER BY created_at ASC 
LIMIT 1;

-- Usuario más reciente
SELECT username, created_at 
FROM users 
ORDER BY created_at DESC 
LIMIT 1;
```

### Ejercicio 2: Búsquedas complejas
```sql
-- Usuarios cuyo nombre empieza con 'A'
SELECT * FROM users 
WHERE nombre LIKE 'A%';

-- Usuarios registrados en los últimos 7 días
SELECT * FROM users 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);

-- Usuarios con dominios específicos
SELECT * FROM users 
WHERE email LIKE '%@gmail.com' 
   OR email LIKE '%@yahoo.com';
```

---

## 13. Gestión de Usuarios MySQL

### Ver usuarios de MySQL:
```sql
SELECT User, Host FROM mysql.user;
```

### Crear un nuevo usuario:
```sql
CREATE USER 'nuevo_usuario'@'localhost' IDENTIFIED BY 'password123';
```

### Otorgar permisos:
```sql
GRANT ALL PRIVILEGES ON el_puente.* TO 'nuevo_usuario'@'localhost';
FLUSH PRIVILEGES;
```

---

## 14. Logs y Debugging

### Ver últimas queries (si el log está habilitado):
```sql
SHOW FULL PROCESSLIST;
```

### Ver variables del servidor:
```sql
-- Ver todas las variables
SHOW VARIABLES;

-- Buscar variables específicas
SHOW VARIABLES LIKE '%max_connections%';
```

### Ver tamaño de las tablas:
```sql
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
FROM information_schema.TABLES
WHERE table_schema = 'el_puente'
ORDER BY size_mb DESC;
```

---

## 15. Buenas Prácticas

### ✅ DO (Hacer):
- Siempre usar WHERE en UPDATE y DELETE
- Hacer backups regulares
- Usar transacciones para operaciones críticas
- Crear índices en columnas de búsqueda frecuente
- Validar datos antes de insertar

### ❌ DON'T (No hacer):
- Nunca guardar contraseñas en texto plano
- No ejecutar DELETE sin WHERE en producción
- No ignorar errores de SQL
- No usar SELECT * en producción (especificar columnas)
- No crear índices en todas las columnas (afecta rendimiento de INSERT)

---

## 16. Troubleshooting Común

### Error: "Access denied"
```sql
-- Verificar permisos
SHOW GRANTS FOR 'puente_user'@'%';
```

### Error: "Table doesn't exist"
```sql
-- Verificar que estás en la base de datos correcta
SELECT DATABASE();

-- Ver tablas disponibles
SHOW TABLES;
```

### Error: "Duplicate entry"
```sql
-- Un campo UNIQUE ya tiene ese valor
-- Verificar datos existentes antes de insertar
SELECT * FROM users WHERE username = 'valor_duplicado';
```

---

## ✅ Checklist del Día 9
- [ ] Conectado exitosamente a MySQL
- [ ] Esquema de la tabla `users` comprendido
- [ ] Comandos básicos de MySQL practicados
- [ ] Consultas SELECT dominadas
- [ ] Consultas INSERT, UPDATE, DELETE probadas
- [ ] Consultas avanzadas exploradas
- [ ] Backup de base de datos realizado
- [ ] Transacciones entendidas
- [ ] Análisis de datos practicado
- [ ] Buenas prácticas identificadas

---

## 📝 Notas Importantes
- Siempre hacer un backup antes de cambios importantes
- Probar queries con LIMIT primero
- Usar WHERE en UPDATE y DELETE siempre
- Las contraseñas hasheadas no se pueden "desencriptar"

---

## 🎯 Próximo Día
**Día 10**: Modificaciones, debugging y despliegue del proyecto completo
