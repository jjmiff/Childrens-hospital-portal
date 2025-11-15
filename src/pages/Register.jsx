// Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateUsername,
  validatePassword,
  validateDate,
} from "../utils/validation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    // Client-side validation
    const errors = {};
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const dobError = validateDate(dateOfBirth, "Date of birth");

    if (usernameError) errors.username = usernameError;
    if (passwordError) errors.password = passwordError;
    if (dobError) errors.dateOfBirth = dobError;

    // Additional DOB validation - must be 4-18 years old
    if (!dobError && dateOfBirth) {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }
      if (age < 4 || age > 18) {
        errors.dateOfBirth = "You must be between 4 and 18 years old";
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, dateOfBirth }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4">✍️</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Register
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                  setValidationErrors((prev) => ({
                    ...prev,
                    dateOfBirth: null,
                  }));
                }}
                min="2006-01-01"
                max={new Date().toISOString().split("T")[0]}
                className={`mt-1 block w-full rounded-lg border-2 px-3 py-2 focus:outline-none focus:ring-2 ${
                  validationErrors.dateOfBirth
                    ? "border-red-300 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
              />
              {validationErrors.dateOfBirth && (
                <p className="text-red-600 text-sm mt-1">
                  {validationErrors.dateOfBirth}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                You must be between 4 and 18 years old
              </p>
            </div>
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
                  setValidationErrors((prev) => ({ ...prev, username: null }));
                }}
                className={`mt-1 block w-full rounded-lg border-2 px-3 py-2 focus:outline-none focus:ring-2 ${
                  validationErrors.username
                    ? "border-red-300 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
              />
              {validationErrors.username && (
                <p className="text-red-600 text-sm mt-1">
                  {validationErrors.username}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                3-20 characters, letters, numbers, hyphens, and underscores only
              </p>
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
                  setValidationErrors((prev) => ({ ...prev, password: null }));
                }}
                className={`mt-1 block w-full rounded-lg border-2 px-3 py-2 focus:outline-none focus:ring-2 ${
                  validationErrors.password
                    ? "border-red-300 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
              />
              {validationErrors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {validationErrors.password}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 6 characters long
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
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
  );
}
