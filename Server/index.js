require('dotenv').config()
const Express  = require("express");
const App = Express();
const mongoose = require("mongoose");
const Parser = require("body-parser");
const port = process.env.PORT || 3000;

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

App.listen(port, function(){
    console.log("server online at port:", port);
});

process.on('SIGINT',function(){
    mongoose.connection.close();
    process.exit(0);
})