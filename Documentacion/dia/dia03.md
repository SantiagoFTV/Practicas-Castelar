# Día 3: Docker Desktop y Conceptos de Contenedores

## Objetivos del Día
- Entender qué es Docker y para qué sirve
- Instalar Docker Desktop en Windows
- Conocer conceptos básicos de contenedores

---

## 1. ¿Qué es Docker?

Docker es una plataforma que permite:
- **Empaquetar aplicaciones** con todas sus dependencias
- **Ejecutar aplicaciones** en contenedores aislados
- **Garantizar** que la aplicación funcione igual en cualquier máquina

### Conceptos Clave

#### 🐳 Contenedor
- Una instancia en ejecución de una imagen
- Ambiente aislado que contiene la aplicación y sus dependencias
- Similar a una "máquina virtual ligera"

#### 📦 Imagen
- Plantilla de solo lectura para crear contenedores
- Contiene el código, runtime, librerías y configuración

#### 🐋 Dockerfile
- Archivo de instrucciones para construir una imagen
- Define cómo se configurará el contenedor

#### 🎼 Docker Compose
- Herramienta para definir y ejecutar aplicaciones multi-contenedor
- Usa un archivo `compose.yml` para configuración

---

## 2. Requisitos del Sistema

### Windows
- Windows 10/11 (64-bit)
- **WSL 2 (Windows Subsystem for Linux)** - requerido
- Virtualización habilitada en BIOS
- Mínimo 4GB de RAM (8GB recomendado)

---

## 3. Instalación de WSL 2

Antes de instalar Docker, necesitamos WSL 2.

### Abrir PowerShell como Administrador
Clic derecho en el ícono de Windows → "Terminal (Administrador)"

### Instalar WSL 2
```powershell
wsl --install
```

Esto instalará:
- WSL 2
- Ubuntu (distribución por defecto)

### Reiniciar el equipo
Después de la instalación, reinicia tu computadora.

### Verificar WSL
Después del reinicio, ejecutar:
```powershell
wsl --version
```

---

## 4. Instalación de Docker Desktop

### Descargar Docker Desktop
1. Ir a: https://www.docker.com/products/docker-desktop/
2. Descargar **Docker Desktop for Windows**
3. Tamaño aproximado: ~500MB

### Instalación
1. Ejecutar el instalador `Docker Desktop Installer.exe`
2. Configuración durante la instalación:
   - ✅ Use WSL 2 instead of Hyper-V (recomendado)
   - ✅ Add shortcut to desktop

3. Esperar a que termine la instalación
4. Reiniciar si es necesario

### Primer Inicio de Docker Desktop
1. Abrir Docker Desktop desde el menú inicio
2. Aceptar los términos de servicio
3. (Opcional) Crear cuenta de Docker Hub o saltar
4. Esperar a que Docker Engine inicie - verás un ícono de ballena en la barra de tareas

---

## 5. Verificar la Instalación

Abrir una terminal PowerShell y ejecutar:

```bash
docker --version
docker compose version
```

Deberías ver algo como:
```
Docker version 24.x.x
Docker Compose version v2.x.x
```

### Probar Docker con un contenedor simple
```bash
docker run hello-world
```

Este comando:
1. Descarga la imagen `hello-world`
2. Crea un contenedor
3. Ejecuta el contenedor
4. Muestra un mensaje de confirmación

---

## 6. Comandos Básicos de Docker

### Gestión de Contenedores
```bash
# Ver contenedores en ejecución
docker ps

# Ver todos los contenedores (incluidos los detenidos)
docker ps -a

# Detener un contenedor
docker stop nombre-contenedor

# Eliminar un contenedor
docker rm nombre-contenedor

# Ver logs de un contenedor
docker logs nombre-contenedor
```

### Gestión de Imágenes
```bash
# Ver imágenes descargadas
docker images

# Eliminar una imagen
docker rmi nombre-imagen

# Descargar una imagen
docker pull nombre-imagen
```

### Docker Compose
```bash
# Iniciar servicios definidos en compose.yml
docker compose up

# Iniciar en segundo plano
docker compose up -d

# Detener servicios
docker compose down

# Ver logs
docker compose logs

# Reconstruir y ejecutar
docker compose up -d --build
```

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

## 8. Configuración Recomendada de Docker Desktop

1. Abrir Docker Desktop
2. Ir a Settings (⚙️)
3. **Resources**:
   - CPUs: Mínimo 2, recomendado 4
   - Memory: Mínimo 4GB, recomendado 8GB
   - Swap: 1GB
   - Disk image size: 60GB

4. **General**:
   - ✅ Start Docker Desktop when you log in
   - ✅ Use WSL 2 based engine

---

## ✅ Checklist del Día 3
- [ ] WSL 2 instalado y verificado
- [ ] Docker Desktop instalado
- [ ] Docker Engine iniciado correctamente
- [ ] Comando `docker --version` funciona
- [ ] Contenedor `hello-world` ejecutado exitosamente
- [ ] Comandos básicos de Docker practicados
- [ ] Contenedor MySQL de prueba ejecutado

---

## 📝 Notas Importantes
- Docker Desktop debe estar corriendo para usar Docker
- El ícono de ballena en la barra de tareas indica que Docker está activo
- Si ves errores de "pipe", significa que Docker Desktop no está iniciado

---

## 🎯 Próximo Día
**Día 4**: Clonar el proyecto y entender su estructura
