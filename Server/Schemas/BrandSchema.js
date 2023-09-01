const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    logo:{
        type:String,
        required: true
    }
});