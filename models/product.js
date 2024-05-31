import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
});

export const Product = models.Product || model("Product", ProductSchema);
