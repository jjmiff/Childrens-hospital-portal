// components/Footer.jsx
// Purpose: Footer with links and copyright info

import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-200 to-sky-200 border-t-2 border-blue-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  to="/explainers"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Learn About Hospital
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Hospital Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Hospital Areas</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/explainers/mri"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  MRI Scanner
                </Link>
              </li>
              <li>
                <Link
                  to="/explainers/xray"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  X-Ray Room
                </Link>
              </li>
              <li>
                <Link
                  to="/explainers/ward"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Hospital Ward
                </Link>
              </li>
              <li>
                <Link
                  to="/explainers/playroom"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Play Areas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-3">
              Ask your nurse, doctor, or any hospital staff member for
              assistance.
            </p>
            <div className="flex gap-3 text-gray-600">
              <span className="text-2xl" aria-hidden="true">
                🏥
              </span>
              <span className="text-2xl" aria-hidden="true">
                💙
              </span>
              <span className="text-2xl" aria-hidden="true">
                ✨
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>
            © {currentYear} Children's Hospital Portal. Made with{" "}
            <span className="text-red-500" aria-label="love">
              ❤️
            </span>{" "}
            for children's healthcare.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            This is an educational prototype for the Children's Wing of the
            Local Hospital.
          </p>
        </div>
      </div>
    </footer>
  );
}
