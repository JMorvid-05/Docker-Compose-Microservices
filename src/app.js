const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log("Petición recibida:", req.method, req.url);
    next();
});
//rutas

const rutasProductos = require("../src/routes/productos.routes");

app.use('/productos', rutasProductos);

module.exports = app;
