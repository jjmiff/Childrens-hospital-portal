// scripts/list-users.js
// Usage: node scripts/list-users.js
// Lists all users in the database

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

async function run() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error("DATABASE_URL is not set in backend/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    const users = await User.find({}).select("username isAdmin createdAt");

    if (users.length === 0) {
      console.log("No users found in database.");
    } else {
      console.log("\nExisting users:");
      console.log("================");
      users.forEach((u) => {
        console.log(
          `- ${u.username} ${u.isAdmin ? "(ADMIN)" : ""} - Created: ${u.createdAt}`
        );
      });
      console.log(`\nTotal: ${users.length} user(s)\n`);
    }

    process.exit(0);
  } catch (err) {
    console.error("Error listing users:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

run();
