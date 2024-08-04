const User = require('../models/User');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.userId } });
    res.json(user);
  } catch (err) {
    console.log('Get user error: ', err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log('Get users error: ', err);
  }
};