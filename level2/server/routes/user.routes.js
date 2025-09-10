// backend/routes/user.routes.js
import express from "express";
import { signup, login, logout, me } from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.post("/logout", protect, logout);
router.get("/me", protect, me);

export default router;
