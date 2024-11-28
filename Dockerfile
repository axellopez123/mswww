# Usamos la imagen de Node para crear el build
FROM node:18-alpine as build

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiar los archivos del frontend
COPY . /app/

# Instalar dependencias
RUN npm install

# Construir el proyecto React para producción
RUN npm run build

# Usamos una imagen de Nginx para servir la aplicación compilada
FROM nginx:alpine

# Copiar los archivos estáticos generados a la carpeta de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80
