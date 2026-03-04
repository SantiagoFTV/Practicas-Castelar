# Día 2: Instalar Node.js (Ejecutor de JavaScript)

## ¿Qué vamos a hacer hoy?
Hoy instalaremos **Node.js**, un programa que permite ejecutar JavaScript en tu computadora (normalmente JavaScript solo funciona en navegadores web).

**¿Para qué sirve?**
- Ejecutar código JavaScript fuera del navegador
- Crear servidores web (la parte invisible de las páginas)
- Instalar herramientas y librerías de programación

**No te preocupes si no entiendes todo**, solo síguelo instalando. ¡Lo usarás pronto!

---

## 1. ¿Qué es Node.js? (Explicación Simple)

**Analogía**: 
- JavaScript es como un idioma
- El navegador (Chrome, Firefox) es un traductor de ese idioma
- Node.js es OTRO traductor del mismo idioma, pero que funciona en tu computadora

**¿Qué es npm?**
Cuando instalas Node.js, también se instala **npm** automáticamente.
- npm = "Descargador de herramientas"
- Es como una tienda de aplicaciones, pero para programadores
- Con npm puedes descargar e instalar librerías de código que otros hicieron

---

## 2. Instalar Node.js (Paso a Paso)

### Paso 1: Ir a la página de Node.js
1. Abre tu navegador
2. Ve a: **https://nodejs.org/**
3. Verás DOS botones verdes

### Paso 2: Elegir la versión correcta
- **LTS** (Recommended for Most Users) ← **Descarga ESTE**
- Current (Latest Features) ← NO este

**¿Por qué LTS?** Significa "Long Term Support" (soporte a largo plazo). Es la versión más estable y segura.

### Paso 3: Descargar e instalar
1. Haz clic en el botón verde de **LTS**
2. Se descargará un archivo (node-v...-x64.msi)
3. Abre el archivo descargado
4. Haz clic en "Next" en todas las ventanas
   - **Importante**: NO cambies nada, deja todo como está
5. Espera a que termine (puede tardar 2-3 minutos)
6. Haz clic en "Finish"

### Paso 4: Verificar que se instaló correctamente

**MUY IMPORTANTE**: Cierra PowerShell si lo tenías abierto, y ábrelo de nuevo.

1. Abre **PowerShell** (Menú Inicio → PowerShell)
2. Escribe:
```bash
node --version
```
3. Presiona Enter
4. Deberías ver algo como: `v20.11.0` o `v22.x.x`

Luego verifica npm:
```bash
npm --version
```
Deberías ver algo como: `10.2.4`

**¿Qué significan estos números?** Son las versiones instaladas. Si ves números, ¡funciona! ✅

**¿Da error?** 
- Cierra PowerShell completamente
- Ábrelo de nuevo
- Intenta otra vez

---

## 3. Entender NPM (Descargador de Herramientas)

### ¿Qué hace npm?
Imagina que quieres hacer una torta:
- Tú escribes el código (la receta)
- npm trae los ingredientes (librerías que otros programadores hicieron)

### Comandos principales (no los ejecutes todavía, solo léelos)

**Ver la versión de npm:**
```bash
npm --version
```

**Iniciar un proyecto nuevo:**
```bash
npm init
```
Esto crea un archivo `package.json` (hablaremos de eso en un momento)

**Instalar una herramienta:**
```bash
npm install nombre-herramienta
```

**Instalar todas las herramientas de un proyecto:**
```bash
npm install
```
(Esto lo usarás mucho)

---

## 4. Tu Primer Proyecto con Node.js (Práctica)

Vamos a crear un proyecto pequeño para probar que todo funciona.

### Paso 1: Crear una carpeta para el proyecto

Abre PowerShell y escribe:

```powershell
cd Desktop
cd Proyectos
mkdir mi-primer-node
cd mi-primer-node
```

**¿Qué hicimos?**
1. Fuimos al Escritorio
2. Entramos a la carpeta Proyectos (la creamos ayer)
3. Creamos una carpeta nueva llamada "mi-primer-node"
4. Entramos a esa carpeta

### Paso 2: Crear el archivo package.json

Escribe:
```bash
npm init -y
```

**¿Qué hace esto?** Crea un archivo llamado `package.json` que contiene información sobre tu proyecto.

**El `-y`** significa "sí a todo", para no tener que responder preguntas.

Verás un mensaje que dice que se creó el archivo.

### Paso 3: Crear tu primer archivo JavaScript

1. Abre Visual Studio Code
2. Click en "File" (Archivo) → "Open Folder" (Abrir Carpeta)
3. Busca y abre la carpeta `mi-primer-node` que acabas de crear
4. Click en el icono de "nuevo archivo" (hoja en blanco)
5. Llámala: `index.js`
6. Escribe esto dentro:

```javascript
console.log("¡Hola desde Node.js!");
console.log("Mi primera vez usando Node");
console.log("Versión de Node:", process.version);
```

7. Guarda el archivo (Ctrl + S)

**¿Qué hace este código?** Simplemente muestra mensajes en la pantalla.

### Paso 4: Ejecutar tu código

Vuelve a PowerShell (debe estar en la carpeta `mi-primer-node`) y escribe:

```bash
node index.js
```

**¿Qué deberías ver?**
```
¡Hola desde Node.js!
Mi primera vez usando Node
Versión de Node: v20.11.0
```

✅ **¡Felicidades! Acabas de ejecutar tu primer programa con Node.js**

---

## 5. Entender package.json (Archivo de Configuración)

El archivo `package.json` es como la "tarjeta de identidad" de tu proyecto.

**Ver el archivo:**
1. En VS Code, haz clic en `package.json` para abrirlo
2. Verás algo como esto:

```json
{
  "name": "mi-primer-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

**¿Qué significa cada cosa?**
- **name**: El nombre de tu proyecto
- **version**: Qué versión es (1.0.0 = primera versión)
- **main**: Cuál es el archivo principal (index.js)
- **scripts**: Comandos especiales que puedes ejecutar
- **author**: Tu nombre (puedes agregarlo si quieres)

**No te preocupes por entender todo ahora**. Solo necesitas saber que este archivo existe.

---

## 6. Instalar tu Primera Herramienta (Práctica Opcional)

Vamos a instalar una herramienta llamada "chalk" que permite poner colores en el texto de la terminal.

**En PowerShell** (asegúrate de estar en la carpeta `mi-primer-node`):

```bash
npm install chalk
```

Verás que:
1. Se descargan cosas
2. Se crea una carpeta llamada `node_modules` (donde se guardan las herramientas)
3. Tu `package.json` ahora tiene una sección nueva llamada `"dependencies"`

**¿Qué pasó?**
- npm descargó la herramienta "chalk"
- La guardó en `node_modules`
- Actualizó `package.json` para recordar que usas chalk

**Dato importante:** La carpeta `node_modules` puede ser MUY grande. Nunca la subes a internet, por eso existe `package.json`, para que otros puedan descargar las mismas herramientas con `npm install`.

---

## ✅ Verificación del Día 2

Marca lo que completaste:

- [ ] Node.js instalado (puedo escribir `node --version`)
- [ ] npm instalado (puedo escribir `npm--version`)
- [ ] Creé mi carpeta "mi-primer-node"
- [ ] Creé el archivo index.js
- [ ] Ejecuté mi código con `node index.js` y funcionó
- [ ] Entiendo para qué sirve package.json (más o menos)
- [ ] (Opcional) Instalé chalk con npm

**Si marcaste la mayoría, ¡genial! 🎉 Ya puedes pasar al Día 3**

---

## 💡 Cosas Importantes para Recordar

- **node_modules**: Carpeta que guarda las herramientas instaladas (puede ser muy grande)
- **package.json**: Lista de herramientas que usa tu proyecto  
- **npm install**: Comando para descargar herramientas
- **node archivo.js**: Comando para ejecutar un archivo JavaScript

**Consejo**: No te preocupes si no entiendes todo. Lo importante es que Node.js funcione. Lo usarás mucho en los próximos días.

---

## 🚀 Próximo Día

**Día 3**: Instalaremos Docker (programa para crear "mini computadoras" virtuales)

Este día es un poco más largo, pero te guiaré paso a paso. ¡Nos vemos mañana!
