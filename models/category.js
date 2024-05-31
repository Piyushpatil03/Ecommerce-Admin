import mongoose, { model, Schema, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Category", default: null }, // reference to same category collection to get full details of parent category
});

export const Category = models.Category || model("Category", CategorySchema);
