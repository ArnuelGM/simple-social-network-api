# Utiliza una imagen de Node.js como base
FROM node:lts-alpine as build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación
COPY package*.json .

# Instala las dependencias
RUN npm install

FROM node:lts-alpine

WORKDIR /app

COPY --from=build /app/node_modules node_modules

COPY . .

# Expone el puerto en el que se ejecuta la aplicación NestJS
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:dev"]