const mongoose = require("mongoose");
const Post = require("../models/Post");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Loi lay danh sach bai viet" });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ message: "Khong tim thay bai viet" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Loi lay bai viet theo slug" });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID khong hop le" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Khong tim thay bai viet" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Loi lay bai viet theo id" });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, summary, content, image } = req.body;

    if (!title) {
      return res.status(400).json({ message: "title la bat buoc" });
    }

    let slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
    }

    const newPost = new Post({
      slug,
      title, // ← thêm dòng này
      summary,
      content,
      author: req.user.username,
      image: image || "https://picsum.photos/300/200",
    });

    console.log(newPost);

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Loi tao bai viet", error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { slug } = req.params;
    const { content } = req.body;
    console.log(content);

    const post = await Post.findOne({ slug });

    if (!post) {
      return res.status(404).json({ message: "Khong tim thay bai viet" });
    }

    if (!content) {
      return res.status(400).json({ message: "Noi dung comment la bat buoc" });
    }

    const newComment = {
      content,
      author: req.user.username,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({
      message: "Them comment thanh cong",
      comment: post.comments[post.comments.length - 1],
    });
  } catch (error) {
    res.status(500).json({ message: "Loi tao comment", error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostBySlug,
  getPostById,
  createPost,
  createComment,
};
