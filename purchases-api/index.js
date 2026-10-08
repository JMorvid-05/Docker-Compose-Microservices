require("dotenv").config();


const app = require("./src/app");
const db = require("./src/config/connection")
const PORT = process.env.PORT || 3002;

async function iniciar() {
  try {
    //Valida primero que la conexión a pg esté ok
    await db.authenticate();
    console.log("Conexión a la BD exitosa");
    // sincroniza modelos con datos; Además, si no hay tabla la crea, si hay cambios en la tabla (columnas)
    //las agrega y no borra datos ya que estén en persistencia
    await db.sync({
      alter: true
    });
    console.log("Sincronización exitosa entre modelos y BD");
    //arrancar sv http


    console.log("Antes del listen");
    app.listen(PORT, () => {
      console.log(`API corriendo en http://localhost:${PORT}`);

    })

    

  } catch (error) {
    console.error("Error iniciando la App:", error.message);
    process.exit(1);//esto es para que salga con error y docker lo pueda reiniciar
  }
}
iniciar();