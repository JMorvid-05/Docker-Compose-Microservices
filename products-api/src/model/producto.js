const {DataTypes}=require("sequelize");
const sequelize=require("../config/connection.js");

const producto= sequelize.define('producto',
    {
        codigo:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        nombre_producto:{
            type:DataTypes.STRING,
            allowNull: false
        },
        precio:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        stock:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
         

    },
    /*Hay un atributo que es timestamps que sequelize hace es crear dos columnas adicionales: createdAt, updateAt,
    por lo que en nuestro caso no lo necesitamos pero por defecto está en true */
    { sequelize, modelName: 'productos', timestamps: false }
);
module.exports=producto;