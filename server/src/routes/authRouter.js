const express = require('express');
const router = express.Router();
const verify = require('../middleware/auth');

const authController = require('../app/controllers/authController');

router.post('/login', verify, authController.login);
router.post('/register',verify, authController.register);
router.post('/logout', verify, authController.logout);
router.get('/',verify,  authController.users);

module.exports = router;
