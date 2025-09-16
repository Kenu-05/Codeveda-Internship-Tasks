import Item from "../models/Item.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


export const toggleItemStock = async (req, res) => {
  console.log(req.params);
  try {
    const item = await Item.findById(req.params.id);
    console.log("Toggling item ID:", req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    item.inStock = !item.inStock;
    await item.save();
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const listAllItems = async (req, res) => {
  try {
    const items = await Item.find(); // fetch all items
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const listAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check against env credentials
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Generate JWT
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Send JWT in cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.json({
        success: true,
        message: "Admin logged in successfully",
        admin: { email, role: "admin" },
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials",
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const adminLogout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (err) {
    console.error("Admin logout error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};