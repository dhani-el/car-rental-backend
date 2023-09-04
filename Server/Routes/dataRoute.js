const express = require("express")
const route = express.Router();
const CAR_DB = require("../Schemas/CarsSchema");
const BRAND_DB = require("../Schemas/BrandSchema");
const {upload,randomName,fromS3,deleteFromS3, toS3} = require('../Utils/ImageUtils');


route.get("/brands", async function(req,res){
    const data = await BRAND_DB.find();
    res.json(data);
});

route.get("/brand/:brand", async function(req,res){
    const data = await BRAND_DB.findOne().where("name").equals(req.params.brand)
    res.json(data);
});

route.get("/cars/all", async function(req,res){
    const data = await CAR_DB.find().select('-address -meters -featureDescription -featureIcon');
    res.json(data);
});

route.get("/cars/:brand", async function(req,res){
    const data = await CAR_DB.find().where("brand").equals(req.params.brand).select('-address -meters -featureDescription -featureIcon');
    res.json(data);
});

route.get("/car/:id", async function(req,res){
    const data = await CAR_DB.findOne().where("_id").equals(req.params.id);
    res.json(data);
});

route.post("/brand", upload.single("image"), async function(req,res){
    const logoName  = randomName();
    const buffer = req.file.buffer;
    const mimetype = req.file.mimetype;
    if(!buffer){
        console.log("no buffer");
    return res.send("no buffer")
}
    await toS3(logoName,buffer, mimetype);
    await BRAND_DB.create({name:req.body.name ?? "N/A",
                            logo:logoName ?? "N/A"
    });
    res.send('data has been entered')
});

route.post("/car", upload.single("image"), async function(req,res){
    const name  = randomName();
    const buffer = req.file.buffer;
    const mimetype = req.file.mimetype;
    await toS3(name,buffer, mimetype);
    const body = req.body
    await  CAR_DB.create({brand:req.body?.brand,
                     name:body?.name,
                     image:name,
                     year:body?.year,
                     price:body?.price,
                     address:body?.address,
                     meters:body.meters,
                     featureIcon:body.featureIcon,
                     featureDescription: body.featureDescription});
    res.send('data has been entered')
})

route.delete('/car/:carid/:carImage',async function(req,res){
    await deleteFromS3(req.body.imageUrl);
    await CAR_DB.deleteOne().where("_id").equals(req.body.id);
    res.send("car deleted");
})

route.delete('/brand/:brandImage',async function(req,res){
    console.log(req.params.brandImage);
    await deleteFromS3(req.params.brandImage);
    await BRAND_DB.deleteOne().where("name").equals(req.params.brandImage);
    res.send("brand deleted");
})

route.delete('/car/:carImage',async function(req,res){
    console.log(req.params.carImage);
    await deleteFromS3(req.params.carImage);
    await CAR_DB.deleteOne().where("image").equals(req.params.carImage);
    res.send("brand deleted");
})


module.exports = route
