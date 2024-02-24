const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemctrl.js');
const multer = require('multer');
const upload = multer({dest: 'public/images/uploads/'});

//home page
router.get('/', controller.index);

//search item
router.get('/search', controller.search);

//view item
router.get('/:id', controller.show);

//add item
router.post('/', upload.single('file'), controller.create);

//edit item
router.get('/:id/edit', controller.edit);

//update edited item
router.put('/:id', controller.update);

//delete item
router.delete('/:id', controller.delete);

module.exports = router;