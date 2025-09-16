import express from "express";
import { getProducts, createProduct, getProductById } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, createProduct); // only logged-in users can create
router.get("/:id", getProductById);

export default router;
