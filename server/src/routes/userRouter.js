const express = require('express');
const router = express.Router();
const verify = require('../middleware/auth');

const userController = require('../app/controllers/userController');

router.put('/password/update', verify, userController.update_password);
router.post('/password/forgot-password', userController.forgotPassword);
router.post('/password/reset-password', userController.resetPassword);


module.exports = router;
