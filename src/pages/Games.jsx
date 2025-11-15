import React from "react";
import { Link, useLocation } from "react-router-dom";

function Games() {
  const location = useLocation();
  const { ageGroup } = location.state || {};

  const getAgeTip = () => {
    if (!ageGroup) return null;

    const tips = {
      "6-10":
        "Games are designed to be fun and educational, helping you learn while playing!",
      "11-14":
        "Challenge yourself with these engaging games that build important skills!",
      "15-18":
        "Test your abilities with advanced challenges designed for your age group!",
    };

    return tips[ageGroup];
  };

  const games = [
    {
      id: "quiz",
      name: "Quiz Challenge",
      description: "Test your knowledge with fun trivia questions",
      icon: "🧠",
      path: "/quiz",
      color: "green",
    },
    {
      id: "memory",
      name: "Memory Match",
      description: "Match pairs of cards to improve your memory",
      icon: "🎴",
      path: "/memory-game",
      color: "purple",
    },
    {
      id: "scramble",
      name: "Word Scramble",
      description: "Unscramble letters to form the correct word",
      icon: "📝",
      path: "/word-scramble",
      color: "cyan",
    },
    {
      id: "math",
      name: "Math Challenge",
      description: "Solve math problems and improve your skills",
      icon: "🔢",
      path: "/math-challenge",
      color: "orange",
    },
    {
      id: "pattern",
      name: "Pattern Match",
      description: "Remember and match the pattern sequence",
      icon: "🎯",
      path: "/pattern-match",
      color: "pink",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Choose Your Game
          </h1>
          <p className="text-xl text-gray-600">
            Pick a game below and start having fun while learning!
          </p>
        </header>

        {/* Age-based tip */}
        {getAgeTip() && (
          <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-6 mb-8 text-center">
            <p className="text-lg text-gray-700">
              <span className="font-semibold">💡 Tip:</span> {getAgeTip()}
            </p>
          </div>
        )}

        {/* Games Grid */}
        <section aria-label="Available games">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {games.map((game) => (
              <Link
                key={game.id}
                to={game.path}
                state={{ ageGroup }}
                aria-label={`Play ${game.name}: ${game.description}`}
                className={`bg-${game.color}-100 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200`}
              >
                <div className="text-center">
                  <div
                    className="text-4xl sm:text-5xl md:text-6xl mb-4"
                    aria-hidden="true"
                  >
                    {game.icon}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    {game.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{game.description}</p>
                  <span className="bg-white text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block">
                    Play Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Game Tips Section */}
        <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🎮 Game Tips
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700">
                <span className="font-semibold">Brain Boost:</span> Regular play
                improves memory and concentration
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700">
                <span className="font-semibold">Challenge Yourself:</span> Try
                harder difficulties as you improve
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700">
                <span className="font-semibold">Take Breaks:</span> Rest between
                games to stay focused
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700">
                <span className="font-semibold">Track Progress:</span> Check
                your profile to see improvements
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-sky-200 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-sky-300 transition-colors shadow-md"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Games;
