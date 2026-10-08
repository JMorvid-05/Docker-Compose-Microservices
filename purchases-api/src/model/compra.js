const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const compra = sequelize.define('compra',
    {

        id_cliente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_producto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },
    /*Hay un atributo que es timestamps que sequelize hace es crear dos columnas adicionales: createdAt, updateAt,
    por lo que en nuestro caso no lo necesitamos pero por defecto está en true */
    {
        sequelize, modelName: 'compras',
        timestamps: true,
        createdAt: 'fechacreacion',
        updatedAt: false
    });
module.exports = compra;