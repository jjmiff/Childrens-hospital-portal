const express = require("express");
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const Score = require("./models/Score"); // Import Score model
const User = require("./models/User"); // Import User model

const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For session management
const app = express();

// Middleware to parse incoming requests
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

// API route for user registration
app.post("/api/users/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// API route for user login
app.post("/api/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Create and sign a JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
});

// API route to save quiz score
app.post("/api/scores", async (req, res) => {
  try {
    const { userId, score, total } = req.body;

    // Basic validation
    if (
      typeof userId !== "string" ||
      typeof score !== "number" ||
      typeof total !== "number"
    ) {
      return res
        .status(400)
        .json({ message: "Invalid data format for score." });
    }

    const newScore = new Score({ userId, score, total });
    await newScore.save(); // Save the score to the database
    res
      .status(201)
      .json({ message: "Score saved successfully", score: newScore });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ message: "Error saving score" });
  }
});

// API route to get all quiz scores (optional for now)
app.get("/api/scores", async (req, res) => {
  try {
    const scores = await Score.find(); // Retrieve all saved scores
    res.status(200).json(scores);
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ message: "Error fetching scores" });
  }
});

// Database connection (MongoDB example)
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process with failure
  });

// Start the server
const PORT = process.env.PORT || 5000; // Using a different default to avoid conflicts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
