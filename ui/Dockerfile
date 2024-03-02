# Establece la imagen base
FROM node:lts-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación
COPY . .

# Instala las dependencias
RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "dev", "--host" ]