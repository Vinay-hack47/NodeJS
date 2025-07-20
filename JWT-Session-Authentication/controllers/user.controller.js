// import { User } from "../model/user.model.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.status(400).json({ msg: "Please fill in all fields" });
//   }

//   const user = await User.findOne({ email });
//   if (user) {
//     return res.status(400).json({ msg: "Email already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await User.create({
//     email,
//     password: hashedPassword,
//   });

//   return res.status(200).json({ message: "User created successfully" });
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ msg: "Please fill in all fields" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const tokenData = {
//       userId: user._id,
//     };

//     const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
//       expiresIn: "1D",
//     });

//     return res
//       .status(200)
//       .cookie("token", token, {
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         sameSite: "strict",
//       })
//       .json({ message: `Welcome back ${user.name}`, success: true, user });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     res
//       .status(200)
//       .cookie("token", "", { maxAge: 0 })
//       .json({ message: "User logged out successfully.", success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Server error.", error: error.message });
//   }
// };

import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { Session } from "../model/session.model.js";
import bcrypt from "bcrypt";

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");


export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please fill in all fields" });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashedPassword,
  });

  return res.status(200).json({ message: "User created successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid email or password" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ msg: "Invalid email or password" });
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await Session.create({
    userId: user._id,
    refreshToken: hashToken(refreshToken),
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res
    .cookie("accessToken", accessToken, { httpOnly: true })
    .cookie("refreshToken", refreshToken, { httpOnly: true })
    .json({ message: "Logged in" });
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const session = await Session.findOne({
      userId: decoded.userId,
      refreshToken: hashToken(refreshToken),
    });

    if (!session) return res.status(401).json({ message: "Invalid session" });

    // Token Rotation (Optional)
    const newRefreshToken = generateRefreshToken(decoded.userId);
    session.refreshToken = hashToken(newRefreshToken);
    await session.save();

    const newAccessToken = generateAccessToken(decoded.userId);

    res
      .cookie("accessToken", newAccessToken, { httpOnly: true })
      .cookie("refreshToken", newRefreshToken, { httpOnly: true })
      .json({ message: "Token refreshed" });
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};


export const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    await Session.findOneAndDelete({ refreshToken: hashToken(refreshToken) });
  }

  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ message: "Logged out" });
};
