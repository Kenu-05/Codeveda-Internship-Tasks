import express from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import { toggleItemStock, listAllUsers,adminLogin,adminLogout } from "../controllers/adminController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// Toggle in-stock for any item


// Get all users
router.get("/users", protect,adminAuth, listAllUsers);
router.post("/login", adminLogin);
router.put("/items/toggle/:id", protect,adminAuth, toggleItemStock);
router.post("/logout", protect, adminAuth, adminLogout);
router.get("/test", (req, res) => {
  console.log("Test route hit");
  res.json({ message: "Router works!" });
});


export default router;
