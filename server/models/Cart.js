import mongoose from "mongoose";

const CartItemSchema = mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const CartSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    items: [CartItemSchema],
    totalItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 }
}, {
    timestamps: true
});

const CartModel = mongoose.model("carts", CartSchema);
export default CartModel;
