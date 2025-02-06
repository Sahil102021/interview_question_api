const CATEGORY = require("../model/category");

exports.Create = async function (req, res) {
  try {
    let { name, description } = req.body;

    if (!name) throw new Error('Please provide category name');

    req.body.user = req.user;
    let categoryData = await CATEGORY.create(req.body);

    res.status(201).json({
      status: "Success",
      message: "Successfully created category",
      data: categoryData,
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


