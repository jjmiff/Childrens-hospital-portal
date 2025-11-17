// AccessibilitySettings.jsx
// Page for managing accessibility preferences

import { Link } from "react-router-dom";
import { useAccessibility } from "../contexts/AccessibilityContext";
import AnimatedPage from "../components/AnimatedPage";
import { useEffect } from "react";
import ResponsiveImage from "../components/ResponsiveImage";

export default function AccessibilitySettings() {
  const {
    highContrast,
    setHighContrast,
    textSize,
    setTextSize,
    reducedMotion,
    setReducedMotion,
  } = useAccessibility();

  useEffect(() => {
    document.title = "Accessibility Settings — Children's Hospital Portal";
  }, []);

  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
        <div className="max-w-3xl mx-auto">
          <ResponsiveImage
            name="a11y-hero"
            alt="Accessibility settings illustration"
            className="w-full h-40 object-cover rounded-xl border-2 border-gray-200 shadow mb-6 max-w-xl mx-auto"
            sizes="(max-width: 640px) 100vw, 560px"
          />
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <ResponsiveImage
                  name="a11y-hero"
                  alt="Accessibility icon"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 object-cover rounded-lg border-2 border-gray-200 shadow"
                  sizes="96px"
                />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Accessibility Settings
                </h1>
                <p className="text-base sm:text-lg text-gray-600">
                  Make the portal work better for you
                </p>
              </div>

              {/* High Contrast */}
              <section className="bg-blue-50 rounded-2xl p-4 sm:p-6 border-2 border-blue-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span>🎨</span>
                      <span>High Contrast Mode</span>
                    </h2>
                    <p className="text-gray-700 mb-3">
                      Makes colors stronger and easier to see. Great if you have
                      trouble reading the screen.
                    </p>
                  </div>
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    role="switch"
                    aria-checked={highContrast}
                    aria-label={`High contrast mode ${
                      highContrast ? "on" : "off"
                    }`}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-mint-400 focus:ring-offset-2 ${
                      highContrast ? "bg-mint-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        highContrast ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="mt-3">
                  <span
                    className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${
                      highContrast
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}
                  >
                    {highContrast ? "On" : "Off"}
                  </span>
                </div>
              </section>

              {/* Text Size */}
              <section className="bg-yellow-50 rounded-2xl p-4 sm:p-6 border-2 border-yellow-300">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🔤</span>
                  <span>Text Size</span>
                </h2>
                <p className="text-gray-700 mb-4">
                  Choose how big you want the text to appear on the screen.
                </p>
                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                  role="radiogroup"
                  aria-label="Text size options"
                >
                  {["small", "normal", "large", "xlarge"].map((size) => (
                    <button
                      key={size}
                      role="radio"
                      aria-checked={textSize === size}
                      onClick={() => setTextSize(size)}
                      className={`py-3 px-4 rounded-lg font-bold border-2 transition-all focus:outline-none focus:ring-2 focus:ring-mint-400 ${
                        textSize === size
                          ? "bg-mint-300 border-mint-500 text-gray-900"
                          : "bg-white border-gray-300 text-gray-700 hover:border-mint-400"
                      }`}
                      style={{
                        fontSize:
                          size === "small"
                            ? "0.875rem"
                            : size === "normal"
                            ? "1rem"
                            : size === "large"
                            ? "1.125rem"
                            : "1.25rem",
                      }}
                    >
                      {size === "small"
                        ? "Aa"
                        : size === "normal"
                        ? "Aa"
                        : size === "large"
                        ? "Aa"
                        : "Aa"}
                      <div className="text-xs mt-1 capitalize">{size}</div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Reduced Motion */}
              <section className="bg-purple-50 rounded-2xl p-4 sm:p-6 border-2 border-purple-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span>🎬</span>
                      <span>Reduce Motion</span>
                    </h2>
                    <p className="text-gray-700 mb-3">
                      Turns off animations and moving effects. Helpful if
                      animations make you feel dizzy or distracted.
                    </p>
                  </div>
                  <button
                    onClick={() => setReducedMotion(!reducedMotion)}
                    role="switch"
                    aria-checked={reducedMotion}
                    aria-label={`Reduced motion ${
                      reducedMotion ? "on" : "off"
                    }`}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-mint-400 focus:ring-offset-2 ${
                      reducedMotion ? "bg-mint-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        reducedMotion ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="mt-3">
                  <span
                    className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${
                      reducedMotion
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}
                  >
                    {reducedMotion ? "On" : "Off"}
                  </span>
                </div>
              </section>

              {/* Info box */}
              <section className="bg-green-50 rounded-2xl p-4 sm:p-6 border-2 border-green-200">
                <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
                  <span>💡</span>
                  <span>Did You Know?</span>
                </h3>
                <p className="text-gray-700">
                  Your settings are saved automatically on this device. You can
                  change them anytime to make the portal more comfortable for
                  you!
                </p>
              </section>

              {/* Navigation */}
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  to="/profile"
                  className="bg-sky-200 hover:bg-sky-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors shadow-md"
                >
                  ← Back to Profile
                </Link>
                <Link
                  to="/"
                  className="bg-mint-200 hover:bg-mint-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors shadow-md"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
