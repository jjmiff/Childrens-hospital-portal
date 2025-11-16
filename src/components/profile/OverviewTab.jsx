import React from "react";
import { Link } from "react-router-dom";
import { StatCardSkeleton } from "../LoadingSkeleton";

// OverviewTab: avatar, profile info, stats summary, recent scores, health hub, quick actions, action buttons
export default function OverviewTab({
  user,
  stats,
  achievements,
  scores,
  currentAge,
  onEditAvatar,
  onLogout,
}) {
  if (!user) return null;

  const getAgeGroupLabel = (ageGroup) => {
    switch (ageGroup) {
      case "4-8":
        return "Younger Kids (4-8 years)";
      case "9-14":
        return "Older Kids (9-14 years)";
      case "15-18":
        return "Teens (15-18 years)";
      default:
        return ageGroup;
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      {/* Avatar Display */}
      <div className="text-center mb-6">
        <div className="text-8xl mb-4" role="img" aria-label="Your avatar">
          {user.avatar || "🧒"}
        </div>
        <button
          onClick={onEditAvatar}
          className="text-sm px-4 py-2 rounded-lg bg-mint-300 text-gray-900 hover:bg-mint-400 font-semibold transition"
        >
          ✏️ Change Avatar
        </button>
        <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-4">
          {user.username}
        </h3>
        <div className="badge inline-flex items-center gap-2">
          <span>👥</span>
          <span>{getAgeGroupLabel(user.ageGroup)}</span>
        </div>
      </div>

      {/* Profile Info */}
      <div className="space-y-4 mt-6 bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          Profile Information
        </h4>
        <div className="grid gap-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Username:</span>
            <span className="font-semibold text-gray-900">{user.username}</span>
          </div>
          {currentAge && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Age:</span>
              <span className="font-semibold text-gray-900">
                {currentAge} years old
              </span>
            </div>
          )}
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Age Group:</span>
            <span className="font-semibold text-gray-900">
              {getAgeGroupLabel(user.ageGroup)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Avatar:</span>
            <span className="text-3xl">{user.avatar || "🧒"}</span>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      {!stats && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      )}
      {stats && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
            <div className="text-2xl mb-1">🎮</div>
            <div className="text-2xl font-bold text-blue-900">
              {stats.totalGames || 0}
            </div>
            <div className="text-xs text-blue-700 font-semibold">
              Total Games
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
            <div className="text-2xl mb-1">📘</div>
            <div className="text-2xl font-bold text-purple-900">
              {stats.quizStats?.count || 0}
            </div>
            <div className="text-xs text-purple-700 font-semibold">Quizzes</div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border-2 border-pink-200">
            <div className="text-2xl mb-1">🧠</div>
            <div className="text-2xl font-bold text-pink-900">
              {stats.memoryStats?.count || 0}
            </div>
            <div className="text-xs text-pink-700 font-semibold">
              Memory Games
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border-2 border-yellow-200">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-2xl font-bold text-yellow-900">
              {achievements?.unlocked?.length || 0}
            </div>
            <div className="text-xs text-yellow-700 font-semibold">
              Achievements
            </div>
          </div>
        </div>
      )}

      {/* Recent Scores */}
      <div className="mt-6 p-6 rounded-xl border-2 border-mint-200 bg-white">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span>🧮</span> Recent Scores
        </h4>
        {scores.length === 0 ? (
          <p className="text-gray-700">
            No scores yet — play a game to see results here!
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {scores.map((s, i) => (
              <li key={i} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden>
                    {(() => {
                      const iconMap = {
                        quiz: "📘",
                        memory: "🧠",
                        "word-scramble": "📝",
                        "math-challenge": "🔢",
                        "pattern-match": "🧩",
                      };
                      return iconMap[s.gameType] || "🎮";
                    })()}
                  </span>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {(() => {
                        const nameMap = {
                          quiz: "Quiz",
                          memory: "Memory",
                          "word-scramble": "Word Scramble",
                          "math-challenge": "Math Challenge",
                          "pattern-match": "Pattern Match",
                        };
                        return nameMap[s.gameType] || s.gameType;
                      })()}{" "}
                      {" — "}
                      {s.score}/{s.total}
                    </div>
                    {s.gameType === "memory" &&
                    (s.moves != null || s.seconds != null) ? (
                      <div className="text-sm text-gray-700">
                        {s.moves != null && <>Moves: {s.moves}</>}
                        {s.moves != null && s.seconds != null && " • "}
                        {s.seconds != null && <>Time: {s.seconds}s</>}
                      </div>
                    ) : null}
                    <div className="text-sm text-gray-600">
                      {new Date(s.date).toLocaleString()}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* My Health Features */}
      <div className="mt-6 bg-gradient-to-br from-mint-50 to-blue-50 rounded-xl p-6 border-2 border-mint-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>🏥</span> My Health Hub
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/my-calendar"
            className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📅</span>
              <div>
                <h4 className="font-semibold text-blue-900">My Calendar</h4>
                <p className="text-sm text-blue-700">View appointments</p>
              </div>
            </div>
          </Link>
          <Link
            to="/my-medicines"
            className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">💊</span>
              <div>
                <h4 className="font-semibold text-purple-900">My Medicines</h4>
                <p className="text-sm text-purple-700">Track medications</p>
              </div>
            </div>
          </Link>
          <Link
            to="/my-care-team"
            className="bg-green-50 rounded-xl p-4 border-2 border-green-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">👥</span>
              <div>
                <h4 className="font-semibold text-green-900">My Care Team</h4>
                <p className="text-sm text-green-700">Meet your doctors</p>
              </div>
            </div>
          </Link>
          <Link
            to="/my-medical-info"
            className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <h4 className="font-semibold text-orange-900">Medical Info</h4>
                <p className="text-sm text-orange-700">Your health records</p>
              </div>
            </div>
          </Link>
          <Link
            to="/accessibility"
            className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">♿</span>
              <div>
                <h4 className="font-semibold text-yellow-900">Accessibility</h4>
                <p className="text-sm text-yellow-700">
                  Text size, contrast & more
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>⚡</span> Quick Actions
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/games"
            className="bg-white hover:bg-mint-50 rounded-lg p-3 border-2 border-gray-200 hover:border-mint-300 transition text-center"
          >
            <div className="text-3xl mb-1">🎮</div>
            <div className="text-xs font-semibold text-gray-700">
              Play Games
            </div>
          </Link>
          <Link
            to="/my-calendar"
            className="bg-white hover:bg-blue-50 rounded-lg p-3 border-2 border-gray-200 hover:border-blue-300 transition text-center"
          >
            <div className="text-3xl mb-1">📅</div>
            <div className="text-xs font-semibold text-gray-700">
              Appointments
            </div>
          </Link>
          <Link
            to="/my-medicines"
            className="bg-white hover:bg-purple-50 rounded-lg p-3 border-2 border-gray-200 hover:border-purple-300 transition text-center"
          >
            <div className="text-3xl mb-1">💊</div>
            <div className="text-xs font-semibold text-gray-700">Medicines</div>
          </Link>
          <Link
            to="/medical-guidance"
            className="bg-white hover:bg-green-50 rounded-lg p-3 border-2 border-gray-200 hover:border-green-300 transition text-center"
          >
            <div className="text-3xl mb-1">📚</div>
            <div className="text-xs font-semibold text-gray-700">Learn</div>
          </Link>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link
          to="/change-password"
          className="btn bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200"
        >
          🔒 Change Password
        </Link>
        <button
          onClick={onLogout}
          className="btn bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
