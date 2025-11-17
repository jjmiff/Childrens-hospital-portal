// Explainers.jsx
// Purpose: Hub page for departmental explainers (FR-5)
// Links to information about different hospital areas

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAgeGroup, getAgeGroupLabel } from "../utils/userUtils";
import AnimatedPage from "../components/AnimatedPage";
import ResponsiveImage from "../components/ResponsiveImage";

const departments = [
  {
    id: "mri",
    icon: "🔬",
    image: "mri-tile",
    title: "MRI Scanner",
    description: "A big camera that takes pictures inside your body",
    to: "/explainers/mri",
  },
  {
    id: "xray",
    icon: "📷",
    image: "explainers-xray",
    title: "X-Ray Room",
    description: "Special photos that show your bones",
    to: "/explainers/xray",
  },
  {
    id: "ward",
    icon: "🛏️",
    image: "explainers-ward",
    title: "Hospital Ward",
    description: "Your room and where you'll stay",
    to: "/explainers/ward",
  },
  {
    id: "playroom",
    icon: "🎨",
    image: "explainers-ward",
    title: "Play Areas",
    description: "Fun places to play and do activities",
    to: "/explainers/playroom",
  },
  {
    id: "theatre",
    icon: "🏥",
    image: "explainers-surgery",
    title: "Operating Theatre",
    description: "The special room where operations happen",
    to: "/explainers/theatre",
  },
  {
    id: "aande",
    icon: "🚑",
    image: "explainers-aande",
    title: "A&E Department",
    description: "Accident & Emergency — when you need help right away",
    to: "/explainers/aande",
  },
  {
    id: "map",
    icon: "🗺️",
    image: "explainers-pharmacy",
    title: "Hospital Map",
    description: "Find your way around the hospital",
    to: "/explainers/map",
  },
];

export default function Explainers() {
  useEffect(() => {
    document.title = "Hospital Explainers — Children's Hospital Portal";
  }, []);

  // Simple age-based tip to guide the user
  const ageGroup = getAgeGroup();
  const ageLabel = ageGroup ? getAgeGroupLabel(ageGroup) : null;
  const tipByAge = {
    "4-8": "Tap a tile to see friendly pictures and simple explanations.",
    "9-14": "Learn how each area works with clear steps and useful tips.",
    "15-18": "Explore detailed info to help you feel prepared and confident.",
    default: "Click a tile to learn more about each hospital area.",
  };
  const tipText = ageGroup ? tipByAge[ageGroup] : tipByAge.default;

  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center">
            <ResponsiveImage
              name="explainers-ward"
              alt="Explainers icon"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 object-cover rounded-lg border-2 border-gray-200 shadow"
              sizes="96px"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Learn About the Hospital
            </h2>
            <p className="text-lg text-gray-600">
              Click on any area below to learn more about different parts of the
              hospital!
            </p>
            {/* Age-based helper banner */}
            <div className="mt-6 rounded-xl border-2 border-yellow-300 bg-yellow-100 p-4">
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

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, index) => {
              const colors = [
                "bg-blue-100",
                "bg-green-100",
                "bg-purple-100",
                "bg-orange-100",
                "bg-pink-100",
                "bg-cyan-100",
              ];
              const colorClass = colors[index % colors.length];

              return (
                <Link
                  key={dept.id}
                  to={dept.to}
                  className={`${colorClass} rounded-2xl p-4 sm:p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200`}
                  aria-label={`Learn about ${dept.title}`}
                >
                  <div className="text-center">
                    <ResponsiveImage
                      name={dept.image}
                      alt={`${dept.title} illustration`}
                      className="w-24 h-24 mx-auto mb-4 object-cover rounded-lg"
                      sizes="96px"
                    />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {dept.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{dept.description}</p>
                    <button className="bg-white text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      Learn More →
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="inline-block bg-sky-200 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-sky-300 transition-colors shadow-md"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
