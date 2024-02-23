const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemctrl.js');

//home page
router.get('/', controller.index);

//view item
router.get('/:id', controller.show);

module.exports = router;