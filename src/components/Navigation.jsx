// components/Navigation.jsx
// Purpose: Main navigation header with user info and logout

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromStorage, logout } from "../utils/userUtils";

export default function Navigation() {
  const user = getUserFromStorage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Focus first link when menu opens
      const firstLink = mobileMenuRef.current?.querySelector("a, button");
      firstLink?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-gradient-to-r from-blue-200 to-sky-200 border-b-2 border-blue-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={closeMobileMenu}
          >
            <span className="text-3xl" aria-hidden="true">
              🏥
            </span>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                Children's Hospital Portal
              </h1>
              {user && (
                <p className="text-xs text-gray-600">
                  Welcome, {user.username}!
                </p>
              )}
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-3 md:gap-4">
            <Link
              to="/games"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
              aria-label="Games"
            >
              <span className="text-xl" aria-hidden="true">
                🎮
              </span>
              <span>Games</span>
            </Link>

            <Link
              to="/explainers"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
              aria-label="Learn"
            >
              <span className="text-xl" aria-hidden="true">
                🏥
              </span>
              <span>Learn</span>
            </Link>

            <Link
              to="/medical-guidance"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
              aria-label="Medical Help"
            >
              <span className="text-xl" aria-hidden="true">
                💊
              </span>
              <span>Help</span>
            </Link>

            <Link
              to="/faq"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
              aria-label="FAQ"
            >
              <span className="text-xl" aria-hidden="true">
                ❓
              </span>
              <span>FAQ</span>
            </Link>

            {user ? (
              <>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors text-yellow-800 font-medium border border-yellow-300"
                    aria-label="Admin Dashboard"
                  >
                    <span className="text-xl" aria-hidden="true">
                      🛡️
                    </span>
                    <span>Admin</span>
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                  aria-label="My Profile"
                >
                  <span className="text-xl" aria-hidden="true">
                    👤
                  </span>
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors text-red-700 font-medium text-sm"
                  aria-label="Logout"
                >
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-small">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-small">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden mt-4 pb-4 border-t border-blue-300 pt-4"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col gap-2">
              <Link
                to="/games"
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                onClick={closeMobileMenu}
              >
                <span className="text-xl" aria-hidden="true">
                  🎮
                </span>
                <span>Games</span>
              </Link>

              <Link
                to="/explainers"
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                onClick={closeMobileMenu}
              >
                <span className="text-xl" aria-hidden="true">
                  🏥
                </span>
                <span>Learn</span>
              </Link>

              <Link
                to="/medical-guidance"
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                onClick={closeMobileMenu}
              >
                <span className="text-xl" aria-hidden="true">
                  💊
                </span>
                <span>Medical Help</span>
              </Link>

              <Link
                to="/faq"
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                onClick={closeMobileMenu}
              >
                <span className="text-xl" aria-hidden="true">
                  ❓
                </span>
                <span>FAQ</span>
              </Link>

              {user ? (
                <>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-4 py-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors text-yellow-800 font-medium border border-yellow-300"
                      onClick={closeMobileMenu}
                    >
                      <span className="text-xl" aria-hidden="true">
                        🛡️
                      </span>
                      <span>Admin</span>
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                    onClick={closeMobileMenu}
                  >
                    <span className="text-xl" aria-hidden="true">
                      👤
                    </span>
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors text-red-700 font-medium text-left"
                  >
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-secondary"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
