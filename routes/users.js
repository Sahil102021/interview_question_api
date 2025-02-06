var express = require('express');
var router = express.Router();
var userController = require('../controller/users')

/* GET users listing. */
router.post('/signup', userController.Signup );
router.post('/login', userController.Login );

module.exports = router;
