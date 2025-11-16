const express = require("express");
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const Score = require("./models/Score"); // Import Score model
const User = require("./models/User"); // Import User model
const Achievement = require("./models/Achievement"); // Import Achievement model
const Appointment = require("./models/Appointment"); // Import Appointment model
const Medicine = require("./models/Medicine"); // Import Medicine model
const CareTeamMember = require("./models/CareTeamMember"); // Import CareTeamMember model
const achievements = require("./config/achievementConfig"); // Achievement definitions

const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For session management
const crypto = require("crypto");
const app = express();

// Middleware to parse incoming requests
app.use(express.json());
app.use(cookieParser());

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // keep dev experience smooth; consider enabling with a tailored policy later
  })
);

// CORS: allow known frontend origins + any localhost/127.0.0.1 dev ports
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
].filter(Boolean);

const isLocalDevOrigin = (origin) => {
  try {
    const url = new URL(origin);
    return (
      (url.hostname === "localhost" || url.hostname === "127.0.0.1") &&
      /^\d+$/.test(url.port)
    );
  } catch (e) {
    return false;
  }
};

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser requests or same-origin
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || isLocalDevOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allow cookies
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

// Middleware to check medical staff role (or admin)
const staffOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || (user.userType !== "staff" && !user.isAdmin)) {
      return res
        .status(403)
        .json({ message: "Access denied. Medical staff only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error verifying staff status" });
  }
};

// Example route
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

// Lightweight health check (no secrets)
app.get("/api/health", (req, res) => {
  const stateMap = ["disconnected", "connected", "connecting", "disconnecting"];
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    db: {
      state:
        stateMap[mongoose.connection.readyState] ||
        String(mongoose.connection.readyState),
      name: mongoose.connection.name,
      host: mongoose.connection.host,
    },
  });
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
    const { username, password, dateOfBirth, userType } = req.body;

    // Basic validation
    if (!username || !password || !userType) {
      return res.status(400).json({
        message: "Username, password, and user type are required.",
      });
    }

    // Validate userType
    if (!["child", "parent", "staff"].includes(userType)) {
      return res.status(400).json({
        message: "Invalid user type. Must be 'child', 'parent', or 'staff'.",
      });
    }

    // For children, date of birth is required
    if (userType === "child" && !dateOfBirth) {
      return res.status(400).json({
        message: "Date of birth is required for child accounts.",
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    // Calculate age and age group only for children
    let age = null;
    let ageGroup = null;

    if (userType === "child") {
      age = calculateAge(dateOfBirth);
      ageGroup = getAgeGroupFromAge(age);

      if (!ageGroup) {
        return res.status(400).json({
          message:
            "You must be between 4 and 18 years old to register as a child.",
        });
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      username,
      password: hashedPassword,
      userType,
    };

    // Only include DOB and ageGroup for children
    if (userType === "child") {
      userData.dateOfBirth = new Date(dateOfBirth);
      userData.ageGroup = ageGroup;
    }

    const newUser = new User(userData);
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

    // Create refresh token (7 days by default)
    const refreshSecret = process.env.REFRESH_SECRET || process.env.JWT_SECRET;
    const refreshTtl = process.env.REFRESH_TTL || "7d";
    const jti = crypto.randomBytes(16).toString("hex");
    const refreshToken = jwt.sign(
      { sub: user._id.toString(), jti },
      refreshSecret,
      {
        expiresIn: refreshTtl,
      }
    );

    // Persist refresh token metadata on user (rotation support)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    user.refreshTokens = user.refreshTokens || [];
    user.refreshTokens.push({
      tokenId: jti,
      expiresAt,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });
    await user.save();

    // Set refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        userType: user.userType,
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
      wordScrambleStats: {
        count: 0,
        averageScore: 0,
        bestScore: 0,
        recentScores: [],
      },
      mathChallengeStats: {
        count: 0,
        averageScore: 0,
        bestScore: 0,
        recentScores: [],
      },
      patternMatchStats: {
        count: 0,
        averageScore: 0,
        bestScore: 0,
        recentScores: [],
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
      } else if (score.gameType === "word-scramble") {
        stats.wordScrambleStats.count++;
        stats.wordScrambleStats.averageScore += percentage;
        if (percentage > stats.wordScrambleStats.bestScore) {
          stats.wordScrambleStats.bestScore = percentage;
        }
        stats.wordScrambleStats.recentScores.push({
          score: percentage,
          date: score.date,
        });
      } else if (score.gameType === "math-challenge") {
        stats.mathChallengeStats.count++;
        stats.mathChallengeStats.averageScore += percentage;
        if (percentage > stats.mathChallengeStats.bestScore) {
          stats.mathChallengeStats.bestScore = percentage;
        }
        stats.mathChallengeStats.recentScores.push({
          score: percentage,
          date: score.date,
        });
      } else if (score.gameType === "pattern-match") {
        stats.patternMatchStats.count++;
        stats.patternMatchStats.averageScore += percentage;
        if (percentage > stats.patternMatchStats.bestScore) {
          stats.patternMatchStats.bestScore = percentage;
        }
        stats.patternMatchStats.recentScores.push({
          score: percentage,
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

    if (stats.wordScrambleStats.count > 0) {
      stats.wordScrambleStats.averageScore = Math.round(
        stats.wordScrambleStats.averageScore / stats.wordScrambleStats.count
      );
      stats.wordScrambleStats.recentScores =
        stats.wordScrambleStats.recentScores.slice(-10);
    }

    if (stats.mathChallengeStats.count > 0) {
      stats.mathChallengeStats.averageScore = Math.round(
        stats.mathChallengeStats.averageScore / stats.mathChallengeStats.count
      );
      stats.mathChallengeStats.recentScores =
        stats.mathChallengeStats.recentScores.slice(-10);
    }

    if (stats.patternMatchStats.count > 0) {
      stats.patternMatchStats.averageScore = Math.round(
        stats.patternMatchStats.averageScore / stats.patternMatchStats.count
      );
      stats.patternMatchStats.recentScores =
        stats.patternMatchStats.recentScores.slice(-10);
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
        userType: user.userType,
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

// ===== APPOINTMENT ROUTES =====
// Create appointment
app.post("/api/appointments", protect, async (req, res) => {
  try {
    const { title, date, location, type } = req.body;
    if (!title || !date || !location) {
      return res
        .status(400)
        .json({ message: "Title, date, and location are required." });
    }
    const apptDate = new Date(date);
    if (isNaN(apptDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format." });
    }
    const appointment = await Appointment.create({
      userId: req.user.userId,
      title,
      date: apptDate,
      location,
      type: typeof type === "string" ? type : "other",
    });
    res.status(201).json({ message: "Appointment created", appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Error creating appointment" });
  }
});

// Get user's appointments (upcoming first)
app.get("/api/appointments", protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.userId })
      .sort({ date: 1 })
      .limit(100);
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

// Update an appointment
app.patch("/api/appointments/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, location, type, notes } = req.body;
    const appointment = await Appointment.findOne({
      _id: id,
      userId: req.user.userId,
    });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (title !== undefined) appointment.title = title;
    if (location !== undefined) appointment.location = location;
    if (
      type !== undefined &&
      ["check-up", "test", "therapy", "surgery", "other"].includes(type)
    ) {
      appointment.type = type;
    }
    if (date !== undefined) {
      const newDate = new Date(date);
      if (isNaN(newDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }
      appointment.date = newDate;
    }
    if (notes !== undefined) appointment.notes = notes;
    await appointment.save();
    res.status(200).json({ message: "Appointment updated", appointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Error updating appointment" });
  }
});

// Delete an appointment
app.delete("/api/appointments/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Error deleting appointment" });
  }
});

// ===== MEDICINE ROUTES =====
// Create medicine (medical staff only)
app.post("/api/medicines", protect, staffOnly, async (req, res) => {
  try {
    const { name, dosage, frequency, time, startDate, endDate, notes, active } =
      req.body;
    if (!name) {
      return res.status(400).json({ message: "Medicine name is required." });
    }
    const med = await Medicine.create({
      userId: req.user.userId,
      name,
      dosage,
      frequency,
      time,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      notes,
      active: typeof active === "boolean" ? active : true,
      updatedBy: req.user.userId,
    });
    res.status(201).json({ message: "Medicine created", medicine: med });
  } catch (error) {
    console.error("Error creating medicine:", error);
    res.status(500).json({ message: "Error creating medicine" });
  }
});

// Get user's medicines (read-only for all authenticated users)
app.get("/api/medicines", protect, async (req, res) => {
  try {
    const meds = await Medicine.find({ userId: req.user.userId })
      .populate("updatedBy", "username userType")
      .sort({ active: -1, name: 1 })
      .limit(200);
    res.status(200).json(meds);
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ message: "Error fetching medicines" });
  }
});

// Update a medicine (medical staff only)
app.patch("/api/medicines/:id", protect, staffOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const med = await Medicine.findOne({ _id: id, userId: req.user.userId });
    if (!med) return res.status(404).json({ message: "Medicine not found" });
    const { name, dosage, frequency, time, startDate, endDate, notes, active } =
      req.body;
    if (name !== undefined) med.name = name;
    if (dosage !== undefined) med.dosage = dosage;
    if (frequency !== undefined) med.frequency = frequency;
    if (time !== undefined) med.time = time;
    if (startDate !== undefined)
      med.startDate = startDate ? new Date(startDate) : undefined;
    if (endDate !== undefined)
      med.endDate = endDate ? new Date(endDate) : undefined;
    if (notes !== undefined) med.notes = notes;
    if (active !== undefined) med.active = !!active;
    med.updatedBy = req.user.userId;
    await med.save();
    res.status(200).json({ message: "Medicine updated", medicine: med });
  } catch (error) {
    console.error("Error updating medicine:", error);
    res.status(500).json({ message: "Error updating medicine" });
  }
});

// Delete a medicine (medical staff only)
app.delete("/api/medicines/:id", protect, staffOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const med = await Medicine.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });
    if (!med) return res.status(404).json({ message: "Medicine not found" });
    res.status(200).json({ message: "Medicine deleted" });
  } catch (error) {
    console.error("Error deleting medicine:", error);
    res.status(500).json({ message: "Error deleting medicine" });
  }
});

// ===== CARE TEAM ROUTES =====
// Create care team member
app.post("/api/careteam", protect, async (req, res) => {
  try {
    const { name, role, specialty, phone, email, hospital, department, notes } =
      req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }
    const member = await CareTeamMember.create({
      userId: req.user.userId,
      name,
      role,
      specialty,
      phone,
      email,
      hospital,
      department,
      notes,
    });
    res.status(201).json({ message: "Care team member added", member });
  } catch (error) {
    console.error("Error creating care team member:", error);
    res.status(500).json({ message: "Error creating care team member" });
  }
});

// Get user's care team
app.get("/api/careteam", protect, async (req, res) => {
  try {
    const members = await CareTeamMember.find({ userId: req.user.userId })
      .sort({ role: 1, name: 1 })
      .limit(200);
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching care team:", error);
    res.status(500).json({ message: "Error fetching care team" });
  }
});

// Update a care team member
app.patch("/api/careteam/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const member = await CareTeamMember.findOne({
      _id: id,
      userId: req.user.userId,
    });
    if (!member)
      return res.status(404).json({ message: "Care team member not found" });
    const { name, role, specialty, phone, email, hospital, department, notes } =
      req.body;
    if (name !== undefined) member.name = name;
    if (role !== undefined) member.role = role;
    if (specialty !== undefined) member.specialty = specialty;
    if (phone !== undefined) member.phone = phone;
    if (email !== undefined) member.email = email;
    if (hospital !== undefined) member.hospital = hospital;
    if (department !== undefined) member.department = department;
    if (notes !== undefined) member.notes = notes;
    await member.save();
    res.status(200).json({ message: "Care team member updated", member });
  } catch (error) {
    console.error("Error updating care team member:", error);
    res.status(500).json({ message: "Error updating care team member" });
  }
});

// Delete a care team member
app.delete("/api/careteam/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const member = await CareTeamMember.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });
    if (!member)
      return res.status(404).json({ message: "Care team member not found" });
    res.status(200).json({ message: "Care team member deleted" });
  } catch (error) {
    console.error("Error deleting care team member:", error);
    res.status(500).json({ message: "Error deleting care team member" });
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

// Refresh access token using httpOnly refresh cookie
app.post("/api/users/refresh", async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const refreshSecret = process.env.REFRESH_SECRET || process.env.JWT_SECRET;
    const decoded = jwt.verify(token, refreshSecret);

    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const now = new Date();
    const existing = (user.refreshTokens || []).find(
      (rt) => rt.tokenId === decoded.jti && !rt.revokedAt && rt.expiresAt > now
    );
    if (!existing) {
      return res
        .status(401)
        .json({ message: "Refresh token invalid or expired" });
    }

    // Rotate refresh token
    existing.revokedAt = new Date();

    const newJti = crypto.randomBytes(16).toString("hex");
    const refreshTtl = process.env.REFRESH_TTL || "7d";
    const newRefreshToken = jwt.sign(
      { sub: user._id.toString(), jti: newJti },
      refreshSecret,
      { expiresIn: refreshTtl }
    );

    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    user.refreshTokens.push({
      tokenId: newJti,
      expiresAt: newExpiresAt,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });
    await user.save();

    // Set the rotated refresh token cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Issue new access token
    const payload = {
      userId: user._id,
      ageGroup: user.ageGroup,
      isAdmin: user.isAdmin,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token: accessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});

// Forgot password - generate reset token
app.post("/api/users/forgot-password", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      // Don't reveal if user exists for security
      return res.status(200).json({
        message: "If that username exists, a reset code has been generated.",
      });
    }

    // Generate 6-digit reset code
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedToken = await bcrypt.hash(resetToken, 10);

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await user.save();

    // In production, send this via email
    // For now, return it (development only!)
    console.log(`Password reset code for ${username}: ${resetToken}`);

    res.status(200).json({
      message: "If that username exists, a reset code has been generated.",
      // TODO: Remove in production - only for development
      resetToken:
        process.env.NODE_ENV === "development" ? resetToken : undefined,
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});

// Reset password with token
app.post("/api/users/reset-password", async (req, res) => {
  try {
    const { username, resetToken, newPassword } = req.body;

    if (!username || !resetToken || !newPassword) {
      return res.status(400).json({
        message: "Username, reset code, and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ username });
    if (!user || !user.passwordResetToken || !user.passwordResetExpires) {
      return res.status(400).json({ message: "Invalid or expired reset code" });
    }

    // Check if token expired
    if (new Date() > user.passwordResetExpires) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      return res.status(400).json({ message: "Reset code has expired" });
    }

    // Verify token
    const isValidToken = await bcrypt.compare(
      resetToken,
      user.passwordResetToken
    );
    if (!isValidToken) {
      return res.status(400).json({ message: "Invalid reset code" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    // Revoke all refresh tokens for security
    user.refreshTokens = [];
    await user.save();

    res
      .status(200)
      .json({ message: "Password reset successful. Please login." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
});

// Change password (for logged-in users)
app.post("/api/users/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters long" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Error changing password" });
  }
});

// Admin: Reset user password (no token needed)
app.post(
  "/api/admin/reset-user-password/:userId",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { newPassword } = req.body;

      if (!newPassword) {
        return res.status(400).json({ message: "New password is required" });
      }

      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      // Revoke all refresh tokens
      user.refreshTokens = [];
      await user.save();

      res.status(200).json({
        message: `Password reset for user ${user.username}. They can now login.`,
      });
    } catch (error) {
      console.error("Error resetting user password:", error);
      res.status(500).json({ message: "Error resetting password" });
    }
  }
);

// Logout: revoke current refresh token and clear cookie
app.post("/api/users/logout", async (req, res) => {
  const token = req.cookies.refreshToken;
  try {
    if (token) {
      const refreshSecret =
        process.env.REFRESH_SECRET || process.env.JWT_SECRET;
      const decoded = jwt.verify(token, refreshSecret, {
        ignoreExpiration: true,
      });
      const user = await User.findById(decoded.sub);
      if (user) {
        const rec = (user.refreshTokens || []).find(
          (rt) => rt.tokenId === decoded.jti && !rt.revokedAt
        );
        if (rec) {
          rec.revokedAt = new Date();
          await user.save();
        }
      }
    }
  } catch (e) {
    // ignore errors on logout
  }
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.status(200).json({ message: "Logged out" });
});

// Database connection (MongoDB example)
const mongoUri = process.env.DATABASE_URL || process.env.MONGODB_URI || "";
const dbNameFromEnv = process.env.MONGODB_DB || process.env.DB_NAME;

if (!mongoUri) {
  console.error(
    "No MongoDB URI set. Define DATABASE_URL or MONGODB_URI in backend/.env"
  );
  process.exit(1);
}

const connectOptions = {};
if (dbNameFromEnv) {
  connectOptions.dbName = dbNameFromEnv;
}

mongoose
  .connect(mongoUri, connectOptions)
  .then(() => {
    const conn = mongoose.connection;
    console.log(`Connected to MongoDB host=${conn.host} db=${conn.name}`);
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit process with failure
  });

// Start the server
const PORT = process.env.PORT || 5000; // Using a different default to avoid conflicts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
