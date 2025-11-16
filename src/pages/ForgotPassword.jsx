// ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { API_BASE } from "../utils/api";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username) {
      setError("Username is required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to request reset");
      }

      setSuccess(data.message);

      // In development, show the token
      if (data.resetToken) {
        setResetToken(data.resetToken);
        setShowToken(true);
      }
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
              🔐
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Forgot Password
            </h2>
            <p className="text-gray-600">
              Enter your username to receive a reset code
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg">
            <form
              onSubmit={handleRequestReset}
              className="space-y-4"
              aria-label="Forgot password form"
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
                </div>
              )}

              {showToken && resetToken && (
                <div className="bg-blue-50 border-2 border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
                  <p className="font-semibold mb-2">
                    Your reset code (for development only):
                  </p>
                  <p className="text-2xl font-mono font-bold text-center py-2">
                    {resetToken}
                  </p>
                  <p className="text-sm mt-2">
                    Use this code on the{" "}
                    <Link
                      to="/reset-password"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Reset Password
                    </Link>{" "}
                    page. Code expires in 15 minutes.
                  </p>
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
                  placeholder="Enter your username"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full h-12 md:text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Requesting..." : "Request Reset Code"}
              </button>
            </form>

            <div className="mt-6 space-y-2 text-center text-sm">
              <p>
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  Login
                </Link>
              </p>
              <p>
                Already have a code?{" "}
                <Link
                  to="/reset-password"
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  Reset Password
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
