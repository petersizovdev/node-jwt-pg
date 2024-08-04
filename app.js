const express = require('express');
const { sequelize } = require('./db/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Urlencoded данных формы
app.use(express.static('public')); // Настройка статических файлов

// Подключение маршрутов
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', authRoutes);
app.use('/', userRoutes);

// Централизованная обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

sequelize
  .sync()
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log(`Database connection error: ${err.message}`);
  });
