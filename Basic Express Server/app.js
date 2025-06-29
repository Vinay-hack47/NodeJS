import express from "express";
import userRoute from "./routes/user.route.js";
import partyRoute from "./routes/party.route.js";

const app = express();

app.get("/", (req,res) =>{
  res.send("Basic Express Server Example")
})
app.use("/api/user",userRoute);
app.use("/api/party", partyRoute);

app.listen(4000, () =>{
  console.log("Server is running on port 4000");
})