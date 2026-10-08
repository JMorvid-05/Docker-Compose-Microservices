const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log("Petición recibida:", req.method, req.url);
    next();
});
//rutas

const rutasCompras = require("../src/routes/comprasroutes");

app.use('/compras', rutasCompras);

module.exports = app;
