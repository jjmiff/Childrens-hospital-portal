// achievementConfig.js
// Purpose: Define all available achievements and their unlock criteria

const achievements = {
  // First Time Achievements
  FIRST_QUIZ: {
    id: "FIRST_QUIZ",
    name: "Quiz Starter",
    description: "Complete your first quiz",
    icon: "📚",
    tier: "bronze",
  },
  FIRST_MEMORY: {
    id: "FIRST_MEMORY",
    name: "Memory Beginner",
    description: "Complete your first memory game",
    icon: "🧠",
    tier: "bronze",
  },

  // Quiz Achievements
  QUIZ_PERFECT: {
    id: "QUIZ_PERFECT",
    name: "Perfect Score",
    description: "Get 100% on a quiz",
    icon: "💯",
    tier: "gold",
  },
  QUIZ_STREAK_5: {
    id: "QUIZ_STREAK_5",
    name: "Quiz Enthusiast",
    description: "Complete 5 quizzes",
    icon: "📖",
    tier: "silver",
  },
  QUIZ_STREAK_10: {
    id: "QUIZ_STREAK_10",
    name: "Quiz Expert",
    description: "Complete 10 quizzes",
    icon: "🎓",
    tier: "gold",
  },

  // Memory Game Achievements
  MEMORY_FAST: {
    id: "MEMORY_FAST",
    name: "Speed Demon",
    description: "Complete memory game in under 30 seconds",
    icon: "⚡",
    tier: "silver",
  },
  MEMORY_EFFICIENT: {
    id: "MEMORY_EFFICIENT",
    name: "Sharp Mind",
    description: "Complete memory game with 8 or fewer moves",
    icon: "🎯",
    tier: "silver",
  },
  MEMORY_STREAK_5: {
    id: "MEMORY_STREAK_5",
    name: "Memory Master",
    description: "Complete 5 memory games",
    icon: "🧩",
    tier: "gold",
  },

  // Overall Progress
  GAMES_10: {
    id: "GAMES_10",
    name: "Getting Started",
    description: "Play 10 games total",
    icon: "🎮",
    tier: "bronze",
  },
  GAMES_25: {
    id: "GAMES_25",
    name: "Active Player",
    description: "Play 25 games total",
    icon: "🎪",
    tier: "silver",
  },
  GAMES_50: {
    id: "GAMES_50",
    name: "Super Star",
    description: "Play 50 games total",
    icon: "⭐",
    tier: "gold",
  },
};

module.exports = achievements;
