const { Sequelize } = require('sequelize');

//Описание подключения к базе данных
const sequelize = new Sequelize('nodejwt', 'postgres', 'root', { 
  host: 'localhost',
  dialect: 'postgres',
});
 
module.exports = sequelize;
  