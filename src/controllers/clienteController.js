const cliente = require("../models/cliente");

// GET /clientes
const obtenerTodos = async(req,res) =>{
    try{
        const clientes = await cliente.findAll();
        res.json(clientes);
    }catch{
        res.status(500).json({ error: 'Error al obtener los clientes', detalle: error.message });
    }
}

// GET /clientes/:id
const obtenerUno = async(req, res)=>{
    try{
        const clienteEncontrado = await cliente.findByPk(req.params.id);
        if(!clienteEncontrado){
            return res.status(404).json({error: 'Cliente no encontrado'});
        }
        res.json(clienteEncontrado);
    }catch(error){
        res.status(500).json({ error: 'Error al obtener el cliente', detalle: error.message });
    }
}


// POST /clientes
const crear = async(req,res) =>{
    try{
        const { cedula, nombre, email } = req.body;
        const nombre_cliente = nombre;
        if(!cedula){
            return res.status(400).json({error: 'El campo cedula es obligatorio'});
        }
        if(!nombre){
            return res.status(400).json({error: 'El campo nombre es obligatorio'});
        }
        if(!email){
            return res.status(400).json({error: 'El campo email es obligatorio'});
        }
        const nuevoCliente = await cliente.create({cedula, nombre_cliente, email});
        res.status(201).json(nuevoCliente);
    }catch(error){
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: `Ya existe un cliente con cedula ${req.body.cedula}` });
        }
        res.status(500).json({ error: 'Error al crear el cliente', detalle: error.message });
    }
}

// PUT 
const actualizar = async(req,res) =>{
    try{
        const clienteEncontrado = await cliente.findByPk(req.params.id);
        if(!clienteEncontrado){
            return res.status(404).json({error: 'Cliente no encontrado'});
        }
        const { nombre, email } = req.body;
        await clienteEncontrado.update({nombre_cliente: nombre, email});
        res.json(clienteEncontrado);
    }catch(error){
        res.status(500).json({ error: 'Error al actualizar el cliente', detalle: error.message });
    }
}


// DELETE /clientes/:id
const eliminar = async(req,res) =>{
    try{
        const clienteEncontrado = await cliente.findByPk(req.params.id);
        if(!clienteEncontrado){
            return res.status(404).json({error: 'Cliente no encontrado'});
        }
        await clienteEncontrado.destroy();
        res.json({ mensaje: 'Cliente eliminado', eliminado: clienteEncontrado });
    }catch(error){
        res.status(500).json({ error: 'Error al eliminar el cliente', detalle: error.message });
    }
}

module.exports = { obtenerTodos, obtenerUno, crear, actualizar, eliminar};