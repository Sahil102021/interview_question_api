const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        trim: true,
        required: true,

    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    date: {
        type: String,  // Changed from String to Date
        trim: true,
        required: true,

    },
    registered: {
        type: String,  // Changed from String to Number
        default: 0,

    }
}, { timestamps: true });

const Category = mongoose.model('banners', BannerSchema);
module.exports = Category;
