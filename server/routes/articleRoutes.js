import express from "express";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from "../controllers/articleController.js";
import { Article } from "../models/article.js";
import { Comment } from "../models/comment.js";

const router = express.Router();

// Existing article routes
router.get("/", getArticles);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);
router.get("/:id", getArticleById);

//* Route for getting comments
router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // Find the article by ID and populate the comments
    const article = await Article.findById(id).populate("comments");
    console.log(article);
    if (!article || !article.comments) {
      return res.status(404).json({ message: "No comments found" });
    }
    console.log(article.comments);
    res.status(200).json({ comments: article.comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments" });
  }
});

//* Route for adding comments to an article
router.post("/:id/comments", async (req, res) => {
  console.log("this route is triggered bitch")
  const { id } = req.params;
  const { comment, writerId } = req.body;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const newComment = new Comment({
      articleId: id,
      writerId,
      content: comment,
      date: new Date(),
    });

    await newComment.save();
    // Error adding comment: TypeError: Cannot read properties of undefined (reading 'push')
    console.log(article); // - this is undefined
    console.log(article.comments); // - this is undefined
    article.comments.push(newComment._id);
    article.commentCount += 1;
    await article.save();

    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment" });
  }
});

//* Route for editing a comment
router.put("/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Error updating comment" });
  }
});

//* Route for deleting a comment
router.delete("/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const article = await Article.findById(comment.articleId);
    article.comments = article.comments.filter(
      (commentIdInArticle) => commentIdInArticle.toString() !== commentId
    );
    article.commentCount -= 1;
    await article.save();

    await comment.remove();

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment" });
  }
});

export default router;
