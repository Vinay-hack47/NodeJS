import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1D",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: `Welcome back ${user.name}`, success: true, user });
  } catch (error) {
    console.log(error);
  }
};


export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "User logged out successfully.", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};