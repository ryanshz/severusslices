const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/offerctrl.js');
const { isLoggedIn, isAuthor, validateId, isSeller } = require('../middleware/auth.js');
const { body } = require('express-validator');

//view all offers
router.get('/', isLoggedIn, isAuthor, controller.index);

//make an offer
router.get('/new', isLoggedIn, isSeller, controller.new);

//post offer request
router.post('/', isLoggedIn, controller.create);

//accept an offer
router.post('/:offerId/accept', isLoggedIn, isAuthor, validateId, controller.accept);

module.exports = router;