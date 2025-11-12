// src/pages/Home.jsx
// Purpose: Home screen with a friendly welcome and two big tiles.
// Student notes:
// - We set the <title> for the tab (good UX).
// - Use <h1> exactly once per page (main heading).
// - Tiles are real links so keyboard/screen readers can use them.

import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // Set the browser tab title when this page mounts
  useEffect(() => {
    document.title = "Home — Children’s Hospital Portal";
  }, []);

  return (
    <section className="space-y-6">
      {/* Main intro card */}
      <div className="card">
        {/* h1 = main title for this page */}
        <h1 className="title mb-2">Welcome to the Children’s Hospital</h1>

        <p className="text-gray-700">
          Tap below to start your fun hospital quiz or explore the portal!
        </p>
      </div>

      {/* Tiles (big tappable targets) */}
      <div className="grid gap-6">
        {/* Games tile goes to /games */}
        <Link
          to="/games"
          className="tile flex items-center gap-4"
          aria-label="Open Games"
        >
          <span className="text-3xl" aria-hidden>🎮</span>
          <span>
            <span className="text-xl font-semibold text-gray-900 block">Games</span>
            <span className="text-gray-700 block">Play to learn and have fun</span>
          </span>
        </Link>

        {/* FAQ tile:
            If you build an FAQ page, point this to /faq.
            If you plan a modal instead, change this to a <button> and open the modal in onClick. */}
        <Link
          to="/faq"           // change later if you use a modal instead
          className="tile flex items-center gap-4"
          aria-label="Open Frequently Asked Questions"
        >
          <span className="text-3xl" aria-hidden>❓</span>
          <span>
            <span className="text-xl font-semibold text-gray-900 block">FAQ</span>
            <span className="text-gray-700 block">Common hospital questions</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
