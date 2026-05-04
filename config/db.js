const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected MongoDB");
  } catch (error) {
    console.error("MongoDB error:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;