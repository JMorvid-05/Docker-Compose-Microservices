#la versión que se va a ejecutar debe ser 20-alpine de NodeJS, la más pequeña posible
FROM node:20-alpine
#la ruta de referencia cuando se usa run, cmd o copy
#/app/index.js
WORKDIR /app
#todo lo que se necesita para ejecutarse
COPY package.json ./
#instalar dependencias excepto las de desarrollo (devdependencies)
RUN npm install --omit=dev
#copiar el index.js que hay en mi entorno local al workdir 
#Estructura de copy: COPY <Origen (desde mi entorno de desarrollo)> <Destino (workdir, en este caso /app)>
COPY index.js ./

COPY src/ ./src/
#que puerto utilizará el contenedor
#nota, en run es puerto pc : puerto dentro del contenedor
EXPOSE 3002
#comando de inicio/ejecución
CMD ["node", "index.js"]