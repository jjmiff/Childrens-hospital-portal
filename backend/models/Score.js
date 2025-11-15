const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  gameType: {
    type: String,
    enum: [
      "quiz",
      "memory",
      "word-scramble",
      "math-challenge",
      "pattern-match",
    ],
    default: "quiz",
  },
  // Optional performance metrics
  moves: { type: Number },
  seconds: { type: Number },
  date: { type: Date, default: Date.now },
});

// Add index for better query performance
scoreSchema.index({ userId: 1, date: -1 });

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
