const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  saveOne,
  modifyOne,
  deleteOne
} = require("../controllers/productoController")


// GET /productos
router.get("/", getAll );
// GET /productos/:id
router.get("/:id",getOne);
// POST /productos
router.post("/",saveOne );
//PUT 
router.put("/:id", modifyOne);
//  DELETE /productos/:id
router.delete("/:id",deleteOne );

module.exports = router;    