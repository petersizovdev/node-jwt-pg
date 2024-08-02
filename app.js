const express = require('express');
const sequelize = require('./db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const User = require('./models/User')(sequelize);

//Инициализируем приложение
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); //Запускаем сервер, прослушиваем порт PORT из файла окружения .env
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

sequelize
  .sync() //Синхронизируем базу данных
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log(`Connection error: ${err.message}`);
  });

app.use(express.json());

//User reg
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body; //Получаем данные из формы
    const hashPassword = await bcrypt.hash(password, 8); //Хешируем пароль 8 раз
    const user = await User.create({ username, email, password: hashPassword }); //Обращаемся к sequelize модели пользователя для создания
    res.status(201).json({ message: 'User has been created', user }); //Код 201 - успешное создание
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', err });
  }
});

//User login
app.post('/login', async (req, res) => {
  try {
	const { username, email, password } = req.body;
    const user = await User.findOne({ where: { email } }); //Поиск пользователя по уникальному email

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); //Ненаход - 404
    }
    const isPasswordValid = await bcrypt.compare(password, user.password); //Сравниваем пароли

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' }); //Неверный пароль - 400
    }
    //Генерируем токен
    const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', {
      expiresIn: '1h',
    });
    res.json({ token }); //Возвращаем токен
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', err });
    console.log('Login error: ', err);
  }
});

//Verify token (Middleware)
function verifyToken(req, res, next) {
  const token = req.headers.authorization; //Получаем токен
  if (!token) {
    return res.status(401).json({ message: 'Access denied' }); //Не авторизованный токен - 401
  }
  try {
    const decode = jwt.verify(token.split(' ')[1], 'SECRET_KEY'); //Декодируем токен
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' }); //Невалидный токен - 400
    console.err('Error verify token: ', err);
  }
}

//Get user
app.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.userId } }); //Поиск пользователя по id
    res.json(user);
  } catch (err) {
    console.log('Get user error: ', err);
  }
});

//Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll(); //Получаем всеx пользователей
    res.json(users);
  } catch (err) {
    console.log('Get users error: ', err);
  }
});
