import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Please Write A Heading For This article",
    },
    readTime: { type: Number, default: 0 },
    description: {
      type: String,
      default:
        "Provide a brief and short description of your project. First paragraph that appears in your article will be choosen as a description if not provided",
    }, // Add description field
    content: { type: mongoose.Schema.Types.Mixed, default: [] }, // I can use this field to store any type of content
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Writer",
      required: true,
    },
    tags: { type: [String], default: ["tag1, tag2"] },
    views: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    date: { type: Date, default: Date.now }, // Add date field with default value
    likeCount: { type: Number, default: 0 }, // Add likeCount field with default value
    commentCount: { type: Number, default: 0 }, // Add commentCount field with default value
    cover: { type: String, default: "" }, // Add cover field to store URL or path to cover image
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    strict: false, // Allow schema-less storage for blocks
    versionKey: false, // Disable the __v field
    minimize: false, // Prevent empty objects from being removed
  }
);

export const Article = mongoose.model("Article", articleSchema);
