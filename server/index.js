import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import UserModel from './models/UserModel.js';
import ProductModel from './models/Product.js';
import CartModel from './models/Cart.js';

export const app = express();
app.use(cors());
app.use(express.json());

// ---------------- DATABASE CONNECTION ----------------
try {
  const conStr = "mongodb+srv://ahmed:ahmed@cakegallery.nthfzlv.mongodb.net/";
  mongoose.connect(conStr);
  console.log("Database Connected..");
} catch (error) {
  console.log("Database connection error.." + error);
}

// ---------------- SERVER ----------------
if (process.env.NODE_ENV !== 'test') {
  app.listen(5000, () => {
    console.log("Server connected at port number 5000..");
  });
}

// ---------------- LOGIN ----------------
app.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      const pwd_match = await bcrypt.compare(req.body.password, user.password);
      if (pwd_match) return res.status(200).json({ user, message: "Success" });
      return res.status(401).json({ message: "Invalid Credentials.." });
    }
    return res.status(404).json({ message: "User not found..." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
});

// ---------------- REGISTER ----------------
app.post("/register", async (req, res) => {
  try {
    const { uname, email, password, profilepic, phoneNumber } = req.body;

    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(409).json({ message: "User already exists" });

    const hash_password = await bcrypt.hash(password, 10);

    const new_user = new UserModel({
      uname,
      email,
      password: hash_password,
      profilepic: profilepic || "https://icon-library.com/images/profiles-icon/profiles-icon-0.jpg",
      phoneNumber
    });

    await new_user.save();
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.email) {
      return res.status(409).json({ message: "User already exists..." });
    }
    res.status(500).json({ message: "Server error", error: String(error) });
  }
});
// ==================== UPDATE USER PROFILE ====================
app.put("/updateProfile", async (req, res) => {
  try {
    const { email, uname, phoneNumber, profilepic } = req.body;

    if (!email) return res.status(400).json({ message: "Missing email" });

    const updates = {};
    if (uname) updates.uname = uname;
    if (phoneNumber) updates.phoneNumber = phoneNumber;
    if (profilepic) updates.profilepic = profilepic;

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      updates,
      { new: true } // return the updated document
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user: updatedUser, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
});





// ---------------- GET PRODUCTS ----------------
app.get("/api/products", async (req, res) => { 
  try {
    const products = await ProductModel.find({});
    console.log(`Found ${products.length} products`);
    const grouped = {};
    products.forEach((p) => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push({
        name: p.name,
        price: p.price,
        img: p.img
      });
    });
    res.status(200).json(grouped);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
});

// ==================== CART ENDPOINTS ====================

// GET USER CART
app.get("/api/cart/:email", async (req, res) => {
  try {
    const { email } = req.params;
    let cart = await CartModel.findOne({ email });

    if (!cart) {
      // Create empty cart if doesn't exist
      cart = new CartModel({ email, items: [], totalItems: 0, totalPrice: 0 });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
});

// ADD ITEM TO CART
app.post("/api/cart/add", async (req, res) => {
  try {
    const { email, item } = req.body;

    let cart = await CartModel.findOne({ email });

    if (!cart) {
      cart = new CartModel({ email, items: [], totalItems: 0, totalPrice: 0 });
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(i => i.productId === item.id);

    if (existingItemIndex > -1) {
      // Increment quantity
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cart.items.push({
        productId: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
        category: item.category,
        quantity: 1
      });
    }

    // Recalculate totals
    cart.totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
});

// UPDATE ITEM QUANTITY
app.put("/api/cart/update", async (req, res) => {
  try {
    const { email, productId, action } = req.body; // action: 'increment' or 'decrement'

    const cart = await CartModel.findOne({ email });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(i => i.productId === productId);
    if (itemIndex === -1) return res.status(404).json({ message: "Item not found" });

    if (action === 'increment') {
      cart.items[itemIndex].quantity += 1;
    } else if (action === 'decrement') {
      if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
      }
    }

    // Recalculate totals
    cart.totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
});

// REMOVE ITEM FROM CART
app.delete("/api/cart/remove", async (req, res) => {
  try {
    const { email, productId } = req.body;

    const cart = await CartModel.findOne({ email });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.productId !== productId);

    // Recalculate totals
    cart.totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
});

// CLEAR CART
app.delete("/api/cart/clear/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const cart = await CartModel.findOne({ email });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
});

