require('dotenv').config()
const Express  = require("express");
const App = Express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

const DataRoute = require("./Routes/dataRoute");




App.use("/data/api",DataRoute);

App.listen(port, function(){
    console.log("server online at port:", port);
})