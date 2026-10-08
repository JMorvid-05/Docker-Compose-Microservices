const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {

    cedula: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre_cliente:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(100),
        unique: true
    }
},{
    tableName: 'clientes',
    timestamps: false
});

module.exports = Cliente;