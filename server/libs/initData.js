import mongoose from "mongoose";
import { Writer } from "../models/writer.js";
import { Article } from "../models/article.js";
// import connectDB from "./db.js";
import { article_1, article_2, article_3 } from "../data/articleContent.js";
import { writer_1, writer_2 } from "../data/writer.js";

// await connectDB();

const clearCollections = async () => {
  await Writer.deleteMany({});
  await Article.deleteMany({});
};

const createWriter = async (writerData) => {
  const writer = new Writer(writerData);
  await writer.save();
  // console.log(`Writer ID: ${writer._id}`);
  return writer;
};

export const createArticle = async (articleData) => {
  const article = new Article(articleData);
  await article.save();
  return article;
};

const createDummyData = async () => {
  try {
    await clearCollections();

    const writer1 = await createWriter(writer_1);
    const writer2 = await createWriter(writer_2);

    const article1 = await createArticle({
      title: "What is Self?",
      description:
        " This article presents a personal view on the question “What is self?” by combining perspectives from Western and Eastern philosophy.",
      content: article_1,
      author: writer1._id,
      tags: ["sample", "user1"],
      status: "published",
      date: new Date(),
      likeCount: 10,
      commentCount: 2,
      cover:
        "https://i.guim.co.uk/img/static/sys-images/Observer/Pix/pictures/2015/7/24/1437753892414/A-mans-world-a-marble-sta-018.jpg?width=465&dpr=1&s=none",
    });

    const article2 = await createArticle({
      title: "Sapiens Extended - 1",
      description:
        "This series will explore every detail discussed by Yuval Harari in his book “Sapiens,” diving deeper into each topic to provide a comprehensive understanding.",
      content: article_2,
      author: writer2._id,
      tags: ["sample", "user2"],
      status: "draft",
      date: new Date(),
      likeCount: 5,
      commentCount: 1,
      cover:
        "https://www.krqe.com/wp-content/uploads/sites/12/2023/05/AdobeStock_267410313.jpeg?w=2560&h=1440&crop=1",
    });

    const article3 = await createArticle({
      title: "Hinduism and Its Philosophers",
      description:
        "This series will delve into the intricacies of Hindu philosophy, its rich history, and the teachings of influential philosophers like Adi Shankaracharya, Swami Vivekananda, and Saint Kabir.",
      content: article_3,
      author: writer1._id,
      tags: ["example", "user1"],
      status: "published",
      date: new Date(),
      likeCount: 20,
      commentCount: 4,
      cover:
        "https://m.media-amazon.com/images/I/61rQQJaESPL._AC_UF1000,1000_QL80_.jpg",
    });
    const article4 = await createArticle({
      title: "Sacred Silliness: Debunking Divine Myths with a Smile",
      description:
        "This series of articles will take a rational approach to debunking religious myths, highlighting their quirks and contradictions with the theory of evolution.",
      content: article_3,
      author: writer1._id,
      tags: ["example", "user1"],
      status: "published",
      date: new Date(),
      likeCount: 20,
      commentCount: 4,
      cover:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUtpi3OFaePBNafgEww-pAHE5PKL2ED9KnzjXMvta0EuUBB30fn4-8DlmAS-tiJRun4i3N8K2vy0pyk5ThXDvKoEhLWu7VyqvpLpw2Uqm4JWT7j3sP2noUm_ebEeLMs8gb8Ass/s1600/christopher-hitchens.jpg",
    });

    writer1.articles.push(article1._id, article3._id);
    await writer1.save();

    writer2.articles.push(article2._id);
    await writer2.save();

    // console.log("Dummy data inserted successfully");
    // mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

createDummyData();
