// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from './routes/user.routes.js';
import itemRoutes from "./routes/item.routes.js";
import adminRoutes from "./routes/admin.routes.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;




app.use(express.json({strict:false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true, // allow cookies / auth headers
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/admin", adminRoutes); 
app.get("/ping", (req, res) => res.send("pong"));
app.get("/api/admin/test-inline", (req, res) => res.json({ msg: "inline test works" }));


app.get("/", (req, res) => {
  res.send("API is running...");
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
