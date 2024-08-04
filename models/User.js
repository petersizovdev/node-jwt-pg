const { Sequelize, DataTypes } = require('sequelize');

// Модель пользователя
module.exports = (sequelize) => {
  const User = sequelize.define(
    'User', 
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
    }
  );
  return User;
};
