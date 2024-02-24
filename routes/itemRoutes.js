const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemctrl.js');
const upload = require('../middleware/multer.js');

//home page
router.get('/', controller.index);

//search item
router.get('/search', controller.search);

//view item
router.get('/:id', controller.show);

//add item
router.post('/', upload, controller.create);

//edit item
router.get('/:id/edit', controller.edit);

//update edited item
router.put('/:id', upload, controller.update);

//delete item
router.delete('/:id', controller.delete);

module.exports = router;