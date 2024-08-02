const { Sequelize, DataTypes } = require('sequelize');

// Модель пользователя
module.exports = function (sequelize) {
  const User = sequelize.define(
    'users',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

  );
  return User;
};