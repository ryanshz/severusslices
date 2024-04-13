const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemctrl.js');
const upload = require('../middleware/multer.js');
const { isLoggedIn, isAuthor, validateId } = require('../middleware/auth.js');

//home page
router.get('/', controller.index);

//search item
router.get('/search', controller.search);

//view item
router.get('/:id', validateId, controller.show);

//add item
router.post('/', isLoggedIn, upload, controller.create);

//edit item
router.get('/:id/edit', isLoggedIn, validateId, isAuthor, controller.edit);

//update edited item
router.put('/:id', isLoggedIn, validateId, isAuthor, upload, controller.update);

//delete item
router.delete('/:id', isLoggedIn, validateId, isAuthor, controller.delete);

module.exports = router;