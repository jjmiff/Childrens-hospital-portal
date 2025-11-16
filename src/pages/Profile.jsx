// Profile.jsx
// Purpose: User profile page showing avatar, username, and age group (FR-2)

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
// Removed direct UI imports now handled inside extracted tab components
import OverviewTab from "../components/profile/OverviewTab";
import StatsTab from "../components/profile/StatsTab";
import AchievementsTab from "../components/profile/AchievementsTab";
import AvatarEditModal from "../components/profile/AvatarEditModal";
import { useAuth } from "../hooks/useAuth";
import AnimatedPage from "../components/AnimatedPage";

export default function Profile() {
  const { user: authUser, logout, updateUser: updateAuthUser } = useAuth();
  const [user, setUser] = useState(authUser);
  const [scores, setScores] = useState([]);
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My Profile — Children's Hospital Portal";

    // User comes from useAuth hook
    if (!authUser) {
      navigate("/login");
    } else {
      setUser(authUser);
    }
  }, [navigate, authUser]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch recent scores
    apiFetch("/api/scores", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setScores(Array.isArray(data) ? data.slice(0, 5) : []))
      .catch(() => setScores([]));

    // Fetch user statistics for charts
    apiFetch("/api/users/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setStats(data))
      .catch(() => setStats(null));

    // Fetch achievements
    apiFetch("/api/users/achievements", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setAchievements(data))
      .catch(() => setAchievements(null));
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleEditAvatar = () => {
    setNewAvatar(user.avatar || "");
    setIsEditingAvatar(true);
  };

  const handleCancelEdit = () => {
    setIsEditingAvatar(false);
    setNewAvatar("");
  };

  const handleSaveAvatar = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await apiFetch("/api/users/profile", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar: newAvatar }),
      });

      if (res.ok) {
        const data = await res.json();
        // Update user state and auth context
        const updatedUser = { ...user, avatar: data.user.avatar };
        setUser(updatedUser);
        updateAuthUser({ avatar: data.user.avatar });
        setIsEditingAvatar(false);
        alert("Avatar updated successfully!");
      } else {
        const data = await res.json();
        alert(data.message || "Error updating avatar");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Error updating avatar");
    }
  };

  if (!user) {
    return null;
  }

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

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
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

  const currentAge = user?.dateOfBirth ? calculateAge(user.dateOfBirth) : null;

  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              👤 My Profile
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 sm:gap-4 max-w-2xl mx-auto flex-wrap mb-6 sm:mb-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                activeTab === "overview"
                  ? "bg-mint-400 text-gray-900 shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              📋 Overview
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                activeTab === "stats"
                  ? "bg-mint-400 text-gray-900 shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              📊 Statistics
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                activeTab === "achievements"
                  ? "bg-mint-400 text-gray-900 shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              🏆 Achievements
            </button>
          </div>

          {activeTab === "overview" && (
            <OverviewTab
              user={user}
              stats={stats}
              achievements={achievements}
              scores={scores}
              currentAge={currentAge}
              onEditAvatar={handleEditAvatar}
              onLogout={handleLogout}
            />
          )}

          {activeTab === "stats" && <StatsTab stats={stats} />}
          {activeTab === "achievements" && (
            <AchievementsTab achievements={achievements} />
          )}

          {/* Avatar Edit Modal */}
          {isEditingAvatar && (
            <AvatarEditModal
              value={newAvatar}
              onChange={setNewAvatar}
              onSave={handleSaveAvatar}
              onCancel={handleCancelEdit}
            />
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}
