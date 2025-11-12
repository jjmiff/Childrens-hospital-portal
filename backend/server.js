const express = require("express");
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const Score = require("./models/Score"); // Import Score model

const app = express();

// Middleware to parse incoming requests
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
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
