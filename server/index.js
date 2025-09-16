import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// Allowed origins: local dev + deployed frontend
const allowedOrigins = [
  "http://localhost:5173", // local Vite dev
  "https://mern-ecommerce-fwwgbyyi3-harsh-marthaks-projects.vercel.app", // deployed Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
