import React from "react";

const BadgeDisplay = ({ achievements }) => {
  if (!achievements) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">Loading achievements...</p>
      </div>
    );
  }

  const { unlocked, total, allAchievements } = achievements;

  // Group by tier
  const unlockedIds = new Set(unlocked.map((a) => a.id));
  const locked = allAchievements.filter((a) => !unlockedIds.has(a.id));

  const getTierColor = (tier) => {
    switch (tier) {
      case "gold":
        return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900";
      case "silver":
        return "bg-gradient-to-br from-gray-300 to-gray-400 text-gray-900";
      case "bronze":
        return "bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Summary */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">🏆 Achievements</h3>
          <div className="text-lg font-semibold text-gray-700">
            {unlocked.length} / {total}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-mint-400 to-mint-300 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(unlocked.length / total) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Unlocked Achievements */}
      {unlocked.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4">
            ✨ Earned Badges
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlocked.map((achievement) => (
              <div
                key={achievement.id}
                className={`${getTierColor(
                  achievement.tier
                )} rounded-lg p-4 shadow-lg transform hover:scale-105 transition-all`}
              >
                <div className="text-center">
                  <div className="text-5xl mb-2">{achievement.icon}</div>
                  <h5 className="font-bold text-lg mb-1">{achievement.name}</h5>
                  <p className="text-sm mb-2">{achievement.description}</p>
                  <p className="text-xs opacity-75">
                    Unlocked:{" "}
                    {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {locked.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4">
            🔒 Locked Badges
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locked.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg p-4 opacity-60"
              >
                <div className="text-center">
                  <div className="text-5xl mb-2 grayscale">
                    {achievement.icon}
                  </div>
                  <h5 className="font-bold text-lg mb-1 text-gray-700">
                    {achievement.name}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;
