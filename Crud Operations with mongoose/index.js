import express from "express";
import { connectDB } from "./db/connectDB.js";
import create from "./operations/create.js";
import read from "./operations/read.js";
import update  from "./operations/update.js";
import deleteOperation from "./operations/delete.js";

const app = express();
connectDB();

create();
read();
update();
deleteOperation();


app.listen(3000, () =>{
  console.log("Server is running on port 3000");
});