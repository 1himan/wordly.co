import mongoose from "mongoose"
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likeCount: { type: Number, default: 0 }, // Add likeCount to comments
});

// Indexing for quick sorting
commentSchema.index({ likeCount: -1, date: -1 }); // For sorting by likes and date

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
    },
    content: { type: mongoose.Schema.Types.Mixed, default: [] },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Writer",
      required: true,
    },
    tags: { type: [String], default: ["tag1, tag2"] },
    views: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    date: { type: Date, default: Date.now },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    cover: { type: String, default: "" },
    comments: [commentSchema], // Use subdocument for comments
  },
  {
    strict: false,
    versionKey: false,
    minimize: false,
  }
);

// Index on article itself to speed up comment-related queries
articleSchema.index({ "comments.likeCount": -1, "comments.date": -1 });

export const Article = mongoose.model("Article", articleSchema);
