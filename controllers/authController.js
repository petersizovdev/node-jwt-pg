const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/db');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res, next) => {
  try {
    console.log('Received data:', req.body); // Логирование данных формы
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ username, email, password: hashPassword });
    res.status(201).json({ message: 'User has been created', user });
  } catch (err) {
    console.error('Error during registration:', err); // Логирование ошибки
    next(err);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
