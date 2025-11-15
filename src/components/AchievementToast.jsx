import React, { useEffect } from "react";

const AchievementToast = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const getTierColor = (tier) => {
    switch (tier) {
      case "gold":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 border-yellow-700";
      case "silver":
        return "bg-gradient-to-r from-gray-300 to-gray-400 border-gray-500";
      case "bronze":
        return "bg-gradient-to-r from-orange-400 to-orange-600 border-orange-700";
      default:
        return "bg-gradient-to-r from-blue-400 to-blue-600 border-blue-700";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-bounce">
      <div
        className={`${getTierColor(
          achievement.tier
        )} border-4 rounded-xl shadow-2xl p-6 max-w-sm transform transition-all`}
      >
        <div className="flex items-start gap-4">
          <div className="text-6xl">{achievement.icon}</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">
              🎉 Achievement Unlocked!
            </h3>
            <h4 className="text-lg font-semibold text-white mb-1">
              {achievement.name}
            </h4>
            <p className="text-sm text-white opacity-90">
              {achievement.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default AchievementToast;
