// src/pages/Home.jsx
// Purpose: Home screen with a friendly welcome and two big tiles.
// Student notes:
// - We set the <title> for the tab (good UX).
// - Use <h1> exactly once per page (main heading).
// - Tiles are real links so keyboard/screen readers can use them.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);

  // Set the browser tab title when this page mounts
  useEffect(() => {
    document.title = "Home — Children's Hospital Portal";

    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Main intro card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center">
          {/* h1 = main title for this page */}
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🏥</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to the Children's Hospital
          </h1>

          {user && (
            <p className="text-xl text-gray-700 mb-2">
              Hello,{" "}
              <span className="font-semibold text-indigo-600">
                {user.username}
              </span>
              ! 👋
            </p>
          )}

          <p className="text-lg text-gray-600">
            {user
              ? "Explore games and fun activities below!"
              : "Start your journey through our portal!"}
          </p>
        </div>

        {/* Login/Register or Profile buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {user ? (
            <Link to="/profile" className="btn btn-primary">
              👤 My Profile
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Colorful Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Games Card */}
          <Link
            to="/games"
            className="bg-purple-100 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            aria-label="Open Games"
          >
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🎮</div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Games
              </h2>
              <p className="text-gray-600 mb-4">Play to learn and have fun</p>
              <button className="bg-white text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Explore →
              </button>
            </div>
          </Link>

          {/* Explainers Card */}
          <Link
            to="/explainers"
            className="bg-blue-100 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            aria-label="Learn About the Hospital"
          >
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🏥</div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Learn About the Hospital
              </h2>
              <p className="text-gray-600 mb-4">
                Understand hospital procedures and areas
              </p>
              <button className="bg-white text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Learn More →
              </button>
            </div>
          </Link>

          {/* FAQ Card */}
          <Link
            to="/faq"
            className="bg-green-100 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            aria-label="Open Frequently Asked Questions"
          >
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4">❓</div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                FAQ
              </h2>
              <p className="text-gray-600 mb-4">Common hospital questions</p>
              <button className="bg-white text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Find Answers →
              </button>
            </div>
          </Link>

          {/* Medical Guidance Card */}
          <Link
            to="/medical-guidance"
            className="bg-red-100 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            aria-label="Medical Help and Guides"
          >
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4">💊</div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Medical Help & Guides
              </h2>
              <p className="text-gray-600 mb-4">
                Learn about blood tests, medicine, surgery and more
              </p>
              <button className="bg-white text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Learn More →
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
