const express = require("express")
const route = express.Router();
const CAR_DB = require("../Schemas/CarsSchema");
const BRAND_DB = require("../Schemas/BrandSchema");




route.get("/brands", async function(req,res){
    const data = await BRAND_DB.find();
    res.json(data);
});

route.get("/brand/:brand", async function(req,res){
    const data = await BRAND_DB.findOne().where("name").equals(req.params.brand)
    res.json(data);
});

route.get("/cars/all", async function(req,res){
    const data = await CAR_DB.find();
    res.json(data);
});

route.get("/cars/:brand", async function(req,res){
    const data = await CAR_DB.find().where("brand").equals(req.params.brand);
    res.json(data);
});

route.get("/car/:id", async function(req,res){
    const data = await CAR_DB.find().where("id").equals(req.params.id);
    res.json(data);
});

route.post("/brand", async function(req,res){
    const data = await BRAND_DB.create({name:req.body?.name ?? "N/A",
                                        logo:req.body?.logo ?? "N/A"
    });
    res.json(data)
});

route.post("/car", async function(req,res){
    await DB.create({brand:req.body?.brand,
                     name:req.body?.name,
                     image:req.body?.image,
                     year:req.body?.year,
                     price:req.body?.price});
    res.send("data was saved");
})





module.exports = route
