import mongoose from "mongoose";



// 1. Connect to MongoDB
const conStr = "mongodb+srv://ahmed:ahmed@cakegallery.nthfzlv.mongodb.net/";

mongoose.connect(conStr)
  .then(() => console.log("Database Connected.."))
  .catch((err) => console.log("Database connection error..", err));

// 2. Define Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  category: String
});

const Product = mongoose.model("Product", productSchema);

// 3. Define your products data
const productsData  = {
  "Birthday Cakes": [
    { name: "Chocolate Birthday Cake", price: 12, img: "https://images.getrecipekit.com/20250212152521-chocolate-20birthday-20cake-20recipe-20uk.jpg?aspect_ratio=16:9&quality=90&" },
    { name: "Vanilla Sprinkle Cake", price: 10, img: "https://reddessertdive.com/wp-content/uploads/2023/10/Funfetti.jpg" },
    { name: "Rainbow Celebration Cake", price: 15, img: "https://www.hertfordcakeco.com/cdn/shop/files/IMG_4761_600x.jpg?v=1753872934" }
  ],
  "Wedding Cakes": [
    { name: "Classic White Wedding Cake", price: 40, img: "https://www.recipegirl.com/wp-content/uploads/2007/03/White-Wedding-Cake-Horizontal.jpg" },
    { name: "3-Tier Elegant Cake", price: 55, img: "https://cdn.shopify.com/s/files/1/0856/0804/products/Simply-Ruffle-Dressed-3-2_477x477.jpg?v=1627927261" },
    { name: "Floral Art Cake", price: 45, img: "https://pdbmedia.s3.ap-southeast-2.amazonaws.com/2022/09/IMG_0912_jpg.jpg" }
  ],
  "Cupcakes": [
    { name: "Chocolate Cupcakes", price: 4, img: "https://assets-eu-01.kc-usercontent.com/7d86daa4-c668-01be-7af8-44c5dd436d14/2ebc1e34-9db0-4d4a-963f-092d7c8c8f49/Chocolate%20cupcake%20-%20mary%20berry.jpg" },
    { name: "Red Velvet Cupcakes", price: 5, img: "https://www.allrecipes.com/thmb/W5Ou0-fSTAHi5vM9FdJkplRzgNQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/212429-red-velvet-cupcakes-ddmfs-0178-3x4-hero-e5cd9e2684dd4d90b40d9aa0d42e3ee2.jpg" },
    { name: "Caramel Swirl Cupcakes", price: 4.5, img: "https://thegirlinspired.com/wp-content/uploads/2024/07/salted-caramel-cupcakes-step10.jpg" }
  ],
  "Desserts": [
    { name: "Strawberry Cheesecake", price: 6, img: "https://ichef.bbc.co.uk/ace/standard/1600/food/recipes/no-bake_strawberry_30276_16x9.jpg.webp" },
    { name: "Chocolate Mousse", price: 3, img: "https://www.allrecipes.com/thmb/h1-rRJcI_8AMavPqqlBnwVIO3vA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/IMG_8145_Chocolate-Mousse-for-Beginners-4x3-cropped-757ae43035ff48cc8bc9ccffbd6cf3b7.jpg" },
    { name: "Tiramisu Cup", price: 3.5, img: "https://i.ytimg.com/vi/3lqZ9upJg7k/maxresdefault.jpg" }
  ]
};

// 4. Flatten products data
const productsArray = [];
for (const category in productsData) {
  productsData[category].forEach(product => {
    productsArray.push({ ...product, category });
  });
}

// 5. Seed the database
const seedDB = async () => {
  try {
    await Product.deleteMany({});
    console.log("Old products cleared...");

    await Product.insertMany(productsArray);
    console.log("New products inserted successfully!");

    mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (err) {
    console.log("Error seeding data:", err);
  }
};

seedDB();
