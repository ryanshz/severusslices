const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemctrl.js');
const multer = require('multer');
const upload = multer({dest: 'public/images/uploads/'});

//home page
router.get('/', controller.index);

//view item
router.get('/:id', controller.show);

//add item
router.post('/', upload.single('file'), controller.create);

module.exports = router;