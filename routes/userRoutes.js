const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');

router.get('/user', authMiddleware, userController.getUser);
router.get('/users', authMiddleware, checkRole(['admin']), userController.getAllUsers);

module.exports = router;