import  { User } from "../Models/User.Model.js";
import { env } from "../config/env.config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = env.JWT_SECRET;

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User Exists Already" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax", // Use 'None' if cross-site & with HTTPS
        secure: false, // Set to true in production (with HTTPS)
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "User is not exists. Please Sign up!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax", // Use 'None' if cross-site & with HTTPS
        secure: false, // Set to true in production (with HTTPS)
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "Lax", // Use 'None' if cross-site & with HTTPS
        secure: false, // Set to true in production (with HTTPS)
      })
      .json({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
}

export const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ msg: "Unauthorized: UserId not found" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({msg: "User found", user});
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
}