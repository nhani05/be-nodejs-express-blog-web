const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const bcrypt = require("bcryptjs");
// const hashedPassword = await bcrypt.hash(password, 10);

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Loi lay thong tin nguoi dung" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // so sánh password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // tạo token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({
      message: "Login success",
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

module.exports = { login, getUsers };
