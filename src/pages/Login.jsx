// Login.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { validateRequired } from "../utils/validation";
import { setAuthData } from "../utils/auth";
import AnimatedPage from "../components/AnimatedPage";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page they tried to visit, or default to home
  const from = location.state?.from?.pathname || "/";
  const sessionMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    // Client-side validation
    const errors = {};
    const usernameError = validateRequired(username, "Username");
    const passwordError = validateRequired(password, "Password");

    if (usernameError) errors.username = usernameError;
    if (passwordError) errors.password = passwordError;

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Required for httpOnly cookies
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      // Store token and user info using centralized auth utility
      setAuthData(data.token, data.user);

      // Redirect to the page they tried to visit, or home
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
        <div className="max-w-md md:max-w-lg mx-auto space-y-6">
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center">
            <div
              className="text-4xl sm:text-5xl md:text-6xl mb-4"
              aria-hidden="true"
            >
              🔑
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Login
            </h2>
            <p className="text-gray-600">Welcome back to your portal</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              aria-label="Login form"
            >
              {sessionMessage && (
                <div
                  className="bg-yellow-50 border-2 border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg"
                  role="alert"
                  aria-live="polite"
                >
                  {sessionMessage}
                </div>
              )}
              {error && (
                <div
                  className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg"
                  role="alert"
                  aria-live="assertive"
                >
                  {error}
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
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setValidationErrors((prev) => ({
                      ...prev,
                      username: null,
                    }));
                  }}
                  className={`mt-1 block w-full rounded-lg border-2 px-3 py-2 focus:outline-none focus:ring-2 ${
                    validationErrors.username
                      ? "border-red-300 focus:ring-red-400"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                  aria-invalid={validationErrors.username ? "true" : "false"}
                  aria-describedby={
                    validationErrors.username ? "username-error" : undefined
                  }
                />
                {validationErrors.username && (
                  <p
                    id="username-error"
                    className="text-red-600 text-sm mt-1"
                    role="alert"
                  >
                    {validationErrors.username}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setValidationErrors((prev) => ({
                      ...prev,
                      password: null,
                    }));
                  }}
                  className={`mt-1 block w-full rounded-lg border-2 px-3 py-2 focus:outline-none focus:ring-2 ${
                    validationErrors.password
                      ? "border-red-300 focus:ring-red-400"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                  aria-invalid={validationErrors.password ? "true" : "false"}
                  aria-describedby={
                    validationErrors.password ? "password-error" : undefined
                  }
                />
                {validationErrors.password && (
                  <p
                    id="password-error"
                    className="text-red-600 text-sm mt-1"
                    role="alert"
                  >
                    {validationErrors.password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full h-12 md:text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="mt-4 space-y-2 text-center text-sm">
              <p>
                <Link
                  to="/forgot-password"
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  Forgot password?
                </Link>
              </p>
              <p>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
