const IQ = require("../model/iq");
let cloudinary = require('../utiles/cloudinary')
exports.Create = async function (req, res) {
  try {
    let { question, answer, photos } = req.body;

    console.log(req.files); 
    
    if (!question || !answer)
      throw new Error("Please provide question, answer, or photos!");

    // Map through the files and upload each one to Cloudinary
    let photosPath = req.files.map((el) => el.path); 

    const uploadPromises = photosPath.map(async (filePath) => {
      const uploadResponse = await cloudinary.uploader.upload(filePath);
      return uploadResponse.secure_url; // Return the Cloudinary URL
    });

    const photoUrls = await Promise.all(uploadPromises);

    // Store the Cloudinary URLs in the request body
    req.body.photos = photoUrls;

    let IQData = await IQ.create(req.body);

    res.status(201).json({
      status: "Success",
      message: "Successfully created interview Question",
      data: IQData,
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
      let categoryData = await CATEGORY.find({user : req.user});
      res.status(201).json({
        status: "Success",
        message: "Successfully Ready category",
        data: categoryData,
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
    let categoryDelete = await CATEGORY.findByIdAndDelete({_id : id1 , user : req.user});
    console.log(categoryDelete);
    res.status(201).json({
      status: "Success",
      message: "Successfully Delete category",
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
    let id1 = req.params.id;
    let categoryUpdate = await CATEGORY.findByIdAndUpdate(id1, req.body, {new: true});
    console.log(categoryUpdate);
    res.status(201).json({
      data: categoryUpdate,
      status: "Success",
      message: "Successfully updated category",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};


