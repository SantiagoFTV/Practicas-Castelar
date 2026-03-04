# Día 6: ¡Encender el Proyecto por Primera Vez!

## ¿Qué vamos a hacer hoy?

Hoy es el día más emocionante: **¡ejecutaremos el proyecto completo!**

Con un solo comando, se iniciarán:
- 📦 Base de datos (MySQL)
- 🔧 Servidor (Backend)
- 🌐 Página web (Frontend)

**Es como presionar un botón mágico que inicia todo** ✨

---

## 1. Antes de Empezar

### Verificaciones importantes:

**1. ¿Docker Desktop está abierto?**
- Busca el ícono de ballena en la barra de tareas (abajo a la derecha)
- Si no está, ábrelo desde el Menú Inicio
- Espera 1-2 minutos a que termine de cargar

**2. ¿Estás en la carpeta correcta?**

Abre PowerShell y verifica:
```bash
pwd
```

Deberías estar en algo como: `C:\Users\SANTIAGO\Desktop\Practicas-Castelar`

**Si no estás ahí**, navega a la carpeta:
```bash
cd Desktop
cd Practicas-Castelar
```

---

## 2. ¡El Comando Mágico!

### Escribir el comando mágico:

En PowerShell, escribe:

```bash
docker compose up -d --build
```

Presiona Enter y **espera**.

### ¿Qué significa este comando?

- `docker compose` = Usa Docker Compose (coordinador de contenedores)
- `up` = "Enciende" los servicios
- `-d` = Modo segundo plano (no bloquear la terminal)
- `--build` = Construye todo antes de iniciar

### ¿Qué verás?

Verás MUCHÍSIMO texto:
- [+] Building... (construyendo)
- [+] Pulling... (descargando)
- [+] Creating... (creando)
- [+] Starting... (iniciando)

**NO TE ASUSTES. Esto es normal** ✅

**¿Cuánto tarda?**
- 🕐 Primera vez: 5-10 minutos (descarga cosas grandes)
- ⏱️ Próximas veces: 1-2 minutos

### Señales de éxito:

Al final verás:
```
✅ Container el-puente-db          Started
✅ Container el-puente-backend     Started  
✅ Container el-puente-frontend    Started
```

**Si ves los 3 ✅, FELICIDADES! Todo está corriendo** 🎉
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

## 3. Verificar que Todo Esté Funcionando

### Ver si los contenedores están corriendo:

En PowerShell, escribe:
```bash
docker compose ps
```

**¿Qué deberías ver?**
```
NAME                    STATUS          PORTS
el-puente-db           Up 2 minutes    0.0.0.0:3307->3306/tcp
el-puente-backend      Up 2 minutes    0.0.0.0:3001->3000/tcp
el-puente-frontend     Up 2 minutes    0.0.0.0:8080->80/tcp
```

✅ **Todos deben decir "Up" (arriba)**

Si alguno dice "Exited" (salido), algo falló.

### ¿Cómo ver si hay errores?

Si algo no funciona, escribe:
```bash
docker compose logs
```

Esto muestra lo que cada contenedor está haciendo. Busca líneas rojas (errores).

**Para ver solo el backend:**
```bash
docker compose logs backend
```

**Para ver solo la base de datos:**
```bash
docker compose logs db
```

---

## 4. ¡Abrir la Página Web!

### Esta es la parte más emocionante 🎉

1. Abre tu navegador (Chrome, Firefox, Edge)
2. En la barra de direcciones, escribe:
```
http://localhost:8080
```
3. Presiona Enter

**¿Qué deberías ver?**
- La página principal del proyecto
- Botones de "Login" y "Register"
- Diseño de la aplicación

✅ **Si ves la página, ¡FUNCIONA! Felicidades** 🎊

### Otras direcciones que puedes probar:

**Página de registro:**
```
http://localhost:8080/html/register.html
```

**Página de login:**
```
http://localhost:8080/html/login.html
```
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
---

## 5. ¡Probar que Todo Funciona!

### Registrar un usuario nuevo:

1. Ve a: `http://localhost:8080/html/register.html`
2. Llena el formulario:
   - Usuario: `prueba`
   - Email: `prueba@test.com`
   - Contraseña: `password123`
   - Nombre y apellido: lo que quieras
3. Click en "Registrarse"
4. Si te redirige a otra página o dice "éxito", ¡funcionó! ✅

### Iniciar sesión:

1. Ve a: `http://localhost:8080/html/login.html`
2. Ingresa:
   - Usuario: `prueba`
   - Contraseña: `password123`
3. Click en "Iniciar sesión"
4. Si entras al sistema, ¡TODO FUNCIONA PERFECTO! 🎉

---

## 6. Comandos Útiles (Guárdalos)

### Cuando quieras detener todo:
```bash
docker compose down
```

### Cuando quieras reiniciar todo:
```bash
docker compose up -d
```

### Cuando hagas cambios al código:
```bash
docker compose up -d --build
```

### Ver qué está pasando (logs):
```bash
docker compose logs -f
```
(Presiona Ctrl+C para salir)

---

## 7. ¿Algo No Funciona? (Problemas Comunes)

### Problema 1: "unable to get image" o "pipe"
**Causa**: Docker Desktop no está abierto

**Solución:**
1. Abre Docker Desktop
2. Espera 1-2 minutos
3. Intenta el comando de nuevo

---

### Problema 2: "port already in use" (puerto en uso)
**Causa**: Otro programa está usando el puerto 8080, 3001 o 3307

**Solución rápida:**
1. Reinicia tu computadora
2. Asegúrate de que Docker Desktop esté abierto
3. Intenta de nuevo

---

### Problema 3: La página no carga (localhost:8080)
**Solución:**
1. Espera 1-2 minutos (a veces tarda en iniciar)
2. Verifica que los contenedores estén "Up":
   ```bash
   docker compose ps
   ```
3. Ve los logs para ver errores:
   ```bash
   docker compose logs frontend
   ```

---

### Problema 4: "Backend no se conecta a la BD"
**Solución:**
1. Espera un poco más (MySQL tarda en arrancar)
2. Reinicia solo el backend:
   ```bash
   docker compose restart backend
   ```

---

### ¿NADA funciona?

**Último recurso** (esto borrará todo y empezará de cero):

```bash
docker compose down -v
docker compose up -d --build
```

Espera 5 minutos y prueba de nuevo.

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

## ✅ Verificación del Día 6

Marca lo que completaste:

- [ ] Ejecuté `docker compose up -d --build` exitosamente
- [ ] Los 3 contenedores están "Up" (db, backend, frontend)
- [ ] Puedo abrir http://localhost:8080 en mi navegador
- [ ] Pude registrar un usuario nuevo
- [ ] Pude iniciar sesión con ese usuario
- [ ] Sé cómo detener el proyecto (`docker compose down`)
- [ ] Sé cómo ver los logs (`docker compose logs`)

**Si marcaste todo, ¡FELICIDADES! 🎉 Lograste hacer funcionar el proyecto completo**

Este fue el día más importante. ¡Lo demás es más fácil!

---

## 💡 Consejos Importantes

**Para trabajar con el proyecto:**
1. Siempre abre Docker Desktop PRIMERO
2. Espera a que cargue (1-2 minutos)
3. Luego ejecuta `docker compose up -d`
4. Cuando termines: `docker compose down`

**Comandos que usarás TODO EL TIEMPO:**
```bash
docker compose up -d          # Encender
docker compose down            # Apagar
docker compose logs            # Ver qué pasa
docker compose ps              # Ver estado
```

**Recuerda:**
- La primera vez tarda más (descarga cosas)
- Las próximas veces son más rápidas
- Si algo falla, revisa los logs
- Cuando tengas dudas, reinicia todo

---

## 🚀 Próximo Día

**Día 7**: Veremos cómo funciona el servidor (backend) por dentro

Ahora que el proyecto funciona, en los próximos días entenderemos cómo está hecho.

¡Descansa y celébralo! Hiciste algo genial hoy 🎊

---

## 🎯 Próximo Día
**Día 7**: Exploración del código del backend y endpoints de la API
