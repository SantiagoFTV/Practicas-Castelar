# Día 2: Node.js y NPM

## Objetivos del Día
- Instalar Node.js y npm
- Entender qué es Node.js y para qué sirve
- Aprender a usar npm para gestionar dependencias

---

## 1. ¿Qué es Node.js?

Node.js es un entorno de ejecución de JavaScript del lado del servidor. Nos permite:
- Ejecutar JavaScript fuera del navegador
- Crear servidores web (backend)
- Gestionar paquetes y dependencias con npm

---

## 2. Instalación de Node.js

### Descargar Node.js
1. Ir a: https://nodejs.org/
2. Descargar la versión **LTS (Long Term Support)** - recomendada
3. Versión mínima recomendada: **Node.js 18.x o superior**

### Instalación
1. Ejecutar el instalador descargado
2. Seguir el asistente de instalación
3. Asegurarse de que la opción **"Automatically install necessary tools"** esté marcada

### Verificar la instalación
Abrir una **nueva** terminal PowerShell y ejecutar:
```bash
node --version
npm --version
```

Deberías ver algo como:
```
v20.x.x
10.x.x
```

---

## 3. Entendiendo NPM

**NPM (Node Package Manager)** es el gestor de paquetes de Node.js.

### ¿Para qué sirve?
- Instalar librerías y herramientas
- Gestionar dependencias del proyecto
- Ejecutar scripts de automatización

### Comandos básicos de NPM
```bash
# Ver la versión de npm
npm --version

# Inicializar un proyecto (crea package.json)
npm init

# Instalar una dependencia
npm install nombre-paquete

# Instalar todas las dependencias de un proyecto
npm install

# Ejecutar un script definido en package.json
npm run nombre-script
```

---

## 4. Práctica: Tu Primer Proyecto Node.js

### Crear un proyecto de prueba
```powershell
# Ir a tu carpeta de proyectos
cd C:\Users\TU_USUARIO\Desktop\Proyectos

# Crear una carpeta de prueba
mkdir prueba-nodejs
cd prueba-nodejs

# Inicializar un proyecto Node.js
npm init -y
```

Esto creará un archivo `package.json` con la configuración básica.

### Crear un archivo JavaScript simple
Crear un archivo `index.js` con el siguiente contenido:
```javascript
console.log("¡Hola desde Node.js!");
console.log("Node versión:", process.version);
```

### Ejecutar el archivo
```bash
node index.js
```

---

## 5. Entendiendo package.json

El archivo `package.json` es el corazón de cualquier proyecto Node.js:

```json
{
  "name": "prueba-nodejs",
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

### Campos importantes:
- **name**: Nombre del proyecto
- **version**: Versión actual
- **scripts**: Comandos personalizados que se pueden ejecutar con `npm run`
- **dependencies**: Paquetes necesarios para producción
- **devDependencies**: Paquetes solo para desarrollo

---

## 6. Instalando una Dependencia de Prueba

```bash
# Instalar un paquete popular (ejemplo: chalk para colores en terminal)
npm install chalk
```

Esto:
1. Descarga el paquete
2. Lo guarda en la carpeta `node_modules`
3. Lo añade a `package.json` en la sección `dependencies`
4. Crea un archivo `package-lock.json` (control de versiones de dependencias)

---

## ✅ Checklist del Día 2
- [ ] Node.js instalado (versión LTS)
- [ ] NPM instalado y funcionando
- [ ] Proyecto de prueba creado
- [ ] Archivo `package.json` entendido
- [ ] Primera dependencia instalada
- [ ] Primer script ejecutado con Node.js

---

## 📝 Notas Importantes
- **node_modules**: Nunca se sube a Git (es muy pesada)
- **package.json**: Define las dependencias del proyecto
- **package-lock.json**: Versiones exactas de cada dependencia

---

## 🎯 Próximo Día
**Día 3**: Instalación de Docker Desktop y conceptos básicos
