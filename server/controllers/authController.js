import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Writer } from "../models/writer.js";

export const signIn = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newWriter = new Writer({
    username,
    email,
    password: hashedPassword,
  });
  try {
    const savedWriter = await newWriter.save();
    const token = jwt.sign(
      { userId: savedWriter._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, { secure: true, httponly: true });
    res.json({ message: "Sign-In successful" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Username or Email already exists" });
    } else {
      res.status(500).json({ message: "Error signing in", error });
    }
  }
};

export const login = async (req, res) => {
  console.log("this line is executed");
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await Writer.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, userName: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, { secure: true, httponly: true });
    res.json({ message: "Login successful", email });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
