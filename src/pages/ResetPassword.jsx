// ResetPassword.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { API_BASE } from "../utils/api";
import ResponsiveImage from "../components/ResponsiveImage";

export default function ResetPassword() {
  const [username, setUsername] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!username || !resetToken || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, resetToken, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setSuccess(data.message);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
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
          <ResponsiveImage
            name="auth-hero"
            alt="Reset password illustration"
            className="w-full h-40 object-cover rounded-xl border-2 border-gray-200 shadow max-w-xl mx-auto"
            sizes="(max-width: 640px) 100vw, 560px"
          />
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center">
            <ResponsiveImage
              name="auth-hero"
              alt="Reset password icon"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 object-cover rounded-lg border-2 border-gray-200 shadow"
              sizes="96px"
            />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Reset Password
            </h2>
            <p className="text-gray-600">
              Enter your reset code and new password
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg">
            <form
              onSubmit={handleResetPassword}
              className="space-y-4"
              aria-label="Reset password form"
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
                  <p className="text-sm mt-1">Redirecting to login...</p>
                </div>
              )}

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your username"
                />
              </div>

              <div>
                <label
                  htmlFor="resetToken"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reset Code
                </label>
                <input
                  id="resetToken"
                  type="text"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-lg"
                  placeholder="6-digit code"
                  maxLength={6}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter the 6-digit code you received
                </p>
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
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Confirm new password"
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
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <div className="mt-6 space-y-2 text-center text-sm">
              <p>
                Don't have a code?{" "}
                <Link
                  to="/forgot-password"
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  Request Reset Code
                </Link>
              </p>
              <p>
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
