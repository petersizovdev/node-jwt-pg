const express = require('express');
const sequelize = require('./db/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Подключение маршрутов
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', authRoutes);
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

sequelize
  .sync()
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log(`Connection error: ${err.message}`);
  });