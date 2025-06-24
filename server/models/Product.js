const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    gender: {
      type: String,
      enum: ["men", "women"],
    },
    shape: String,
    lens: String,
    material: String,
    color: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
