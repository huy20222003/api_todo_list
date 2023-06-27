const express = require('express');
const router = express.Router();
const verify = require('../middleware/auth');

const authController = require('../app/controllers/todosControllers');

router.get('/all', verify,  authController.all);
router.post('/create', verify,  authController.create);
router.put('/edit/:_id', verify,  authController.edit);
router.delete('/delete/:_id', verify,  authController.delete);
router.post('/search', verify,  authController.search);


module.exports = router;
