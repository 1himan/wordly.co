import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { Writer } from "../models/writer.js"; // Import your Writer model

const router = express.Router();

// Redirect user to Google for authentication
router.get("/", (req, res) => {
  const redirectUri = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
  });
  res.redirect(`${redirectUri}?${params}`);
});

// Handle Google callback (Google redirects the user back here)
router.get("/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access and refresh tokens
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code,
          grant_type: "authorization_code",
          redirect_uri: `${process.env.BASE_URL}/auth/google/callback`,
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Use the access token to get user info from Google
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const user = userInfoResponse.data;

    // Check if user exists in your database
    let existingUser = await Writer.findOne({ email: user.email });
    if (!existingUser) {
      // If user doesn't exist, create a new user
      existingUser = new Writer({
        googleId: user.sub,
        username: user.name,
        email: user.email,
        profilePicture: user.picture,
      });
      await existingUser.save();
    }

    // Create a JWT for your app (can be used for session management)
    const token = jwt.sign(
      {
        userId: existingUser._id,
        userName: existingUser.username,
        userPfp: existingUser.profilePicture,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" } // Token expiration time
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "Lax", // Adjust as needed
    });

    // Redirect to frontend
    res.redirect("http://localhost:3000");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during Google OAuth process.", error });
  }
});

export default router;
