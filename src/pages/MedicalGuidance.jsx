// MedicalGuidance.jsx
// Purpose: Hub page for medical event guidance (FR-6)
// Lists different medical events with links to detailed guides

import { Link } from "react-router-dom";
import { getAgeGroup, getAgeGroupLabel } from "../utils/userUtils";
import AnimatedPage from "../components/AnimatedPage";
import ResponsiveImage from "../components/ResponsiveImage";

export default function MedicalGuidance() {
  const ageGroup = getAgeGroup();
  const ageLabel = ageGroup ? getAgeGroupLabel(ageGroup) : null;
  const tipByAge = {
    "4-8": "Simple guides with pictures and friendly steps.",
    "9-14": "Clear explanations of what happens and how to prepare.",
    "15-18":
      "Detailed info, expectations, and practical tips for independence.",
    default: "Helpful guides about common hospital events.",
  };
  const tipText = ageGroup ? tipByAge[ageGroup] : tipByAge.default;
  const medicalEvents = [
    {
      title: "Having a Blood Test",
      description: "Learn what happens when you need to have blood taken",
      icon: "💉",
      color: "bg-red-100",
      route: "/medical-guidance/blood-test",
    },
    {
      title: "Getting Ready for Surgery",
      description: "What to expect before, during, and after an operation",
      icon: "🏥",
      color: "bg-blue-100",
      route: "/medical-guidance/surgery",
    },
    {
      title: "Taking Your Medicine",
      description: "Tips for taking tablets, liquid medicine, and injections",
      icon: "💊",
      color: "bg-purple-100",
      route: "/medical-guidance/medicine",
    },
    {
      title: "Hospital School",
      description: "Keep learning while you're in hospital",
      icon: "📚",
      color: "bg-green-100",
      route: "/medical-guidance/school",
    },
  ];

  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center">
            <ResponsiveImage
              name="explainers-pharmacy"
              alt="Medical guidance icon"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 object-cover rounded-lg border-2 border-gray-200 shadow"
              sizes="96px"
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Medical Help & Guides
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find out what to expect during different medical events. Click on
              any card below to learn more! 🌟
            </p>
            <div className="mt-4 inline-block rounded-xl border-2 border-yellow-300 bg-yellow-100 px-4 py-3">
              {ageLabel ? (
                <p className="text-gray-800">
                  <span className="font-semibold">For {ageLabel}:</span>{" "}
                  {tipText}
                </p>
              ) : (
                <p className="text-gray-800">{tipText}</p>
              )}
            </div>
          </div>

          {/* Medical Event Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {medicalEvents.map((event, index) => (
              <Link
                key={index}
                to={event.route}
                className={`${event.color} rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-200`}
              >
                {/* Icon */}
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4 text-center">
                  {event.icon}
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
                  {event.title}
                </h2>

                {/* Description */}
                <p className="text-gray-700 text-center mb-4">
                  {event.description}
                </p>

                {/* Read More Button */}
                <div className="text-center">
                  <span className="inline-block bg-white px-4 py-2 rounded-lg font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className="bg-yellow-100 rounded-2xl p-4 sm:p-6 border-2 border-yellow-300">
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
              💡 Need More Help?
            </h3>
            <p className="text-gray-700 text-center mb-4">
              If you have questions about anything medical, you can always ask:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">👨‍⚕️</span>
                <span>Your doctor or nurse</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">👨‍👩‍👧</span>
                <span>Your parents or guardians</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎮</span>
                <span>The play specialist on your ward</span>
              </li>
            </ul>
          </div>

          {/* Back to Home Button */}
          <div className="text-center pt-4">
            <Link
              to="/"
              className="inline-block bg-sky-200 hover:bg-sky-300 text-gray-800 font-bold py-3 px-8 rounded-xl transition-colors shadow-md"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
