import mongoose from "mongoose";

const writerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // Password is required only if googleId is not present
    },
  },
  googleId: { type: String, unique: true }, // Add googleId field
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
  bio: { type: String },

  // Background cover of the profile like we have on LinkedIn
  cover: { type: String }, // Use String type for image URLs

  // Profile picture of the writer
  profilePicture: { type: String }, // Use String type for image URLs

  // Social media links of the writer
  socialMedia: {
    linkedin: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    github: { type: String },
  },

  // Favourite quote of the writer
  quote: { type: String },

  // Number of weekly readers
  weeklyReaders: { type: Number },

  // Interests of the writer
  interests: {
    type: [String], // Array of strings to represent multiple interests
    default: [],
  },
});

// Virtual property for articlesWritten
writerSchema.virtual("articlesWritten").get(function () {
  return this.articles.length;
});

// Ensure virtual fields are serialized
writerSchema.set("toJSON", { virtuals: true });
writerSchema.set("toObject", { virtuals: true });

export const Writer = mongoose.model("Writer", writerSchema);
