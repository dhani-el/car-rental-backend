require('dotenv').config()
const Express  = require("express");
const App = Express();
const mongoose = require("mongoose");
const Parser = require("body-parser");
const port = process.env.PORT || 3000;
const Path = require("path");

const DataRoute = require("./Routes/dataRoute");


mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection
db.once('open', function(){
    console.log("mongodb database is now online");
});


App.use(Parser.urlencoded({extended:false}));
App.use(Parser.json());
App.use("/data/api",DataRoute);
App.use(Express.static(Path.join(__dirname, '../Frontend/car-rental/dist')));

App.get("*",function(req,res){
    res.sendFile(Path.join(__dirname, '../Frontend/car-rental/dist/index.html'));
})

App.listen(port, function(){
    console.log("server online at port:", port);
});

process.on('SIGINT',function(){
    mongoose.connection.close();
    process.exit(0);
})