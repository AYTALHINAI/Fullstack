import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);