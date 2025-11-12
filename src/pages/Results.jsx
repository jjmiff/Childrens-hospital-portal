// src/pages/Results.jsx
// Purpose: Show final score, animate the % number, fire confetti, and play a sound.
// Notes:
// - We respect "prefers-reduced-motion": if the user limits motion, we skip/shorten animations.
// - The % animation uses requestAnimationFrame for smoothness and accuracy.

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ConfettiLayer from "../components/ConfettiLayer";

export default function Results() {
  const loc = useLocation();
  const navigate = useNavigate();
  const confettiRef = useRef(null);

  // Read final quiz numbers from navigation state (fallbacks keep page safe on reload)
  const score = loc.state?.score ?? 0;
  const total = loc.state?.total ?? 0;
  const finalPct = total > 0 ? Math.round((score / total) * 100) : 0;

  // This is the animated number we actually render
  const [displayPct, setDisplayPct] = useState(0);

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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  // When the user wants to play again we navigate back with a restart flag
  const playAgain = () => navigate("/quiz", { state: { restart: true } });

  return (
    <section className="space-y-6">
      {/* Confetti canvas floats above the whole page */}
      <ConfettiLayer ref={confettiRef} />

      <div className="card max-w-3xl mx-auto text-center">
        <h1 className="title mb-2">Quiz Results</h1>

        <div className="badge mx-auto mb-4" aria-hidden="true">
          <span>🌟</span>
          <span>Well done!</span>
        </div>

        <div className="text-xl font-semibold text-gray-900 mb-2">
          You scored <span className="font-bold">{score}</span> out of{" "}
          <span className="font-bold">{total}</span>
        </div>

        {/* We render the animated % here */}
        <div className="text-6xl md:text-7xl font-extrabold text-gray-900 my-4" aria-live="polite">
          {displayPct}%
        </div>

        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={playAgain}
            className="btn btn-primary"
            aria-label="Play the quiz again"
          >
            Play Again
          </button>

          <Link to="/" className="btn btn-secondary" aria-label="Back to Home">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
