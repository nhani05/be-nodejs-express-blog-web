require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Post = require("./models/Post");
const posts = require("./data/posts");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function seedPosts() {
  try {
    await connectDB();

    await Post.deleteMany();
    console.log("🗑️ Cleared old posts");

    await Post.insertMany(posts);
    console.log("✅ Seeded posts");

    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedPosts();



async function seedUser() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  await connectDB();

  await User.deleteMany();
  console.log("🗑️ Cleared old User");
  await User.create({
    username: "admin123",
    password: hashedPassword,
  });

  console.log("Tao user thanh cong");
}

seedUser();