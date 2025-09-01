const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// 회원 기능
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
