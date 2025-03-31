# Usar una imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de definición de dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto del código de la app
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
