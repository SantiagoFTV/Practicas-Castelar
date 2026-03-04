# Día 1: Instalar los Programas Básicos

## ¿Qué vamos a hacer hoy?
Hoy instalaremos 3 programas esenciales. **No te preocupes si no sabes para qué sirven**, te lo explico simple:

1. **Git** = Programa para guardar y organizar tu código
2. **Visual Studio Code** = Editor especial para escribir código (como Word, pero para programar)
3. **Terminal (PowerShell)** = Ventana donde escribimos comandos (ya viene en Windows)

**No es difícil, solo sigue los pasos** ✅

---

## 1. Instalar Git (Guardador de Código)

### ¿Qué es Git?
Git es como un "guardador automático" de tu código. Te permite:
- Guardar diferentes versiones de tu proyecto
- Volver atrás si algo sale mal
- Compartir tu código con otros

### Paso 1: Descargar Git
1. Abre tu navegador (Chrome, Edge, Firefox)
2. Ve a: https://git-scm.com/download/windows
3. Se descargará un archivo automáticamente

### Paso 2: Instalar Git
1. Busca el archivo descargado (probablemente en "Descargas")
2. Doble clic en el archivo
3. **Importante**: En todas las ventanas que aparezcan, solo haz clic en "Next" (Siguiente)
   - No cambies nada, las opciones por defecto están bien
4. Al final, haz clic en "Finish" (Finalizar)

### Paso 3: Verificar que Git se instaló
1. Abre el **Menú Inicio** de Windows (esquina inferior izquierda)
2. Escribe: `PowerShell`
3. Haz clic en "Windows PowerShell"
4. Aparecerá una ventana azul con texto blanco
5. Escribe esto (y presiona Enter):
```bash
git --version
```
6. **¿Qué deberías ver?** Algo como: `git version 2.43.0`
   - Si ves esto, ¡genial! Git está instalado ✅
   - Si dice "no se reconoce", cierra PowerShell, ábrelo de nuevo y prueba otra vez

### Paso 4: Configurar Git (decirle quién eres)
En la misma ventana de PowerShell, escribe estos dos comandos (reemplaza con tu nombre y email):

```bash
git config --global user.name "Tu Nombre"
```
Presiona Enter. Luego:

```bash
git config --global user.email "tuemail@ejemplo.com"
```
Presiona Enter.

**Ejemplo real:**
```bash
git config --global user.name "Juan Perez"
git config --global user.email "juan@gmail.com"
```

✅ Git ya sabe quién eres. No volverás a ver ningún mensaje, eso es normal.

---

## 2. Instalar Visual Studio Code (Editor de Código)

### ¿Qué es VS Code?
Es un programa para escribir código. Es como Microsoft Word, pero diseñado específicamente para programadores. Es **gratis** y muy popular.

### Paso 1: Descargar VS Code
1. Abre tu navegador
2. Ve a: https://code.visualstudio.com/
3. Haz clic en el botón azul grande que dice "Download for Windows"

### Paso 2: Instalar VS Code
1. Busca el archivo descargado
2. Doble clic para instalarlo
3. **Importante**: Durante la instalación, marca estas opciones:
   - ✅ "Add to PATH" (agregar a PATH)
   - ✅ "Open with Code" (abrir con Code)
   - Marca todo lo que puedas, son opciones útiles
4. Haz clic en "Next" hasta terminar
5. Al final, haz clic en "Finish"

### Paso 3: Abrir VS Code
1. Abre el Menú Inicio
2. Busca "Visual Studio Code"
3. Haz clic para abrirlo

¡Debería abrirse una ventana oscura con opciones!

### Extensiones ÚBasta por hoy!
**No instales extensiones todavía**. Las instalaremos cuando las necesitemos en los próximos días. Por ahora, solo asegúrate de que VS Code abra correctamente.

---

## 3. Familiarización con la Terminal

### PowerShell (Windows)
La terminal principal que usaremos en Windows.

### Comandos básicos a practicar:
```powershell
# Ver el directorio actual
pwd

# Listar archivos y carpetas
ls

# Cambiar de directorio
cd nombre-carpeta

# Volver al directorio anterior
cd ..

# Crear una carpeta
mkdir nombre-carpeta

# Limpiar la terminal
cls
```

---

## 4. Crear Carpeta de Proyectos

Crear una carpeta donde guardarás tus proyectos:
```powershell
cd C:\Users\TU_USUARIO\Desktop
mkdir Proyectos
cd Proyectos
```

---

## ✅ Checklist del Día 1
- [ ] Git instalado y configurado
- [ ] Visual Studio Code instalado
- [ ] Extensiones de VS Code instaladas
- [ ] Terminal PowerShell funcionando correctamente
- [ ] Comandos básicos de terminal practicados
- [ ] Carpeta de proyectos creada

---

## 📝 Notas
- Mantén tu terminal abierta para el próximo día
- Familiarízate con VS Code explorando su interfaz
- Practica los comandos de navegación en la terminal

---

## 🎯 Próximo Día
**Día 2**: Instalación de Node.js y gestión de paquetes con npm
