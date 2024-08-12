const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../db/db');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  try {
    console.log('Received data:', req.body); // Логирование данных формы
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ username, email, password: hashPassword });

    const roleName = role === 'admin' ? 'admin' : 'user';
    const [roleInstance] = await Role.findOrCreate({ where: { name: roleName } });

    await user.setRole(roleInstance);

    res.status(201).json({ message: 'User has been created', user });
  } catch (err) {
    console.error('Error during registration:', err); // Логирование ошибки
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, include: Role });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    //access-toketn, refresh-toketn generation
    const accessToken = jwt.sign({ userId: user.id, role:user.Role.name }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });

    user.refreshToken = refreshToken;
    await user.save();
    
    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

//Обработчик для обновления токенов
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body; // Извлекаем refreshToken из тела запроса

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({ where: { id: decoded.userId, refreshToken }, include: Role }); // Поиск пользователя по ID и refreshToken

    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = jwt.sign({ userId: user.id, role:user.Role.name }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Генерируем новый accessToken
    });

    const newRefreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '7d', // Генерируем новый refreshToken
    });

    user.refreshToken = newRefreshToken; // Обновляем refreshToken
    await user.save(); // Сохраняем обновленный refreshToken в базе данных

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Refresh token expired' });
    }
    next(err);
  }
};
