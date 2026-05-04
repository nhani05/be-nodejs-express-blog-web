const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const {
  getAllPosts,
  getPostBySlug,
  getPostById,
  createPost,
  createComment,
} = require("../controllers/postController");

router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);
// router.get("/id/:id", getPostById);
router.post("/", verifyToken, createPost);
router.post("/:slug/comments", verifyToken, createComment);

module.exports = router;