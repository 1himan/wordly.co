// what is mongoose?
import mongoose from "mongoose";

// Define the Comment schema
const commentSchema = new mongoose.Schema(
  {
    articleId: {
      // what is this "type: mongoose.Schema.Types.ObjectId"?
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article", // Reference to the Article model - what is a model? how does it differs from schema? 
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model - how references are created in mongodb? how do they work internally?
      required: true,
    },
    content: {
      type: String, // Text content of the comment
      required: true,
      trim: true,
    },
    likeCount: {
      type: Number, // Number of likes on the comment
      default: 0,
    },
    date: {
      type: Date, // Timestamp for when the comment was added
      default: Date.now,
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // Reference to parent comment for nested comments (if any)
      default: null,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // Reference to reply comments
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    toJSON: { virtuals: true }, // Ensure virtuals are serialized
    toObject: { virtuals: true },
  }
);

// Virtual property to get the total number of replies
// what does vitual mean? what is the code block below is doing exactly?
commentSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

// Indexes for faster query performance
// what is indexing? how does it work? tell me everything about it, and also why
// we've written -1 to likeCount? 
commentSchema.index({ articleId: 1, likeCount: -1 }); // For sorting by likes
commentSchema.index({ articleId: 1, date: -1 }); // For sorting by date

// Export the Comment model
export const Comment = mongoose.model("Comment", commentSchema);
