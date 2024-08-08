import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Article } from "./models/article.js";
import { createArticle } from "./libs/initData.js";
import { writer_1 } from "./data/writer.js";
import getCHD from "./libs/getCHD.js";

const app = express();
const port = 8001;
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test2");

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("Connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
  });
});
db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

app.get("/", async (req, res) => {
  try {
    res.send("Hello, how are you? Welcome to Our App");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find().exec();
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
    res.send(formattedArticles);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching articles.");
  }
});

//I want to keep track of users in my applications
//such that it can determine and distinguish between
//different writers on the platform how can I do that?
app.post("/articles", async (req, res) => {
  try {
    const data = req.body;
    console.log(data.blocks);

    const { CoverUrl, Heading, Description } = getCHD(req.body.blocks);
    console.log({ CoverUrl, Heading, Description });
    const article = await createArticle({
      title: Heading,
      description: Description,
      content: data.blocks,
      //the author is hard coded
      author: "66ae0b9bcff6191cf712b953",
      tags: ["sample", "user2"],
      status: "draft",
      date: new Date(),
      likeCount: 5,
      commentCount: 1,
      cover: CoverUrl,
    });
    await article.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

app.put("/articles/:id", async (req, res) => {
  const { CoverUrl, Heading, Description } = getCHD(req.body.blocks);
  try {
    const articleId = req.params.id;
    const data = req.body;
    // console.log(data);
    // Your logic to update the article using the articleId
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
});

app.delete("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

app.get("/articles/:id", async (req, res) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const { id } = req.params;
  try {
    const article = await Article.findById(id).exec();
    if (!article) {
      return res.status(404).send("Article not found");
    }
    res.send(article);
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).send("Invalid article ID format");
    }
    console.error(error);
    res.status(500).send("An error occurred while fetching the article.");
  }
});
