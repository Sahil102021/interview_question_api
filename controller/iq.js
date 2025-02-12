const IQ = require("../model/iq");
let cloudinary = require("../utiles/cloudinary");
exports.Create = async function (req, res) {
  try {
    let { question, answer, photos } = req.body;

    // console.log(req.file);

    if (!question || !answer) {
      throw new Error("Please provide question and answer!");
    }

    // Check if photos exist in the request
    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path);
      const photoUrls = uploadResponse.secure_url; 

      req.body.photos = photoUrls;
    } else {
      req.body.photos = null;
    }

    let IQData = await IQ.create(req.body);

    res.status(201).json({
      status: "Success",
      message: "Successfully created interview Question",
      data: IQData,
    });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.Read = async function (req, res) {
  try {
    let IqData = await IQ.find().populate("categoryId");
    res.status(201).json({
      status: "Success",
      message: "Successfully Ready interview question",
      data: IqData,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.Search = async function (req, res, next) {
  try {
    //let searchQuery = req.query.Search ? req.query.Search.trim() : ""; // Trim input
    let searchData;

    if (req.query.Search) {
      searchData = await IQ.find({
        $or: [
          { name: { $regex: req.query.Search, $options: "i" } },
          { answer: { $regex: req.query.Search, $options: "i" } },
        ],
      })
        .populate("categoryId")
        .lean(); // Use lean() for better performance
    } else {
      searchData = await IQ.find().populate("categoryId");
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully retrieved interview questions",
      data: searchData,
    });
  } catch (error) {
    console.error("Search Error:", error); // Log errors for debugging

    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.Delete = async function (req, res, next) {
  try {
    let id1 = req.params.id;
    let iqDelete = await IQ.findByIdAndDelete({ _id: id1 });
    console.log(iqDelete);
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
};

exports.Update = async function (req, res, next) {
  try {
    let id1 = req.params.id;
    let IqData = await IQ.findByIdAndUpdate(id1, req.body, { new: true });
    console.log(IqData);
    res.status(201).json({
      data: IqData,
      status: "Success",
      message: "Successfully updated interview question",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};
