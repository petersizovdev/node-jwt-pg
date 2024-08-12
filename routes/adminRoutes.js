const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');

router.get('/admin-only', authMiddleware, checkRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome to the admin area' });
});

module.exports = router;