const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: String, default: "Anonymous" },
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    summary: { type: String },
    title: {type: String},
    content: { type: String },
    author: { type: String, default: "Admin" },
    image: { type: String, default: "https://picsum.photos/300/200" },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);