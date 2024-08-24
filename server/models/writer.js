import mongoose from "mongoose";

const writerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
  bio: { type: String }, 
  profilePicture: { type: String }, 
  socialMedia: {
    twitter: { type: String }, 
    linkedin: { type: String }, 
    facebook: { type: String }, 
    instagram: { type: String }, 
  },
});

export const Writer = mongoose.model("Writer", writerSchema);
