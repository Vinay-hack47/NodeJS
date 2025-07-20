// import jwt from "jsonwebtoken";

// export const isAuthenticated = async(req, res, next) => {
//   try {
//     const token = req.cookies.token;

//     if(!token){
//       return res.status(401).json({message: "User not authenticated"});
//     };

//     const decode = await jwt.verify(token, process.env.SECRET_KEY);

//     if(!decode){
//       return res.status(401).json({message: "Invalid token"});
//     }

//     req.id = decode.userId;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };



import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.id = await User.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


