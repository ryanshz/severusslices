const express = require('express');
const router = express.Router();
const controller = require('../controllers/userctrl.js');

router.get('/signup', controller.signup);

router.post('/', controller.create);

router.get('/login', controller.login);

router.post('/login', controller.authenticate);

router.get('/logout', controller.logout);

router.get('/profile', controller.profile);

module.exports = router;