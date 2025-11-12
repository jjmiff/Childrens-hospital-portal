// Games.jsx
// Purpose: Show available games as tiles. One links to the quiz.

import { useEffect } from "react";
import { Link } from "react-router-dom";

const games = [
  { icon: "✨", title: "Color Match", to: "#" },
  { icon: "📘", title: "Math Adventure", to: "#" },
  { icon: "🧩", title: "Jigsaw Fun", to: "#" },
  { icon: "⭐", title: "Memory Game", to: "#" },
  { icon: "🔤", title: "ABC Learning", to: "#" },
  { icon: "🎓", title: "Hospital Quiz", to: "/quiz" }, // links into quiz
];

export default function Games() {
  useEffect(() => {
    document.title = "Games — Children’s Hospital Portal";
  }, []);

  return (
    <section className="space-y-6">
      <div className="card">
        <h2 className="title">Games</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {games.map((g) =>
          g.to === "/quiz" ? (
            <Link
              key={g.title}
              to={g.to}
              className="tile flex items-center gap-4"
              aria-label={`Open ${g.title}`}
            >
              <div className="text-3xl" aria-hidden>{g.icon}</div>
              <div className="text-lg font-semibold text-gray-900">{g.title}</div>
            </Link>
          ) : (
            <div key={g.title} className="tile flex items-center gap-4 opacity-80" role="group" aria-label={`${g.title} (demo tile)`}>
              <div className="text-3xl" aria-hidden>{g.icon}</div>
              <div className="text-lg font-semibold text-gray-900">{g.title}</div>
            </div>
          )
        )}
      </div>

      <div className="mt-6">
        <Link to="/" className="btn btn-secondary" aria-label="Back to Home">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
