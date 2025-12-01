import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import UserModel from './models/UserModel.js';
import PostModel from './models/Posts.js';
import ProductModel from './models/Product.js'; 

const app = express();
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
app.listen(5000, () => {
  console.log("Server connected at port number 5000..");
});

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
    const { uname, email, password, profilepic } = req.body;

    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(409).json({ message: "User already exists" });

    const hash_password = await bcrypt.hash(password, 10);

    const new_user = new UserModel({
      uname,
      email,
      password: hash_password,
      profilepic: profilepic || "https://icon-library.com/images/profiles-icon/profiles-icon-0.jpg"
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
    const { email, uname } = req.body;

    if (!email || !uname) return res.status(400).json({ message: "Missing data" });

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { uname },
      { new: true } // return the updated document
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user: updatedUser, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
});

// ---------------- SAVE POST ----------------
app.post("/savePost", async (req, res) => {
  try {
    const { postMsg, email, lat, lng } = req.body;
    const new_post = new PostModel({ postMsg, email, lat, lng });
    await new_post.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.send(error);
  }
});

// ---------------- GET POSTS ----------------
app.get("/getPost", async (req, res) => {
  try {
    const postswithUser = await PostModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "email",
          foreignField: "email",
          as: "user",
        }
      },
      { $sort: { createdAt: -1 } }
    ]);
    res.json({ posts: postswithUser });
  } catch (error) {
    res.send(error);
  }
});

// ---------------- GET PRODUCTS ----------------
app.get("/api/products", async (req, res) => { // ✅ New route
  try {
    const products = await ProductModel.find({});
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
