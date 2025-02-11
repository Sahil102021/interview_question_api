let BANNER = require("../model/banner");
let cloudinary = require("../utiles/cloudinary");

exports.Create = async function (req, res) {
  try {
    let { name, image, title , date , registered  } = req.body;
    // console.log('hello');
    console.log(req.file);

    if (!title || !name)
      throw new Error("Please name or title, !");

    // Map through the files and upload each one to Cloudinary

    let imagePath = await cloudinary.uploader.upload(req.file.path);
    req.body.image  = imagePath.secure_url;
    console.log(imagePath);
    let BannerData = await BANNER.create(req.body);

    res.status(201).json({
      status: "Success",
      message: "Successfully created Banner Data",
      data: BannerData,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};


exports.Read = async function (req, res) {
    try {
      let BannerData = await BANNER.find();
      res.status(201).json({
        status: "Success",
        message: "Successfully Ready Banner",
        data: BannerData,
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };


  
exports.Delete = async function(req , res ,next) {
    try {
      let id1 = req.params.id ;
      let BannerData = await BANNER.findByIdAndDelete(id1);
      console.log(BannerData);
      res.status(201).json({
        status: "Success",
        message: "Successfully Delete  Banner",
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  }
  

  

exports.Update = async function(req, res, next) {
    try {
        console.log('hello')
      let id1 = req.params.id;
      let imagePath = await cloudinary.uploader.upload(req.file.path);
      req.body.image  = imagePath.secure_url;
      console.log(imagePath);
      let BannerData = await BANNER.findByIdAndUpdate(id1, req.body, {new: true});
      console.log(BannerData);
      res.status(201).json({
        data: BannerData,
        status: "Success",
        message: "Successfully updated Banner",
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };