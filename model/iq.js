let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let IqSchema = new Schema({
  question: {
    type: String,
    trim: true,
  },
  answer: {
    type: String,
    trim: true,
  },
  photos: {
    type: String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categorys",
    required : true
  }
});

let IQ = mongoose.model("iqs", IqSchema);
module.exports = IQ;
