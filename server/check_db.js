import mongoose from 'mongoose';
import ProductModel from './models/Product.js';

const conStr = "mongodb+srv://ahmed:ahmed@cakegallery.nthfzlv.mongodb.net/";

mongoose.connect(conStr)
    .then(async () => {
        console.log("Connected to DB");
        const count = await ProductModel.countDocuments();
        console.log(`Product count: ${count}`);
        const products = await ProductModel.find({});
        console.log("Products:", JSON.stringify(products, null, 2));
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
