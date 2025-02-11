var express = require('express');
var router = express.Router();
var BannerController = require('../controller/banner');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


/* GET users listing. */
router.post('/' ,upload.single('image'), BannerController.Create  );
router.get('/', BannerController.Read  );
router.delete('/delete/:id', BannerController.Delete );
router.patch('/update/:id',upload.single('image'), BannerController.Update );



module.exports = router;
