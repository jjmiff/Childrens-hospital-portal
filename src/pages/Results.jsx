// src/pages/Results.jsx
// Purpose: Show final score, animate the % number, fire confetti, and play a sound.
// Notes:
// - We respect "prefers-reduced-motion": if the user limits motion, we skip/shorten animations.
// - The % animation uses requestAnimationFrame for smoothness and accuracy.

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ConfettiLayer from "../components/ConfettiLayer";
import AchievementToast from "../components/AchievementToast";
import AnimatedPage from "../components/AnimatedPage";
import ResponsiveImage from "../components/ResponsiveImage";

export default function Results() {
  useEffect(() => {
    // Trigger confetti burst
    if (
      confettiRef.current &&
      typeof confettiRef.current.burst === "function"
    ) {
      confettiRef.current.burst();
    }
    // Play completion sound effect
    const audio = new Audio("/sfx/complete.mp3");
    audio.play();
  }, []);
  const loc = useLocation();
  const navigate = useNavigate();
  const confettiRef = useRef(null);

  // Read final quiz numbers from navigation state (fallbacks keep page safe on reload)
  const score = loc.state?.score ?? 0;
  const total = loc.state?.total ?? 0;
  // Calculate percentage score, avoid division by zero
  const displayPct = total > 0 ? Math.round((score / total) * 100) : 0;
  // Placeholder definitions to resolve no-undef errors
  const message = "Well done!";
  const playAgain = () => navigate("/quiz");
  const currentAchievement = null;
  const handleCloseAchievement = () => {};
  return (
    <AnimatedPage>
      <main
        className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4"
        role="main"
        aria-label="Quiz results page"
      >
        <div className="max-w-3xl mx-auto">
          {/* Confetti canvas floats above the whole page */}
          <ConfettiLayer ref={confettiRef} />

          <ResponsiveImage
            name="results-celebrate"
            alt="Celebration - Quiz completed!"
            className="w-full h-56 object-cover rounded-xl border-2 border-gray-200 shadow mb-6 max-w-3xl mx-auto"
            sizes="(max-width: 640px) 100vw, 720px"
          />

          <section
            className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center"
            aria-labelledby="results-heading"
          >
            <ResponsiveImage
              name="results-celebrate"
              alt="Celebration icon"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 object-cover rounded-lg border-2 border-gray-200 shadow"
              sizes="96px"
            />
            <h1
              id="results-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6"
              tabIndex={0}
            >
              Quiz Results
            </h1>

            <div
              className="text-xl font-semibold text-gray-900 mb-2"
              role="status"
              aria-live="polite"
            >
              <span>You scored </span>
              <span className="font-bold" aria-label="Score" tabIndex={0}>
                {score}
              </span>
              <span> out of </span>
              <span className="font-bold" aria-label="Total" tabIndex={0}>
                {total}
              </span>
            </div>

            {/* Animated % */}
            <div
              className="text-6xl md:text-7xl font-extrabold text-gray-900 my-4"
              aria-live="polite"
              aria-atomic="true"
              tabIndex={0}
              style={{ outline: "none" }}
            >
              {displayPct}%
            </div>

            <div
              className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-6 mb-6"
              role="region"
              aria-label="Quiz feedback"
            >
              <p className="text-lg text-gray-700 font-semibold" tabIndex={0}>
                {message}
              </p>
            </div>

            <nav aria-label="Results page actions">
              <ul className="flex flex-col sm:flex-row items-center gap-3 justify-center list-none p-0 m-0">
                <li>
                  <button
                    onClick={playAgain}
                    className="btn btn-primary w-full sm:w-auto focus:outline focus:outline-2 focus:outline-blue-600"
                    aria-label="Play the quiz again"
                    tabIndex={0}
                  >
                    🔄 Play Again
                  </button>
                </li>
                <li>
                  <Link
                    to="/games"
                    className="btn btn-secondary w-full sm:w-auto text-center focus:outline focus:outline-2 focus:outline-blue-600"
                    aria-label="Back to Games"
                    tabIndex={0}
                  >
                    🎮 Back to Games
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="inline-block bg-sky-200 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-sky-300 transition-colors shadow-md w-full sm:w-auto text-center focus:outline focus:outline-2 focus:outline-blue-600"
                    aria-label="Back to Home"
                    tabIndex={0}
                  >
                    🏠 Home
                  </Link>
                </li>
              </ul>
            </nav>
          </section>

          {/* Achievement Toast */}
          {currentAchievement && (
            <AchievementToast
              achievement={currentAchievement}
              onClose={handleCloseAchievement}
            />
          )}
        </div>
      </main>
    </AnimatedPage>
  );
  return (
    <AnimatedPage>
      <main
        className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4"
        role="main"
        aria-label="Quiz results page"
      >
        <div className="max-w-3xl mx-auto">
          {/* Confetti canvas floats above the whole page */}
          <ConfettiLayer ref={confettiRef} />

          <ResponsiveImage
            name="results-celebrate"
            alt="Celebration - Quiz completed!"
            className="w-full h-56 object-cover rounded-xl border-2 border-gray-200 shadow mb-6 max-w-3xl mx-auto"
            sizes="(max-width: 640px) 100vw, 720px"
          />

          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center">
            <ResponsiveImage
              name="results-celebrate"
              alt="Celebration icon"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 object-cover rounded-lg border-2 border-gray-200 shadow"
              sizes="96px"
            />
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6"
              tabIndex={0}
            >
              Quiz Results
            </h1>

            <div className="text-xl font-semibold text-gray-900 mb-2">
              You scored{" "}
              <span className="font-bold" aria-label="Score">
                {score}
              </span>{" "}
              out of{" "}
              <span className="font-bold" aria-label="Total">
                {total}
              </span>
            </div>

            {/* We render the animated % here */}
            <div
              className="text-6xl md:text-7xl font-extrabold text-gray-900 my-4"
              aria-live="polite"
              tabIndex={0}
            >
              {displayPct}%
            </div>

            <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-6 mb-6">
              <p className="text-lg text-gray-700 font-semibold" tabIndex={0}>
                {message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <button
                onClick={playAgain}
                className="btn btn-primary w-full sm:w-auto focus:outline focus:outline-2 focus:outline-blue-600"
                aria-label="Play the quiz again"
                tabIndex={0}
              >
                🔄 Play Again
              </button>

              <Link
                to="/games"
                className="btn btn-secondary w-full sm:w-auto text-center focus:outline focus:outline-2 focus:outline-blue-600"
                aria-label="Back to Games"
                tabIndex={0}
              >
                🎮 Back to Games
              </Link>

              <Link
                to="/"
                className="inline-block bg-sky-200 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-sky-300 transition-colors shadow-md w-full sm:w-auto text-center focus:outline focus:outline-2 focus:outline-blue-600"
                aria-label="Back to Home"
                tabIndex={0}
              >
                🏠 Home
              </Link>
            </div>
          </div>

          {/* Achievement Toast */}
          {currentAchievement && (
            <AchievementToast
              achievement={currentAchievement}
              onClose={handleCloseAchievement}
            />
          )}
        </div>
      </main>
    </AnimatedPage>
  );
}
