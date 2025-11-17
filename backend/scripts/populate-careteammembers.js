// Script to populate CareTeamMember collection and link to patients
const mongoose = require("mongoose");
const CareTeamMember = require("../models/CareTeamMember");
const User = require("../models/User");

const MONGO_URI =
  process.env.DATABASE_URL || "mongodb://localhost:27017/children_portal";

async function main() {
  await mongoose.connect(MONGO_URI);

  // Example staff members
  const staffMembers = [
    {
      name: "Dr. Alice Smith",
      role: "Doctor",
      specialty: "Pediatrics",
      phone: "555-1234",
      email: "alice.smith@hospital.org",
      hospital: "Children's Hospital",
      department: "Pediatrics",
      notes: "Lead pediatrician",
    },
    {
      name: "Nurse Bob Johnson",
      role: "Nurse",
      specialty: "General",
      phone: "555-5678",
      email: "bob.johnson@hospital.org",
      hospital: "Children's Hospital",
      department: "General",
      notes: "Day shift nurse",
    },
    {
      name: "Therapist Carol Lee",
      role: "Therapist",
      specialty: "Physical Therapy",
      phone: "555-8765",
      email: "carol.lee@hospital.org",
      hospital: "Children's Hospital",
      department: "Therapy",
      notes: "Physical therapist",
    },
  ];

  // Print all users for debugging
  const allUsers = await User.find({});
  if (allUsers.length === 0) {
    console.log("No users found in the database.");
    return mongoose.disconnect();
  }
  console.log("All users in the database:");
  allUsers.forEach((u) => {
    console.log(`Username: ${u.username}, userType: ${u.userType}`);
  });

  // Find some child patients
  const patients = allUsers.filter((u) => u.userType === "child");
  if (patients.length === 0) {
    console.log("No child patients found. Please add some child users first.");
    return mongoose.disconnect();
  }

  // Link each staff member to a patient
  for (let i = 0; i < staffMembers.length; i++) {
    const patient = patients[i % patients.length];
    const staff = staffMembers[i];
    // Link by setting userId to patient._id
    const member = new CareTeamMember({
      ...staff,
      userId: patient._id,
    });
    await member.save();
    console.log(`Added ${staff.name} for patient ${patient.username}`);
  }

  // Print all CareTeamMember documents for verification
  const allMembers = await CareTeamMember.find({});
  if (allMembers.length === 0) {
    console.log("No CareTeamMember documents found in the database.");
  } else {
    console.log("All CareTeamMember documents:");
    allMembers.forEach((m) => {
      console.log(
        `Name: ${m.name}, Role: ${m.role}, Linked Patient ID: ${m.userId}`
      );
    });
  }

  await mongoose.disconnect();
  console.log("CareTeamMember population complete.");
}

main().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
