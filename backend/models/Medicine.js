const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    dosage: { type: String, trim: true },
    frequency: { type: String, trim: true }, // e.g., "Once daily", "2x daily"
    time: { type: String, trim: true }, // e.g., "08:00", "morning"
    startDate: { type: Date },
    endDate: { type: Date },
    notes: { type: String, trim: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", MedicineSchema);
