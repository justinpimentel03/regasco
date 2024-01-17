const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { role, username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const user = new User({ role, username, password });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { role, username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid Username" });
    }

    // Simple password comparison
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Check if the user has a valid role
    if (user.role !== role) {
      return res.status(403).json({ message: "Invalid role" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { username: user.username, role: user.role },
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
