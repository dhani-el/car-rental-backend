const mongoose  = require("mongoose");


const dataSchema = new mongoose.Schema({
   brand:{
        type : String,
        required: true
    },
   name:{
    type: String,
    required: true
    },
    image:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    }
});

const dataModel = new mongoose.model("DATA-MODEL", dataSchema);
module.exports = dataModel;