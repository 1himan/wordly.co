import { Writer } from "../models/writer.js";

export const getWriterProfile = async (req, res) => {
  console.log(req.user.userId);
  try {
    const writer = await Writer.findById(req.user.userId).populate("articles");
    console.log(writer);
    if (!writer) return res.status(404).json({ message: "Writer not found" });

    const formattedWriter = {
      username: writer.username,
      email: writer.email,
      bio: writer.bio,
      cover: writer.cover,
      profilePicture: writer.profilePicture,
      socialMedia: writer.socialMedia,
      quote: writer.quote,
      weeklyReaders: writer.weeklyReaders,
      articlesWritten: writer.articlesWritten,
      interests: writer.interests,
      articles: writer.articles.map((article) => ({
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
      })),
    };
    console.log(formattedWriter);
    res.json(formattedWriter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching writer data", error: err });
  }
};
