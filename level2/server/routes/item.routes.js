// backend/routes/item.routes.js
import express from "express";
import {
  listItems,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

import { protect } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import Joi from "joi";

const router = express.Router();

// Joi schema for item validation
const itemSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().allow(""),
  price: Joi.number().positive().required(),
});

// All item routes require login (since you always use req.user.id in controllers)

// List all items for current user
router.get("/", protect, listItems);

// Create item
router.post("/", protect, validate(itemSchema), createItem);

// Update item (only if owner matches req.user.id)
router.put("/:id", protect, validate(itemSchema), updateItem);

// Delete item (only if owner matches req.user.id)
router.delete("/:id", protect, deleteItem);

export default router;
