const express = require('express');
const router = express.Router();
const verify = require('../middleware/auth');

const userController = require('../app/controllers/userController');

router.put('/password/update', verify, userController.update_password);
router.post('/send-code', userController.sendCode);
router.post('/verify-code', userController.verifyCode);
router.post('/password/reset-password', userController.resetPassword);
router.put('/profile/update', verify, userController.updateUserInfo);
router.patch('/upload-avatar',verify, userController.uploadFile);

module.exports = router;
