require('dotenv').config()
const Express  = require("express");
const App = Express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000

App.get('/',function(req,res){
    res.send("data is coming")
})

App.listen(port, function(){
    console.log("server online at port:", port);
})