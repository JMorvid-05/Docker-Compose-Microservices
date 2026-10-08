const {Sequelize} = require('sequelize');
require("dotenv").config();


const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
    host: process.env.HOST,
    port: process.env.PORT_DB,
    dialect: 'postgres',
    logging: false // si es true es para ver el SQL generado de sequelize
    }
    
)


module.exports = sequelize;