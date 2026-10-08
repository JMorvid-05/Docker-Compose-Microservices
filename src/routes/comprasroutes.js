const express = require("express");
const router = express.Router();
const {
  getTodasCompra,
  getUnaCompra,
  guardarCompra,
  modificarCompra,
  eliminarCompra
} = require("../controllers/compraController")


// GET 
router.get("/", getTodasCompra );
// GET 
router.get("/:id",getUnaCompra);
// POST 
router.post("/",guardarCompra );
//PUT 
router.put("/", modificarCompra);
//  DELETE 
router.delete("/:id",eliminarCompra );

module.exports = router;    