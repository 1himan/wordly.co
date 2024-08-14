import mongoose from "mongoose";

const writerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
});

export const Writer = mongoose.model("Writer", writerSchema);
