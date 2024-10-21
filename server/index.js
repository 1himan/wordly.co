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
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const port = process.env.PORT;

// mongoose.connection is a reference(what is a reference? how is it made internally?)
// to the default MongoDB 
// connection that Mongoose establishes when you connect to a 
// database using mongoose.connect(). By using mongoose.connection, 
// you can add event listeners like on("error") or once("open") 
// to listen for changes in the state of the connection.
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
// .use() is a method in our express "app" that is used to apply middlewares.
// tell me more fact and interesting info about app.use
app.use(
  // what is cors - Cross Origin Resource Sharing?
  cors({
    // what are these parameters?
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// what is express.json() and what does it do?
app.use(express.json());
// what is cookieParser() and what does it do?
app.use(cookieParser());
// and why are we using both of these "middleswares" inside of app.use?

app.get("/", async (req, res) => {
  try {
    res.send("Hello, how are you? Welcome to Our App");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

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
