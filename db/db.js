const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Описание подключения к базе данных
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    mskdmasdas
  }
);

// Импортируем модель пользователя и инициализируем её
const UserModel = require('../models/User');
const User = UserModel(sequelize);

module.exports = {
  sequelize,
  User,
};
