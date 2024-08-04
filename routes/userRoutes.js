const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/user', authMiddleware, userController.getUser);
router.get('/users', userController.getAllUsers);

module.exports = router;