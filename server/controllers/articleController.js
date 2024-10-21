import { Article } from "../models/article.js";
import { createArticleMethod } from "../initData.js";
import getCHD from "../utils/getCHD.js";
import jwt from "jsonwebtoken";
import { Writer } from "../models/writer.js";

export const getArticles = async (req, res) => {
  try {
    //what does .exec() do?
    console.log("this is running")
    const articles = await Article.find().exec();
    console.log("this is 1:",articles)
    const formattedArticles = articles.map((article) => ({
      imageUrl: article.cover || "/home/code1.jpg",
      heading: article.title,
      description: article.description,
      date: new Date(article.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      likeCount: article.likeCount,
      commentsCount: article.commentCount,
      id: article._id,
    }));
    console.log("this is 2:", formattedArticles);
    res.send(formattedArticles);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching articles.");
  }
};

export const createArticle = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message:
        "You have to LogIn or Create an Account first In Order to Write Your Articles",
    });
  }
  try {
    const data = req.body;
    if (!data.blocks || data.blocks.length === 0) {
      return res.status(400).json({
        message: "Write something pal! Your article can't be empty.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { CoverUrl, Heading, Description } = getCHD(req.body.blocks);
    const article = await createArticleMethod({
      title: Heading,
      description: Description,
      content: data.blocks,
      author: userId, // Use the decoded userId
      tags: ["sample", "user2"],
      status: "draft",
      date: new Date(),
      cover: CoverUrl,
    });
    await article.save();

    // Update the writer's articles array
    await Writer.findByIdAndUpdate(userId, {
      $push: { articles: article._id },
    });

    res.status(200).json({ message: "Data saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
};

export const updateArticle = async (req, res) => {
  const { CoverUrl, Heading, Description } = getCHD(req.body.blocks);
  try {
    const articleId = req.params.id;
    const data = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      {
        content: data.blocks,
        title: Heading,
        description: Description,
        cover: CoverUrl,
        date: new Date(),
      },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({
      message: "Article updated successfully",
      article: updatedArticle,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
};

export const getArticleById = async (req, res) => {
  // await new Promise((resolve) => setTimeout(resolve, 5000)); // 1000ms delay to mimic database delay
  const { id } = req.params;
  try {
    const article = await Article.findById(id).populate("author").exec();
    if (!article) {
      return res.status(404).send("Article not found");
    }
    console.log(article);
    res.send(article);
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).send("Invalid article ID format");
    }
    console.error(error);
    res.status(500).send("An error occurred while fetching the article.");
  }
};

export const addComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  console.log("Received comment:", comment);
};
