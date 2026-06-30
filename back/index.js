import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import caseRoutes from "./routes/case.js";
import challengeRoutes from "./routes/challenge.js";
import suspectRoutes from "./routes/suspect.js";
import learningRoutes from "./routes/learning.js";
import ragRoutes from "./routes/rag.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/murder_mystery";
console.log("Connecting to MongoDB at:", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connection successful!"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.log("Please ensure MongoDB is running locally or update the MONGODB_URI in the .env file.");
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/case", caseRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/suspects", suspectRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/rag", ragRoutes);

// Basic health check route
app.get("/", (req, res) => {
  res.json({ message: "Murder Mystery Detective API is running" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
