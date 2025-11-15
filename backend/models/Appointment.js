const mongoose = require("mongoose");

// Appointment Schema: Represents a scheduled hospital interaction for a child
// Minimal fields for prototype; expandable later (status, notes, reminders)
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true }, // e.g. "Check-up with Dr. Smith"
    date: { type: Date, required: true }, // combined date/time
    location: { type: String, required: true }, // e.g. "Clinic Room 3"
    type: {
      type: String,
      enum: ["check-up", "test", "therapy", "surgery", "other"],
      default: "other",
    },
    // For future expansion (not used in prototype UI yet)
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    // Keep schema lean; no timestamps duplication with createdAt field
  }
);

// Compound index to quickly query upcoming appointments for a user
appointmentSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model("Appointment", appointmentSchema);
