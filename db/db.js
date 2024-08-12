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
  }
);

// Импортируем модель пользователя и инициализируем её
const UserModel = require('../models/User');
const User = UserModel(sequelize);
const RoleModel = require('../models/Role');
const Role = RoleModel(sequelize);

User.belongsTo(Role);
Role.hasMany(User);

module.exports = {
  sequelize,
  User,
  Role
};
