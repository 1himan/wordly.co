import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Please Write A Heading For This Article",
    },
    readTime: { type: Number, default: 0 },
    description: {
      type: String,
      default:
        "Provide a brief and short description of your project. The first paragraph of your article will be used if no description is provided.",
    },
    content: { type: mongoose.Schema.Types.Mixed, default: [] },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Writer",
      required: true,
    },
    tags: { type: [String], default: ["tag1", "tag2"] },
    views: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    date: { type: Date, default: Date.now },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    cover: { type: String, default: "" },

    // Ensure comments are initialized as an empty array by default
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
  },
  {
    strict: false,
    versionKey: false,
    minimize: false,
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Index to optimize common queries
articleSchema.index({ likeCount: -1, date: -1 });
articleSchema.index({ views: -1 });

export const Article = mongoose.model("Article", articleSchema);
