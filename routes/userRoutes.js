const express = require('express');
const router = express.Router();
const controller = require('../controllers/userctrl.js');
const { isGuest, isLoggedIn } = require('../middleware/auth.js');

router.get('/signup', isGuest, controller.signup);

router.post('/', isGuest, controller.create);

router.get('/login', isGuest, controller.login);

router.post('/login', isGuest, controller.authenticate);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;