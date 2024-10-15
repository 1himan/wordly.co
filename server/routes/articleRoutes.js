import express from "express";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from "../controllers/articleController.js";
import { Article } from "../models/article.js"; // Import the Article model

const router = express.Router();

router.get("/", getArticles);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);
router.get("/:id", getArticleById);

// Route for adding comments to an article
router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { comment, userId } = req.body;

  try {
    // Find the article by its ID
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Add the new comment to the article's comments array
    const newComment = {
      user: userId, 
      content: comment,
      date: new Date(), // Automatically adds the current date
    };

    article.comments.push(newComment);

    // Save the updated article with the new comment
    await article.save();

    // Respond with the updated article or just the new comment
    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment" });
  }
});

export default router;
