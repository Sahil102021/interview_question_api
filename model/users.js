let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    fristname : {
        type : String,
        trim : true,
    },
    lastname : {
        type : String,
        tirm : true,
    },
    contact : {
        type : Number,
        trim : true,
        required : true,
        unique : true 
    },
    username : {
        type : String,
        trim : true,
    },
    email : {
        type :String,
        trim : true,
        required : [true , "please enter email"],
        unique : true
    },
    password : {
        type : String,
        required : [true , "please enter password"]
    }
});

let USER = mongoose.model('users',userSchema);
module.exports = USER;