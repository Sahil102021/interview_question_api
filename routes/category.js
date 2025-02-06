var express = require('express');
var router = express.Router();
var catagoryController = require('../controller/category')
let userController = require('../controller/users')

/* GET users listing. */
router.post('/', userController.Secure , catagoryController.Create  );
router.get('/', userController.Secure , catagoryController.Read  );
router.delete('/delete/:id', userController.Secure , catagoryController.Delete );
router.patch('/update/:id', userController.Secure , catagoryController.Update );


module.exports = router;
