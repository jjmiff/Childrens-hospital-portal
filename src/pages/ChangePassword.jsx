// ChangePassword.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getToken } from "../utils/auth";
import AnimatedPage from "../components/AnimatedPage";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password");
      return;
    }

    setIsLoading(true);

    try {
      const token = getToken();
      const response = await fetch(
        "http://localhost:5000/api/users/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setSuccess(data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Redirect to profile after 2 seconds
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
        <div className="max-w-md md:max-w-lg mx-auto space-y-5 sm:space-y-6">
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center">
            <div
              className="text-4xl sm:text-5xl md:text-6xl mb-4"
              aria-hidden="true"
            >
              🔒
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Change Password
            </h2>
            <p className="text-gray-600">Update your account password</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg">
            <form
              onSubmit={handleChangePassword}
              className="space-y-4"
              aria-label="Change password form"
            >
              {error && (
                <div
                  className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg"
                  role="alert"
                  aria-live="assertive"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg"
                  role="alert"
                  aria-live="polite"
                >
                  {success}
                  <p className="text-sm mt-1">Redirecting to profile...</p>
                </div>
              )}

              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter current password"
                  disabled={success}
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter new password"
                  disabled={success}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Confirm new password"
                  disabled={success}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 6 characters
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full h-12 md:text-lg"
                disabled={isLoading || success}
              >
                {isLoading ? "Changing..." : "Change Password"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <Link
                to="/profile"
                className="text-indigo-600 hover:underline font-semibold"
              >
                ← Back to Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
