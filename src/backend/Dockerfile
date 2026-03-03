FROM node:18-alpine

WORKDIR /app

# Copiar package.json
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]
