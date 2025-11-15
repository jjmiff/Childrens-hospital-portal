const express = require("express");
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const Score = require("./models/Score"); // Import Score model
const User = require("./models/User"); // Import User model
const Achievement = require("./models/Achievement"); // Import Achievement model
const achievements = require("./config/achievementConfig"); // Achievement definitions

const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For session management
const app = express();

// Middleware to parse incoming requests
app.use(express.json());

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // keep dev experience smooth; consider enabling with a tailored policy later
  })
);

// CORS: allow frontend origin (env) or localhost:3000 by default
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  "http://localhost:3000",
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser requests or same-origin
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate limiting
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }); // 300 requests / 15 min
const adminLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 120 }); // stricter for admin
app.use("/api", apiLimiter);
app.use("/api/admin", adminLimiter);

// Middleware to protect routes
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware to check admin role
const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error verifying admin status" });
  }
};

// Example route
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

// Helper to calculate age from date of birth
const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

// Helper to determine age group from age
const getAgeGroupFromAge = (age) => {
  if (age >= 4 && age <= 8) return "4-8";
  if (age >= 9 && age <= 14) return "9-14";
  if (age >= 15 && age <= 18) return "15-18";
  return null;
};

// Helper to check and award achievements
const checkAndAwardAchievements = async (userId) => {
  try {
    const scores = await Score.find({ userId });
    const totalGames = scores.length;
    const quizGames = scores.filter((s) => s.gameType === "quiz");
    const memoryGames = scores.filter((s) => s.gameType === "memory");

    const newAchievements = [];

    // First time achievements
    if (quizGames.length === 1) {
      await unlockAchievement(userId, "FIRST_QUIZ", newAchievements);
    }
    if (memoryGames.length === 1) {
      await unlockAchievement(userId, "FIRST_MEMORY", newAchievements);
    }

    // Quiz achievements
    if (quizGames.length >= 5) {
      await unlockAchievement(userId, "QUIZ_STREAK_5", newAchievements);
    }
    if (quizGames.length >= 10) {
      await unlockAchievement(userId, "QUIZ_STREAK_10", newAchievements);
    }

    // Check for perfect quiz score
    const hasPerfectScore = quizGames.some((s) => s.score === s.total);
    if (hasPerfectScore) {
      await unlockAchievement(userId, "QUIZ_PERFECT", newAchievements);
    }

    // Memory achievements
    if (memoryGames.length >= 5) {
      await unlockAchievement(userId, "MEMORY_STREAK_5", newAchievements);
    }

    // Check for fast memory game (under 30 seconds)
    const hasFastGame = memoryGames.some((s) => s.seconds && s.seconds < 30);
    if (hasFastGame) {
      await unlockAchievement(userId, "MEMORY_FAST", newAchievements);
    }

    // Check for efficient memory game (8 or fewer moves)
    const hasEfficientGame = memoryGames.some((s) => s.moves && s.moves <= 8);
    if (hasEfficientGame) {
      await unlockAchievement(userId, "MEMORY_EFFICIENT", newAchievements);
    }

    // Total games milestones
    if (totalGames >= 10) {
      await unlockAchievement(userId, "GAMES_10", newAchievements);
    }
    if (totalGames >= 25) {
      await unlockAchievement(userId, "GAMES_25", newAchievements);
    }
    if (totalGames >= 50) {
      await unlockAchievement(userId, "GAMES_50", newAchievements);
    }

    return newAchievements;
  } catch (error) {
    console.error("Error checking achievements:", error);
    return [];
  }
};

// Helper to unlock a single achievement
const unlockAchievement = async (userId, achievementId, newAchievements) => {
  try {
    const existing = await Achievement.findOne({ userId, achievementId });
    if (!existing) {
      await Achievement.create({ userId, achievementId });
      if (achievements[achievementId]) {
        newAchievements.push(achievements[achievementId]);
      }
    }
  } catch (error) {
    // Ignore duplicate key errors
    if (error.code !== 11000) {
      console.error("Error unlocking achievement:", error);
    }
  }
};

// API route for user registration
app.post("/api/users/register", async (req, res) => {
  try {
    const { username, password, dateOfBirth } = req.body;

    // Basic validation
    if (!username || !password || !dateOfBirth) {
      return res.status(400).json({
        message: "Username, password, and date of birth are required.",
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    // Calculate age and age group
    const age = calculateAge(dateOfBirth);
    const ageGroup = getAgeGroupFromAge(age);

    if (!ageGroup) {
      return res.status(400).json({
        message: "You must be between 4 and 18 years old to register.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      dateOfBirth: new Date(dateOfBirth),
      ageGroup,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// API route for user login
app.post("/api/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Create and sign a JWT
    const payload = {
      userId: user._id,
      ageGroup: user.ageGroup,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        ageGroup: user.ageGroup,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        dateOfBirth: user.dateOfBirth,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
});

// API route to save quiz score
app.post("/api/scores", protect, async (req, res) => {
  try {
    const { score, total, gameType, moves, seconds } = req.body;
    const userId = req.user.userId;

    // Basic validation
    if (
      typeof userId !== "string" ||
      typeof score !== "number" ||
      typeof total !== "number"
    ) {
      return res
        .status(400)
        .json({ message: "Invalid data format for score." });
    }

    const payload = { userId, score, total };
    if (typeof gameType === "string") {
      payload.gameType = gameType; // validate by enum in model
    }
    if (typeof moves === "number") {
      payload.moves = moves;
    }
    if (typeof seconds === "number") {
      payload.seconds = seconds;
    }

    const newScore = new Score(payload);
    await newScore.save(); // Save the score to the database

    // Check for new achievements
    const newAchievements = await checkAndAwardAchievements(userId);

    res.status(201).json({
      message: "Score saved successfully",
      score: newScore,
      newAchievements: newAchievements,
    });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ message: "Error saving score" });
  }
});

// API route to get all quiz scores (optional for now)
app.get("/api/scores", protect, async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user.userId }).sort({
      date: -1,
    });
    res.status(200).json(scores);
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ message: "Error fetching scores" });
  }
});

// API route to get user statistics for charts
app.get("/api/users/stats", protect, async (req, res) => {
  try {
    const userId = req.user.userId;
    const scores = await Score.find({ userId }).sort({ date: 1 });

    // Calculate statistics
    const stats = {
      totalGames: scores.length,
      quizStats: {
        count: 0,
        averageScore: 0,
        bestScore: 0,
        recentScores: [],
      },
      memoryStats: {
        count: 0,
        averageMoves: 0,
        bestMoves: Infinity,
        averageTime: 0,
        bestTime: Infinity,
        recentGames: [],
      },
      scoreHistory: [], // for line chart
    };

    scores.forEach((score) => {
      const percentage = Math.round((score.score / score.total) * 100);

      if (score.gameType === "quiz") {
        stats.quizStats.count++;
        stats.quizStats.averageScore += percentage;
        if (percentage > stats.quizStats.bestScore) {
          stats.quizStats.bestScore = percentage;
        }
        stats.quizStats.recentScores.push({
          score: percentage,
          date: score.date,
        });
      } else if (score.gameType === "memory") {
        stats.memoryStats.count++;
        if (score.moves) {
          stats.memoryStats.averageMoves += score.moves;
          if (score.moves < stats.memoryStats.bestMoves) {
            stats.memoryStats.bestMoves = score.moves;
          }
        }
        if (score.seconds) {
          stats.memoryStats.averageTime += score.seconds;
          if (score.seconds < stats.memoryStats.bestTime) {
            stats.memoryStats.bestTime = score.seconds;
          }
        }
        stats.memoryStats.recentGames.push({
          moves: score.moves,
          seconds: score.seconds,
          date: score.date,
        });
      }

      // Add to score history for chart
      stats.scoreHistory.push({
        date: score.date,
        score: percentage,
        gameType: score.gameType,
        moves: score.moves,
        seconds: score.seconds,
      });
    });

    // Calculate averages
    if (stats.quizStats.count > 0) {
      stats.quizStats.averageScore = Math.round(
        stats.quizStats.averageScore / stats.quizStats.count
      );
      stats.quizStats.recentScores = stats.quizStats.recentScores.slice(-10);
    }

    if (stats.memoryStats.count > 0) {
      stats.memoryStats.averageMoves = Math.round(
        stats.memoryStats.averageMoves / stats.memoryStats.count
      );
      stats.memoryStats.averageTime = Math.round(
        stats.memoryStats.averageTime / stats.memoryStats.count
      );
      stats.memoryStats.recentGames = stats.memoryStats.recentGames.slice(-10);

      // Handle case where no games completed
      if (stats.memoryStats.bestMoves === Infinity) {
        stats.memoryStats.bestMoves = 0;
      }
      if (stats.memoryStats.bestTime === Infinity) {
        stats.memoryStats.bestTime = 0;
      }
    }

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ message: "Error fetching user stats" });
  }
});

// Get user achievements
app.get("/api/users/achievements", protect, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userAchievements = await Achievement.find({ userId }).sort({
      unlockedAt: -1,
    });

    // Map to full achievement data
    const unlockedAchievements = userAchievements.map((ua) => ({
      ...achievements[ua.achievementId],
      unlockedAt: ua.unlockedAt,
    }));

    // Get all available achievements
    const allAchievements = Object.values(achievements);

    res.status(200).json({
      unlocked: unlockedAchievements,
      total: allAchievements.length,
      allAchievements: allAchievements,
    });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ message: "Error fetching achievements" });
  }
});

// Update user profile (avatar)
app.patch("/api/users/profile", protect, async (req, res) => {
  try {
    const { avatar } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        dateOfBirth: user.dateOfBirth,
        ageGroup: user.ageGroup,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
});

// ===== ADMIN ROUTES =====

// Get all users (admin only)
app.get("/api/admin/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get all scores (admin only)
app.get("/api/admin/scores", protect, adminOnly, async (req, res) => {
  try {
    const scores = await Score.find({})
      .populate("userId", "username ageGroup")
      .sort({ date: -1 })
      .limit(100);
    res.status(200).json(scores);
  } catch (error) {
    console.error("Error fetching all scores:", error);
    res.status(500).json({ message: "Error fetching scores" });
  }
});

// Delete user (admin only)
app.delete("/api/admin/users/:userId", protect, adminOnly, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deleting yourself
    if (userId === req.user.userId) {
      return res
        .status(400)
        .json({ message: "Cannot delete your own account" });
    }

    await User.findByIdAndDelete(userId);
    await Score.deleteMany({ userId });

    res
      .status(200)
      .json({ message: "User and their scores deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Toggle admin status (admin only)
app.patch(
  "/api/admin/users/:userId/toggle-admin",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Prevent modifying yourself
      if (userId === req.user.userId) {
        return res
          .status(400)
          .json({ message: "Cannot modify your own admin status" });
      }

      user.isAdmin = !user.isAdmin;
      await user.save();

      res.status(200).json({
        message: `User ${user.isAdmin ? "promoted to" : "removed from"} admin`,
        user: {
          id: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
        },
      });
    } catch (error) {
      console.error("Error toggling admin:", error);
      res.status(500).json({ message: "Error updating admin status" });
    }
  }
);

// Update user profile (admin only)
app.patch("/api/admin/users/:userId", protect, adminOnly, async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, dateOfBirth, ageGroup, avatar } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate and update fields
    if (username !== undefined) {
      // Check if username is already taken by another user
      if (username !== user.username) {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: "Username already taken" });
        }
      }
      user.username = username;
    }

    if (dateOfBirth !== undefined) {
      const dob = new Date(dateOfBirth);
      const age = calculateAge(dob);

      if (age < 4 || age > 18) {
        return res.status(400).json({
          message: "Age must be between 4 and 18 years",
        });
      }

      user.dateOfBirth = dob;

      // Auto-update age group based on new DOB
      const autoAgeGroup = getAgeGroupFromAge(age);
      if (autoAgeGroup) {
        user.ageGroup = autoAgeGroup;
      }
    }

    if (ageGroup !== undefined && ["4-8", "9-14", "15-18"].includes(ageGroup)) {
      user.ageGroup = ageGroup;
    }

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        username: user.username,
        dateOfBirth: user.dateOfBirth,
        ageGroup: user.ageGroup,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
});

// Get dashboard stats (admin only)
app.get("/api/admin/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalScores = await Score.countDocuments();
    const totalMemoryGames = await Score.countDocuments({ gameType: "memory" });
    const totalQuizzes = await Score.countDocuments({ gameType: "quiz" });

    const ageGroupCounts = await User.aggregate([
      { $group: { _id: "$ageGroup", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      totalUsers,
      totalScores,
      totalMemoryGames,
      totalQuizzes,
      ageGroupCounts,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
});

// Database connection (MongoDB example)
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process with failure
  });

// Start the server
const PORT = process.env.PORT || 5000; // Using a different default to avoid conflicts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
