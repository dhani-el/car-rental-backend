const express = require("express")
const route = express.Router();




route.get("/:model",function(req,res){
    res.send("data is coming to your location")
});





module.exports = route
