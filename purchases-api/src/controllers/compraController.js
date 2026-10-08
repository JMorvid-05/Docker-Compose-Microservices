
const compra = require("../model/compra");
const { Op } = require("sequelize");
const { obtenerProducto } = require("../services/productoService");
const { obtenerCliente } = require("../services/clienteService")
//get todas las compras
const getTodasCompra = async (req, res) => {

    try {
        const compras = await compra.findAll();
        res.json(compras);
    } catch (error) {
        res.status(500).json({
            error: "Error obteniendo todas las compras",
            detalle: error.message
        });
    }

}
//obtener una compra
const getUnaCompra = async (req, res) => {
    productoBusqueda = await obtenerProducto(req.params.id);
    producto = productoBusqueda?.[0];
    console.log(producto);
    try {
        const resultado = compra.findByPK(req.params.id)
        if (!resultado) {
            res.status(404).json({
                error: "No se encontró ninguna compra con ese id"
            });

        }
        res.json(resultado);
    } catch (error) {
        res.status(500).json({
            error: "Error al realizar la consulta",
            detalle: error.message
        });
    }
}
//post- agregar compra
const guardarCompra = async (req, res) => {
    const { id_cliente, id_producto, cantidad } = req.body;

    if (!id_cliente || !id_producto || !cantidad) {
        return res.status(400).json({
            mensaje: "Los campos 'clienteId', 'productoId' y 'cantidad' son obligatorios"
        });
    }
    let clienteBusqueda;
    let productoBusqueda;
    try {
        clienteBusqueda = await obtenerCliente(id_cliente);
        productoBusqueda = await obtenerProducto(id_producto);

    } catch (error) {
        return res.status(503).json({
            mensaje: "no se pudo validar la compra debido al fallo de comunicaciones no respondió",
            detalle: error.message
        });
    }
    if (!clienteBusqueda) {
        return res.status(404).json({
            mensaje: `El cliente ${id_cliente} no existe`
        });
    }
    if (!productoBusqueda) {
        return res.status(404).json({
            mensaje: `El producto ${id_producto} no existe`
        });
    }
    if (parseInt(productoBusqueda.stock, 10) < cantidad) {
        return res.status(400).json({
            mensaje: `Stock insuficiente. Disponible: ${productoBusqueda.stock}, solicitado: ${cantidad}`
        });
    }

    try {

        const total = parseInt(productoBusqueda.precio, 10) * parseInt(cantidad, 10);
        const nuevo = await compra.create({ id_cliente, id_producto, cantidad: parseInt(cantidad, 10), total });
        res.status(201).json({ mensaje: "compra agregada a la base de datos", agregado: nuevo });

    } catch (error) {
        return res.status(500).json({
            mensaje: "error al guardar la compra",
            detalle: error.message
        });
    }
}
//PUT compra
const modificarCompra = async (req, res) => {
    const { idCliente, idProducto, fechaCompra } = req.query;
    const { cantidad } = req.body;
    if (!idCliente || !idProducto || !fechaCompra || !cantidad) {
        res.status(400).json({
            error: "Se debe tener todos los campos para realizar la petición"
        })
    }

    try {
        productoBusqueda = await obtenerProducto(idProducto);
        if (!productoBusqueda) {
            return res.status(404).json({
                mensaje: `El producto ${idProducto} no existe`
            });
        }
        const fecha = new Date(fechaCompra);
        if (isNaN(fecha.getTime())) {
            return res.status(400).json({ message: "fecha_compra inválida, usa formato ISO" });
        }

        // ventana de +-1 seg para absorber ms/microsegundos + timezone
        const inicio = new Date(fecha.getTime() - 1000);
        const fin = new Date(fecha.getTime() + 1000);
        const busqueda = await compra.findOne({
            where: {
                //acá son las variables de la bd, les puse esos nombres a las columnas
                fechacreacion: { [Op.between]: [inicio, fin] },
                id_cliente: idCliente,
                id_producto: idProducto,
            }
        });
        if (!busqueda) {
            return res.status(404).json({
                mensaje: "No existe una compra con esos datos"
            });
        }
        const total = parseInt(productoBusqueda.precio, 10) * parseInt(cantidad, 10);
        await busqueda.update({ cantidad, total });
        return res.status(204);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error realizando la solicitud",
            detalle: error.message
        });
    }

}
const eliminarCompra = async (req, res) => {
    const { idCliente, idProducto, fechaCompra } = req.query;
    if (!cliente_id || producto_id || fecha_compra) {
        res.status(400).json({
            error: "Faltan valores para realizar la petición"
        });
    }

    try {
        const busqueda = await compra.findOne({
            where: {

                fechacreacion: fechaCompra,
                id_cliente: idCliente,
                id_producto: idProducto,
            }
        });

        if (!busqueda) {
            return res.status(404).json({
                error: "No se encontró una compra con ese id"
            });
        }
        await busqueda.destroy();
        res.json({
            Mensaje: "Compra eliminada",
            eliminado: busqueda
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error realizando la petición",
            detalle: error.message
        });
    }

}
module.exports = {
    getTodasCompra,
    getUnaCompra,
    guardarCompra,
    modificarCompra,
    eliminarCompra
}

