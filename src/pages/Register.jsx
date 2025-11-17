// Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateUsername,
  validatePassword,
  validateDate,
} from "../utils/validation";
import AnimatedPage from "../components/AnimatedPage";
import { API_BASE } from "../utils/api";
import ResponsiveImage from "../components/ResponsiveImage";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [userType, setUserType] = useState("child");
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

    if (usernameError) errors.username = usernameError;
    if (passwordError) errors.password = passwordError;

    // Only validate DOB for children
    if (userType === "child") {
      const dobError = validateDate(dateOfBirth, "Date of birth");
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
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const payload = { username, password, userType };

      // Only include dateOfBirth for children
      if (userType === "child") {
        payload.dateOfBirth = dateOfBirth;
      }

      const response = await fetch(`${API_BASE}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    <AnimatedPage>
      <main
        className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4"
        role="main"
        aria-label="Register page"
      >
        <div className="max-w-md md:max-w-lg mx-auto space-y-6">
          <ResponsiveImage
            name="auth-hero"
            alt="Create your account illustration"
            className="w-full h-40 object-cover rounded-xl border-2 border-gray-200 shadow max-w-xl mx-auto"
            sizes="(max-width: 640px) 100vw, 560px"
          />
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center">
            <ResponsiveImage
              name="auth-hero"
              alt="Register icon"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 object-cover rounded-lg border-2 border-gray-200 shadow"
              sizes="96px"
            />
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2"
              tabIndex={0}
            >
              Register
            </h2>
            <p className="text-gray-600" tabIndex={0}>
              Create your account to get started
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              aria-label="Registration form"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am registering as:
                </label>
                <div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                  role="group"
                  aria-label="Select user type"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setUserType("child");
                      setValidationErrors({});
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      userType === "child"
                        ? "border-indigo-500 bg-indigo-50 shadow-md"
                        : "border-gray-300 bg-white hover:border-indigo-300"
                    }`}
                    aria-label="Register as child (ages 4-18)"
                    aria-pressed={userType === "child"}
                  >
                    <div className="text-3xl mb-2" aria-hidden="true">
                      👧
                    </div>
                    <div className="font-semibold text-gray-800">Child</div>
                    <div className="text-xs text-gray-600 mt-1">Ages 4-18</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUserType("parent");
                      setValidationErrors({});
                      setDateOfBirth("");
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      userType === "parent"
                        ? "border-indigo-500 bg-indigo-50 shadow-md"
                        : "border-gray-300 bg-white hover:border-indigo-300"
                    }`}
                    aria-label="Register as parent or guardian"
                    aria-pressed={userType === "parent"}
                  >
                    <div className="text-3xl mb-2" aria-hidden="true">
                      👨‍👩‍👧
                    </div>
                    <div className="font-semibold text-gray-800">
                      Parent/Guardian
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Family access
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUserType("staff");
                      setValidationErrors({});
                      setDateOfBirth("");
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      userType === "staff"
                        ? "border-indigo-500 bg-indigo-50 shadow-md"
                        : "border-gray-300 bg-white hover:border-indigo-300"
                    }`}
                    aria-label="Register as hospital staff"
                    aria-pressed={userType === "staff"}
                  >
                    <div className="text-3xl mb-2" aria-hidden="true">
                      👨‍⚕️
                    </div>
                    <div className="font-semibold text-gray-800">Staff</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Hospital staff
                    </div>
                  </button>
                </div>
              </div>

              {userType === "child" && (
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
                />
                {validationErrors.username && (
                  <p className="text-red-600 text-sm mt-1">
                    {validationErrors.username}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  3-20 characters, letters, numbers, hyphens, and underscores
                  only
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
                className="btn btn-primary w-full h-12 md:text-lg focus:outline focus:outline-2 focus:outline-blue-600"
                disabled={isLoading}
                aria-label="Submit registration form"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:underline font-semibold focus:outline focus:outline-2 focus:outline-blue-600"
                aria-label="Go to login page"
                tabIndex={0}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
}
