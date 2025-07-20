import { Product } from "../model/product.model.js";
import { User } from "../model/user.model.js";

// create
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    if (!name || !price || !description || stock === undefined) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.create({
      name, price, description, stock, createdBy: userId
    });

    return res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// read all (only the creator’s own products)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.id });
    return res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// read one (only if created by the logged-in user)
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id, createdBy: req.id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// update (only creator)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id, createdBy: req.id },
      { name, price, description, stock },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found or not authorized" });

    return res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// delete (only creator)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ _id: id, createdBy: req.id });
    if (!product) return res.status(404).json({ message: "Product not found or not authorized" });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};