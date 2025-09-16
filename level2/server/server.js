// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import itemRoutes from "./routes/item.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ strict: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true, // allow cookies / auth headers
  })
);

// Simple test route
app.get("/ping", (req, res) => res.send("pong"));
app.get("/", (req, res) => res.send("API is running..."));

// ✅ Connect DB, then mount routes + start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // Mount routes ONLY after DB connection
    app.use("/api/users", userRoutes);
    app.use("/api/items", itemRoutes);
    app.use("/api/admin", adminRoutes);

    // Start server
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
