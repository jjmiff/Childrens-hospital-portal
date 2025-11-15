const mongoose = require("mongoose");

const CareTeamMemberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true }, // e.g., "Doctor", "Nurse", "Therapist"
    specialty: { type: String, trim: true }, // e.g., "Cardiology", "Pediatrics"
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    hospital: { type: String, trim: true },
    department: { type: String, trim: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareTeamMember", CareTeamMemberSchema);
