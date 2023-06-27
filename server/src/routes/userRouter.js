const express = require('express');
const router = express.Router();
const verify = require('../middleware/auth');

const userController = require('../app/controllers/userController');

router.put('/password/update', verify, userController.update_password);

module.exports = router;
