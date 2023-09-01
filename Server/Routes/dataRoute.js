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
    const data = await CAR_DB.findOne().where("_id").equals(req.params.id);
    res.json(data);
});

route.post("/brand", async function(req,res){
    const data = await BRAND_DB.create({name:req.body?.name ?? "N/A",
                                        logo:req.body?.logo ?? "N/A"
    });
    res.send('data has been entered')
});

route.post("/car", async function(req,res){
    console.log(req.body);
    const body = req.body
    await  CAR_DB.create({brand:req.body?.brand,
                     name:body?.name,
                     image:body?.image,
                     year:body?.year,
                     price:body?.price,
                     address:body?.address,
                     meters:body.meters,
                     featureIcon:body.featureIcon,
                     featureDescription: body.featureDescription});
    res.send('data has been entered')
})





module.exports = route
