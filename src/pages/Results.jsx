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

export default function Results() {
  const loc = useLocation();
  const navigate = useNavigate();
  const confettiRef = useRef(null);

  // Read final quiz numbers from navigation state (fallbacks keep page safe on reload)
  const score = loc.state?.score ?? 0;
  const total = loc.state?.total ?? 0;
  const newAchievements = loc.state?.newAchievements ?? [];
  const finalPct = total > 0 ? Math.round((score / total) * 100) : 0;

  // This is the animated number we actually render
  const [displayPct, setDisplayPct] = useState(0);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  // Choose a friendly message based on the final % (not the animated value)
  const message =
    finalPct === 100
      ? "Amazing — you got them all!"
      : finalPct >= 75
      ? "Great work!"
      : finalPct >= 40
      ? "Nice effort — keep going!"
      : "Practice makes progress — try again and you'll improve!";

  // 1) Animate the percentage 0 → finalPct
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // If the user prefers reduced motion, just jump straight to the final number
    if (reduced) {
      setDisplayPct(finalPct);
      return;
    }

    // Use requestAnimationFrame for smooth animation
    const duration = 900; // ms (feel free to tweak)
    const start = performance.now();

    // Simple easing so numbers ramp up quickly then slow down at the end
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    let rafId = 0;
    const frame = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const current = Math.round(eased * finalPct);

      setDisplayPct(current);

      if (t < 1) {
        rafId = requestAnimationFrame(frame);
      }
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [finalPct]);

  // 2) Confetti + completion sound (small delay lets the card render first)
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const t = setTimeout(() => {
      if (!reduced && confettiRef.current?.burst) {
        confettiRef.current.burst();
      }
      const win = new Audio("/sfx/complete.mp3");
      win.volume = reduced ? 0.2 : 0.5;
      win.play().catch(() => {});
    }, 250);

    return () => clearTimeout(t);
  }, []);

  // Show achievement toasts one at a time
  useEffect(() => {
    if (newAchievements.length > 0 && !currentAchievement) {
      // Show first achievement after a brief delay
      const timer = setTimeout(() => {
        setCurrentAchievement(newAchievements[0]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [newAchievements, currentAchievement]);

  const handleCloseAchievement = () => {
    const currentIndex = newAchievements.indexOf(currentAchievement);
    if (currentIndex < newAchievements.length - 1) {
      // Show next achievement
      setTimeout(() => {
        setCurrentAchievement(newAchievements[currentIndex + 1]);
      }, 500);
    } else {
      setCurrentAchievement(null);
    }
  };

  // When the user wants to play again we navigate back with a restart flag
  const playAgain = () => navigate("/quiz", { state: { restart: true } });

  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Confetti canvas floats above the whole page */}
          <ConfettiLayer ref={confettiRef} />

          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🎉</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Quiz Results
            </h1>

            <div className="text-xl font-semibold text-gray-900 mb-2">
              You scored <span className="font-bold">{score}</span> out of{" "}
              <span className="font-bold">{total}</span>
            </div>

            {/* We render the animated % here */}
            <div
              className="text-6xl md:text-7xl font-extrabold text-gray-900 my-4"
              aria-live="polite"
            >
              {displayPct}%
            </div>

            <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-6 mb-6">
              <p className="text-lg text-gray-700 font-semibold">{message}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <button
                onClick={playAgain}
                className="btn btn-primary w-full sm:w-auto"
                aria-label="Play the quiz again"
              >
                🔄 Play Again
              </button>

              <Link
                to="/games"
                className="btn btn-secondary w-full sm:w-auto text-center"
                aria-label="Back to Games"
              >
                🎮 Back to Games
              </Link>

              <Link
                to="/"
                className="inline-block bg-sky-200 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-sky-300 transition-colors shadow-md w-full sm:w-auto text-center"
                aria-label="Back to Home"
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
      </div>
    </AnimatedPage>
  );
}
