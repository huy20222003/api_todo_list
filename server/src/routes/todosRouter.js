const express = require('express');
const router = express.Router();
const verify = require('../middleware/auth');

const todosControllers = require('../app/controllers/todosControllers');

router.get('/all', verify, todosControllers.all);
router.post('/create', verify, todosControllers.create);
router.put('/edit/:_id', verify, todosControllers.edit);
router.delete('/delete/:_id', verify, todosControllers.delete);
router.get('/search', verify, todosControllers.search);
router.get('/filter', verify, todosControllers.filter);

module.exports = router;
