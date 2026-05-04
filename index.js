const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Ket noi MongoDB Atlas thanh cong");
  })
  .catch((error) => {
    console.error("Ket noi MongoDB that bai:", error.message);
  });

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});