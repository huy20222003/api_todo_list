const express = require('express');
const router = express.Router();
const verify = require('../middleware/auth');

const labelController = require('../app/controllers/labelController');

router.get('/all', verify, labelController.all);
router.post('/create', verify, labelController.create);
router.put('/edit/:_id', verify, labelController.edit);
router.delete('/delete/:_id', verify, labelController.delete);
router.get('/search', verify, labelController.search);

module.exports = router;
