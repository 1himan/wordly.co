import mongoose from "mongoose";
//I have already created the user model which
//I refer to as writer in my app, but the problem 
//is how am I gonna identify those users?
//I mean suppose I open my app on 2 different devices
//how is the app gonna distinguish between both of the users?
//If user1 vists my website and tries create an article what 
//can I do to which person I should I assign the aritcle to? 

const writerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
});

export const Writer = mongoose.model("Writer", writerSchema);
