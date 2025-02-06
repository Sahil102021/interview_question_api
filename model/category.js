let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let catagorySchema = new Schema({
    name : {
        type : String,
        trim : true,
        unique : true 
    },
    discription : {
        type : String,
        tirm : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }
});

let CATAGORY = mongoose.model('categorys',catagorySchema);
module.exports = CATAGORY;