import mongoose from "mongoose";

const fruitSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

export const Fruit = mongoose.model("Fruit", fruitSchema);