import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import articleRoutes from "./routes/articleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import searchRoutes from "./routes/searchRoute.js";
import writerRoutes from "./routes/writerRoute.js";
import googleAuth from "./routes/googleAuth.js";
import { authenticateToken } from "./middlewares/authenticateToken.js";
import logoutRoute from "./routes/logout.js";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const port = process.env.PORT;
const db = mongoose.connection;

// Database event listeners
db.on("error", (error) => {
  console.error("Connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
  });
});
db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/articles", articleRoutes);
app.use("/auth", authRoutes);
app.use("/search", searchRoutes);
app.use("/writer", writerRoutes);
app.use("/auth/google", googleAuth);
app.use("/auth/logout", logoutRoute);

app.get("/user", authenticateToken, (req, res) => {
  res.json(req.user);
});

app.get("/", async (req, res) => {
  try {
    res.send("Hello, how are you? Welcome to Our App");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
