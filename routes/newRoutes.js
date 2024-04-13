const express = require('express');
const router = express.Router();
const controller = require('../controllers/newctrl.js');
const { isLoggedIn } = require('../middleware/auth.js');

//home page
router.get('/', isLoggedIn, controller.index);

module.exports = router;