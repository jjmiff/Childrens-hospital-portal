// AdminDashboard.jsx
// Purpose: Admin control panel for managing users, scores, and viewing statistics

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import { getUser, isAuthenticated } from "../utils/auth";
import AnimatedPage from "../components/AnimatedPage";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);
  const [activeTab, setActiveTab] = useState("stats");
  const [loading, setLoading] = useState(true);
  const [usersQuery, setUsersQuery] = useState("");
  const [scoresQuery, setScoresQuery] = useState("");
  const [gameFilter, setGameFilter] = useState("all");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Dashboard — Children's Hospital Portal";

    // Check if user is admin
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const parsedUser = getUser();
    if (!parsedUser || !parsedUser.isAdmin) {
      alert("Access denied. Admin only.");
      navigate("/");
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  useEffect(() => {
    if (!user?.isAdmin) return;

    // Fetch initial stats
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      const res = await apiFetch("/api/admin/stats", {});
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await apiFetch("/api/admin/users", {});
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchScores = async () => {
    try {
      const res = await apiFetch("/api/admin/scores", {});
      if (res.ok) {
        const data = await res.json();
        setScores(data);
      }
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  const exportScoresCsv = (list) => {
    const effective = Array.isArray(list) ? list : scores;
    if (!effective || effective.length === 0) return;
    const headers = [
      "username",
      "ageGroup",
      "gameType",
      "score",
      "total",
      "moves",
      "seconds",
      "date",
    ];

    const rows = effective.map((s) => [
      s.userId?.username || "",
      s.userId?.ageGroup || "",
      s.gameType || "",
      s.score ?? "",
      s.total ?? "",
      s.moves ?? "",
      s.seconds ?? "",
      s.date ? new Date(s.date).toISOString() : "",
    ]);

    const csv = [headers, ...rows]
      .map((r) =>
        r
          .map((v) => {
            const val = String(v ?? "");
            // escape quotes and wrap if needed
            const needsWrap = /[",\n]/.test(val);
            const escaped = val.replace(/"/g, '""');
            return needsWrap ? `"${escaped}"` : escaped;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `scores-export-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "users" && users.length === 0) {
      fetchUsers();
    } else if (tab === "scores" && scores.length === 0) {
      fetchScores();
    }
  };

  const handleDeleteUser = async (userId, username) => {
    const typed = window.prompt(
      `Type the username exactly to confirm deletion of "${username}". This will also delete all their scores.`
    );
    if (typed === null) return; // cancelled
    if (typed !== username) {
      alert("Username did not match. Deletion cancelled.");
      return;
    }

    try {
      const res = await apiFetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("User deleted successfully");
        fetchUsers();
        fetchStats();
      } else {
        const data = await res.json();
        alert(data.message || "Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  const handleToggleAdmin = async (userId, username, currentStatus) => {
    const action = currentStatus ? "remove admin from" : "promote to admin";
    if (
      !window.confirm(`Are you sure you want to ${action} user "${username}"?`)
    ) {
      return;
    }

    try {
      const res = await apiFetch(`/api/admin/users/${userId}/toggle-admin`, {
        method: "PATCH",
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.message || "Error updating admin status");
      }
    } catch (error) {
      console.error("Error toggling admin:", error);
      alert("Error updating admin status");
    }
  };

  const handleResetUserPassword = async (userId, username) => {
    const newPassword = window.prompt(
      `Enter a new password for user "${username}" (min 6 characters):`
    );

    if (newPassword === null) return; // cancelled

    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    const confirm = window.confirm(
      `Are you sure you want to reset the password for "${username}"? They will need to use the new password to login.`
    );

    if (!confirm) return;

    try {
      const res = await apiFetch(`/api/admin/reset-user-password/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message);
      } else {
        const data = await res.json();
        alert(data.message || "Error resetting password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Error resetting password");
    }
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
    setEditForm({
      username: userToEdit.username,
      dateOfBirth: userToEdit.dateOfBirth
        ? new Date(userToEdit.dateOfBirth).toISOString().split("T")[0]
        : "",
      ageGroup: userToEdit.ageGroup,
      avatar: userToEdit.avatar,
    });
  };

  const handleCloseEdit = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const handleSaveEdit = async () => {
    try {
      const payload = {
        username: editForm.username,
        ageGroup: editForm.ageGroup,
        avatar: editForm.avatar,
      };

      // Only include dateOfBirth if it's set
      if (editForm.dateOfBirth) {
        payload.dateOfBirth = editForm.dateOfBirth;
      }

      const res = await apiFetch(`/api/admin/users/${editingUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message || "User updated successfully");
        fetchUsers();
        handleCloseEdit();
      } else {
        const data = await res.json();
        alert(data.message || "Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Loading admin dashboard...</p>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <AnimatedPage>
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="title mb-2">🛡️ Admin Dashboard</h2>
          <p className="text-gray-600">
            Manage users, scores, and view statistics
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => handleTabChange("stats")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === "stats"
                ? "bg-mint-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            📊 Statistics
          </button>
          <button
            onClick={() => handleTabChange("users")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === "users"
                ? "bg-mint-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            👥 Users
          </button>
          <button
            onClick={() => handleTabChange("scores")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === "scores"
                ? "bg-mint-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            🏆 Scores
          </button>
        </div>

        {/* Stats Tab */}
        {activeTab === "stats" && stats && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-blue-700">
                  {stats.totalUsers}
                </p>
              </div>
              <div className="card bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                <h3 className="text-sm font-semibold text-green-900 mb-1">
                  Total Scores
                </h3>
                <p className="text-3xl font-bold text-green-700">
                  {stats.totalScores}
                </p>
              </div>
              <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
                <h3 className="text-sm font-semibold text-purple-900 mb-1">
                  Memory Games
                </h3>
                <p className="text-3xl font-bold text-purple-700">
                  {stats.totalMemoryGames}
                </p>
              </div>
              <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
                <h3 className="text-sm font-semibold text-orange-900 mb-1">
                  Quizzes
                </h3>
                <p className="text-3xl font-bold text-orange-700">
                  {stats.totalQuizzes}
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Users by Age Group
              </h3>
              <div className="space-y-3">
                {stats.ageGroupCounts.map((group) => (
                  <div
                    key={group._id}
                    className="flex items-center justify-between py-2 border-b border-gray-200"
                  >
                    <span className="font-semibold text-gray-700">
                      {group._id === "4-8" && "Younger Kids (4-8)"}
                      {group._id === "9-14" && "Older Kids (9-14)"}
                      {group._id === "15-18" && "Teens (15-18)"}
                    </span>
                    <span className="text-2xl font-bold text-mint-600">
                      {group.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="max-w-6xl mx-auto">
            <div className="card">
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <h3 className="text-lg font-bold text-gray-900">
                  All Users ({users.length})
                </h3>
                <input
                  value={usersQuery}
                  onChange={(e) => setUsersQuery(e.target.value)}
                  placeholder="Search users by username or age group..."
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full md:w-80"
                />
              </div>
              {users.length === 0 ? (
                <p className="text-gray-600">No users found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 px-3">Username</th>
                        <th className="text-left py-2 px-3">Age</th>
                        <th className="text-left py-2 px-3">Age Group</th>
                        <th className="text-left py-2 px-3">Avatar</th>
                        <th className="text-left py-2 px-3">Admin</th>
                        <th className="text-left py-2 px-3">Created</th>
                        <th className="text-right py-2 px-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter((u) => {
                          const q = usersQuery.trim().toLowerCase();
                          if (!q) return true;
                          return (
                            u.username.toLowerCase().includes(q) ||
                            (u.ageGroup || "").toLowerCase().includes(q)
                          );
                        })
                        .map((u) => (
                          <tr
                            key={u._id}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="py-3 px-3 font-semibold">
                              {u.username}
                            </td>
                            <td className="py-3 px-3 text-sm">
                              {u.dateOfBirth ? (
                                <>
                                  {(() => {
                                    const today = new Date();
                                    const birthDate = new Date(u.dateOfBirth);
                                    let age =
                                      today.getFullYear() -
                                      birthDate.getFullYear();
                                    const monthDiff =
                                      today.getMonth() - birthDate.getMonth();
                                    if (
                                      monthDiff < 0 ||
                                      (monthDiff === 0 &&
                                        today.getDate() < birthDate.getDate())
                                    ) {
                                      age--;
                                    }
                                    return age;
                                  })()}{" "}
                                  years
                                  <div className="text-xs text-gray-500">
                                    {new Date(
                                      u.dateOfBirth
                                    ).toLocaleDateString()}
                                  </div>
                                </>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="py-3 px-3">{u.ageGroup}</td>
                            <td className="py-3 px-3 text-2xl">{u.avatar}</td>
                            <td className="py-3 px-3">
                              {u.isAdmin ? (
                                <span className="badge bg-yellow-100 text-yellow-800 border border-yellow-300">
                                  ⭐ Admin
                                </span>
                              ) : (
                                <span className="text-gray-500">—</span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-sm text-gray-600">
                              {new Date(u.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="flex flex-wrap gap-2 justify-end">
                                <button
                                  onClick={() => handleEditUser(u)}
                                  className="text-sm px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 border border-green-300 font-medium transition-colors"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleResetUserPassword(u._id, u.username)
                                  }
                                  className="text-sm px-3 py-1.5 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300 font-medium transition-colors"
                                  title="Reset user's password"
                                >
                                  🔑 Reset PW
                                </button>
                                <button
                                  onClick={() =>
                                    handleToggleAdmin(
                                      u._id,
                                      u.username,
                                      u.isAdmin
                                    )
                                  }
                                  className="text-sm px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={u._id === user.id}
                                >
                                  {u.isAdmin
                                    ? "⭐ Remove Admin"
                                    : "⭐ Make Admin"}
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteUser(u._id, u.username)
                                  }
                                  className="text-sm px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={u._id === user.id}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Scores Tab */}
        {activeTab === "scores" && (
          <div className="max-w-6xl mx-auto">
            <div className="card">
              <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Scores ({scores.length})
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    value={scoresQuery}
                    onChange={(e) => setScoresQuery(e.target.value)}
                    placeholder="Search by username..."
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-56"
                  />
                  <select
                    value={gameFilter}
                    onChange={(e) => setGameFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    aria-label="Filter by game type"
                  >
                    <option value="all">All Games</option>
                    <option value="memory">Memory</option>
                    <option value="quiz">Quiz</option>
                  </select>
                  <button
                    onClick={() =>
                      exportScoresCsv(
                        scores.filter((s) => {
                          const q = scoresQuery.trim().toLowerCase();
                          const matchesName = q
                            ? (s.userId?.username || "")
                                .toLowerCase()
                                .includes(q)
                            : true;
                          const matchesGame =
                            gameFilter === "all" || s.gameType === gameFilter;
                          return matchesName && matchesGame;
                        })
                      )
                    }
                    className="text-sm px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800"
                  >
                    ⬇️ Export CSV
                  </button>
                </div>
              </div>
              {scores.length === 0 ? (
                <p className="text-gray-600">No scores found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 px-3">User</th>
                        <th className="text-left py-2 px-3">Game</th>
                        <th className="text-left py-2 px-3">Score</th>
                        <th className="text-left py-2 px-3">Metrics</th>
                        <th className="text-left py-2 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scores
                        .filter((s) => {
                          const q = scoresQuery.trim().toLowerCase();
                          const matchesName = q
                            ? (s.userId?.username || "")
                                .toLowerCase()
                                .includes(q)
                            : true;
                          const matchesGame =
                            gameFilter === "all" || s.gameType === gameFilter;
                          return matchesName && matchesGame;
                        })
                        .map((s) => (
                          <tr
                            key={s._id}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="py-3 px-3">
                              <div>
                                <div className="font-semibold">
                                  {s.userId?.username || "Unknown"}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {s.userId?.ageGroup}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <span className="badge">
                                {s.gameType === "memory"
                                  ? "🧠 Memory"
                                  : "📘 Quiz"}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-semibold">
                              {s.score}/{s.total}
                            </td>
                            <td className="py-3 px-3 text-sm text-gray-600">
                              {s.gameType === "memory" &&
                              (s.moves != null || s.seconds != null) ? (
                                <div>
                                  {s.moves != null && (
                                    <div>Moves: {s.moves}</div>
                                  )}
                                  {s.seconds != null && (
                                    <div>Time: {s.seconds}s</div>
                                  )}
                                </div>
                              ) : (
                                "—"
                              )}
                            </td>
                            <td className="py-3 px-3 text-sm text-gray-600">
                              {new Date(s.date).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-center">
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Back to Home
          </button>
        </div>

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Edit User: {editingUser.username}
              </h3>

              <div className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) =>
                      setEditForm({ ...editForm, username: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-400"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={editForm.dateOfBirth}
                    onChange={(e) =>
                      setEditForm({ ...editForm, dateOfBirth: e.target.value })
                    }
                    min="2006-01-01"
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-400"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Age must be between 4 and 18 years
                  </p>
                </div>

                {/* Age Group */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Age Group
                  </label>
                  <select
                    value={editForm.ageGroup}
                    onChange={(e) =>
                      setEditForm({ ...editForm, ageGroup: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-400"
                  >
                    <option value="4-8">4-8 years (Younger Kids)</option>
                    <option value="9-14">9-14 years (Older Kids)</option>
                    <option value="15-18">15-18 years (Teens)</option>
                  </select>
                </div>

                {/* Avatar */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Avatar
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={editForm.avatar}
                      onChange={(e) =>
                        setEditForm({ ...editForm, avatar: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-400"
                      placeholder="Enter emoji"
                    />
                    <span className="text-4xl">{editForm.avatar || "🧒"}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Suggested: 🧒 👦 👧 🧑 👶 🧑‍🦱 👩‍🦰 🧔
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-2 bg-mint-400 text-gray-900 font-semibold rounded-lg hover:bg-mint-300 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCloseEdit}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </AnimatedPage>
  );
}
