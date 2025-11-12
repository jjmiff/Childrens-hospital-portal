// App.js
// Purpose: App shell + routes. Adds a "Skip to content" link for accessibility.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

export default function App() {
  return (
    <Router>
      {/* Skip link lets keyboard users jump to main content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white border border-gray-300 rounded-xl px-3 py-2 shadow"
      >
        Skip to content
      </a>

      <div className="min-h-screen flex flex-col">
        {/* Simple header. Big title is easy to find. */}
        <header className="py-8 text-center">
          <h1 className="title">Children's Hospital Portal</h1>
        </header>

        {/* Main content area. The id="main" is the skip link target. */}
        <main id="main" className="flex-1 px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
