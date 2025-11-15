// Achievement.js
// Purpose: Track user achievements and badges

const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  achievementId: {
    type: String,
    required: true,
  },
  unlockedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index to prevent duplicate achievements
achievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

module.exports = mongoose.model("Achievement", achievementSchema);
