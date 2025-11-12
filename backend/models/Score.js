const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Optional: can be a unique identifier like a user ID
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now } // Store the date of submission
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
