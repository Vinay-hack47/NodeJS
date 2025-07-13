import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();


router.route("/create").post(isAuthenticated, createProduct);
router.route("/getAll").get(isAuthenticated, getProducts);
router.route("/get/product/:id").get(isAuthenticated, getProduct);
router.route("/update/product/:id").put(isAuthenticated, updateProduct);
router.route("/delete/product/:id").delete(isAuthenticated, deleteProduct);


export default router;