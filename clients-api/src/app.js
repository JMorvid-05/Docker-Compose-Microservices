const express = require("express");
const app = express();


app.use(express.json());

const clienteRoutes = require("./routes/clienteRoutes");
app.use("/clientes", clienteRoutes);

module.exports = app;