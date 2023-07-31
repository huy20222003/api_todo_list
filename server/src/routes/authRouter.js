const express = require('express');
const router = express.Router();
const verify = require('../middleware/auth');

const authController = require('../app/controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/', verify, authController.users);
router.post('/refresh', authController.refreshToken);

module.exports = router;
