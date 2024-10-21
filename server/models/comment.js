import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    // person who commented
    writerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Writer",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

commentSchema.index({ articleId: 1, likeCount: -1 });
commentSchema.index({ articleId: 1, date: -1 });

export const Comment = mongoose.model("Comment", commentSchema);
