# Día 3: Instalar Docker (Creador de "Mini Computadoras")

## ¿Qué vamos a hacer hoy?

Hoy instalaremos **Docker Desktop**. Este es el día más largo, así que tómate tu tiempo.

**¿Qué es Docker?** (Explicación MUY simple)

Imagina que quieres tener varios programas corriendo al mismo tiempo sin que se peleen entre sí. Docker crea "cajas" especiales (contenedores) donde cada programa vive separado.

**Analogía**:
- Tu computadora = edificio
- Docker = creador de apartamentos
- Contenedor = un apartamento individual
- Cada apartamento tiene todo lo que necesita (baño, cocina, etc.)

**No te preocupes si parece complicado**. Solo síguelo instalando y lo entenderás mejor cuando lo uses.

---

## 1. Conceptos Básicos (Lectura rápida)

### 🐳 Contenedor
- Es como una "mini computadora virtual"
- Tiene su propio sistema operativo pequeño
- Está aislado de tu computadora real

### 📦 Imagen
- Es como la "receta" para crear un contenedor
- Ejemplo: "imagen de MySQL" = instrucciones para crear una base de datos

### 🐋 Dockerfile
- Un archivo con instrucciones para crear una imagen
- Es como una receta de cocina, pero para programas

### 🎼 Docker Compose
- Herramienta para manejar varios contenedores a la vez
- Como un director de orquesta que coordina músicos

**No memorices esto**. Solo léelo y continúa.

---

## 2. ¿Qué necesitas antes de instalar Docker?

### Requisitos (verifica que tu computadora los tenga):
- Windows 10 o Windows 11
- 8GB de RAM (mínimo 4GB, pero se recomendar 8GB)
- Conexión a internet buena (descargaremos cosas grandes)
- Espacio en disco: 10GB libres

**Si tienes Windows 10/11 reciente, probablemente todo funcionará bien** ✅

---

## 3. PASO 1: Instalar WSL 2 (Sistema Linux para Windows)

### ¿Qué es WSL?
**WSL** = Windows Subsystem for Linux

Es como tener un pequeño Linux viviendo dentro de Windows. Docker lo necesita para funcionar.

**No te asustes**, es muy fácil de instalar.

### Instalación de WSL 2:

1. **Abre PowerShell como Administrador**:
   - Click derecho en el Menú Inicio de Windows
   - Click en "Terminal (Admin)" o "Windows PowerShell (Administrador)"
   - Si aparece una ventana pidiendo permiso, haz clic en "Sí"

2. **Copia y pega este comando**:
```powershell
wsl --install
```

3. **Presiona Enter**

4. **Espera** (puede tardar 5-10 minutos)
   - Verás que se descargan e instalan cosas
   - Mensajes como "Installing..." son normales

5. **Cuando termine**, te pedirá reiniciar la computadora
   - Guarda todo lo que estés haciendo
   - Reinicia la PC

6. **Después de reiniciar**:
   - Puede que se abra una ventana de Ubuntu (es normal)
   - Te pedirá crear un usuario, ponle un nombre simple
   - Te pedirá una contraseña, ponle algo que recuerdes

### Verificar que WSL funciona:

Abre PowerShell normal (no como administrador) y escribe:
```powershell
wsl --version
```

Deberías ver información sobre WSL. Si aparece, ¡perfecto! ✅

**¿Da error?** Asegúrate de haber reiniciado la PC.

---

## 4. PASO 2: Instalar Docker Desktop

### ¿Qué es Docker Desktop?
Es la aplicación gráfica de Docker para Windows. Te permite controlar Docker con clics además de comandos.

### Descarga e Instalación:

1. **Ir a la página de Docker**:
   - Abre tu navegador
   - Ve a: **https://www.docker.com/products/docker-desktop/**

2. **Descargar**:
   - Click en "Download for Windows"
   - El archivo es grande (~500MB), tardará un poco

3. **Instalar**:
   - Abre el archivo descargado (`Docker Desktop Installer.exe`)
   - **MUY IMPORTANTE**: Asegúrate de marcar:
     - ✅ "Use WSL 2 instead of Hyper-V" (Usar WSL 2)
   - Click en "OK"
   - Espera (puede tardar 5-10 minutos)

4. **Finalizar**:
   - Click en "Close and restart" (Cerrar y reiniciar)
   - Tu PC se reiniciará otra vez

5. **Después del reinicio**:
   - Docker Desktop se abrirá automáticamente
   - Te mostrará un tutorial, puedes saltearlo
   - Verás un ícono de **ballena** en la barra de tareas (abajo a la derecha)
   - Si la ballena no se mueve, ¡Docker está listo! ✅

---

## 5. Verificar que Docker funciona

**IMPORTANTE**: Asegúrate de que Docker Desktop esté abierto (ver el ícono de ballena en la barra de tareas).

### Abrir PowerShell y probar:

1. Abre PowerShell (normal, no como administrador)

2. Escribe:
```bash
docker --version
```

Deberías ver algo como: `Docker version 24.0.6`

3. Escribe:
```bash
docker compose version
```

Deberías ver algo como: `Docker Compose version v2.23.0`

**Si ambos funcionan, ¡felicidades! Docker está instalado** 🎉

### Prueba final con "Hello World":

Escribe:
```bash
docker run hello-world
```

**¿Qué debería pasar?**
1. Docker descarga una imagen llamada "hello-world"
2. Crea un contenedor con esa imagen
3. El contenedor muestra un mensaje
4. El contenedor se detiene

Verás un mensaje que dice "Hello from Docker!" ✅

**¿Da error?** Verifica que Docker Desktop esté abierto y corriendo.

---

## 6. Comandos Básicos de Docker (Solo lectura)

**No ejecutes estos comandos ahora**, solo léelos para familiarizarte. Los usarás en los próximos días.

### Ver contenedores:
```bash
# Ver contenedores corriendo ahora
docker ps

# Ver TODOS los contenedores (incluso los detenidos)
docker ps -a
```

### Controlar contenedores:
```bash
# Detener un contenedor
docker stop nombre-contenedor

# Eliminar un contenedor
docker rm nombre-contenedor

# Ver qué está pasando dentro de un contenedor
docker logs nombre-contenedor
```

### Trabajar con imágenes:
```bash
# Ver las imágenes que tienes descargadas
docker images

# Descargar una imagen
docker pull nombre-imagen

# Eliminar una imagen
docker rmi nombre-imagen
```

### Docker Compose (para manejar varios contenedores):
```bash
# Iniciar todo (lo usarás MUY seguido)
docker compose up -d

# Detener todo
docker compose down

# Ver logs de todo
docker compose logs

# Reconstruir y reiniciar todo
docker compose up -d --build
```

**Consejo**: Guarda esta página como favorito, volverás aquí seguido.

---

## 7. Práctica: Ejecutar un Contenedor MySQL

```bash
# Ejecutar un contenedor MySQL
docker run --name mysql-prueba -e MYSQL_ROOT_PASSWORD=mi_password -p 3306:3306 -d mysql:8.0

# Verificar que está corriendo
docker ps

# Ver los logs
docker logs mysql-prueba

# Detenerlo
docker stop mysql-prueba

# Eliminarlo
docker rm mysql-prueba
```

---

## 7. Configuración de Docker Desktop (Opcional pero RecomendadA)

1. Abre Docker Desktop (click en el ícono de ballena)
2. Click en el ícono de engranaje ⚙️ (Settings)
3. Ve a "Resources" (Recursos)
4. Ajusta estos valores:
   - **CPUs**: 2 (mínimo) o 4 (recomendado)
   - **Memory**: 4GB (mínimo) o 6-8GB (recomendado)
5. Click en "Apply & Restart"

**¿Por qué esto?** Le das más poder a Docker para que funcione mejor.

---

## ✅ Verificación del Día 3

Marca lo que completaste:

- [ ] WSL 2 instalado (comando `wsl --version` funciona)
- [ ] Docker Desktop instalado
- [ ] Ícono de ballena visible en la barra de tareas
- [ ] Comando `docker --version` funciona  
- [ ] Comando `docker compose version` funciona
- [ ] Ejecuté `docker run hello-world` exitosamente
- [ ] Leí los comandos básicos (no necesito memorizarlos)
- [ ] (Opcional) Configuré recursos de Docker Desktop

**Si marcaste la mayoría, ¡excelente trabajo! 🚀**

Este fue el día más complicado. Los siguientes serán más fáciles.

---

## � Consejos Importantes

1. **Ícono de ballena**: Si la ballena está gris o con X, Docker no está corriendo. Ábrelo de nuevo.
2. **Errores de "pipe"**: Significa que Docker Desktop no está iniciado. Solo ábrelo.
3. **Lento al iniciar**: Docker tarda 1-2 minutos en arrancar cuando abres tu PC. Es normal.
4. **Consume recursos**: Docker usará RAM y CPU. Ciérralo si no lo estás usando.

---

## 🚀 Próximo Día

**Día 4**: Descargaremos el proyecto a tu computadora y veremos qué tiene adentro

¡Descansa! Hoy instalaste muchas cosas. Los próximos días serán más sencillos.

**Recuerda**: Antes de empezar el Día 5 o 6, ¡asegúrate de que Docker Desktop esté abierto!
