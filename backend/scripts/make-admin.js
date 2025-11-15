// scripts/make-admin.js
// Usage: node scripts/make-admin.js <username>
// Promotes the given user to admin by setting isAdmin: true

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

async function run() {
  const username = process.argv[2];
  if (!username) {
    console.error("Usage: node scripts/make-admin.js <username>");
    process.exit(1);
  }

  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error("DATABASE_URL is not set in backend/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    const res = await User.updateOne({ username }, { $set: { isAdmin: true } });

    if (res.matchedCount === 0) {
      console.error(`User not found: ${username}`);
      process.exit(2);
    }

    console.log(`User '${username}' promoted to admin.`);
    process.exit(0);
  } catch (err) {
    console.error("Error promoting user:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

run();
