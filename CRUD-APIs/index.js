import express from "express";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

app.listen(3000, () =>{
  console.log("Server is running on port 3000");
});
