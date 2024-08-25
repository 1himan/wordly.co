import { Article } from "../models/article.js";

export const searchArticles = async (req, res) => {
  const query = req.query.q;
  try {
    const results = await Article.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).exec();

    const formattedResults = results.map((article) => ({
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

    res.send(formattedResults);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching articles.");
  }
};
