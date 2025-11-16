const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["child", "parent", "staff"],
    required: true,
    default: "child",
  },
  dateOfBirth: {
    type: Date,
    required: function () {
      return this.userType === "child";
    },
  },
  ageGroup: {
    type: String,
    enum: ["4-8", "9-14", "15-18"],
    required: function () {
      return this.userType === "child";
    },
  },
  avatar: {
    type: String,
    default: "🧒",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  refreshTokens: [
    new mongoose.Schema(
      {
        tokenId: { type: String, required: true },
        expiresAt: { type: Date, required: true },
        createdAt: { type: Date, default: Date.now },
        revokedAt: { type: Date },
        userAgent: { type: String },
        ip: { type: String },
      },
      { _id: false }
    ),
  ],
});

module.exports = mongoose.model("User", UserSchema);
