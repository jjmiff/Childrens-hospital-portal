// HospitalMap.jsx
// Purpose: Show hospital map in child-friendly way (FR-5)

import { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage";
import ContentSection from "../../components/ContentSection";

export default function HospitalMap() {
  useEffect(() => {
    document.title = "Hospital Map — Children's Hospital Portal";
  }, []);

  const areas = [
    {
      floor: "Ground Floor",
      locations: [
        "Main Entrance",
        "Reception",
        "Emergency Department",
        "Pharmacy",
        "Café",
      ],
    },
    {
      floor: "First Floor",
      locations: [
        "Children's Ward",
        "Playroom",
        "X-Ray Department",
        "Waiting Area",
      ],
    },
    {
      floor: "Second Floor",
      locations: ["MRI Scanner", "Operating Theatres", "Recovery Room"],
    },
    {
      floor: "Third Floor",
      locations: ["Specialist Clinics", "Consultation Rooms", "Family Lounge"],
    },
  ];

  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              <span aria-hidden="true">🗺️</span> Hospital Map
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              Find your way around the hospital
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
            <div className="space-y-6 md:space-y-8">
              <ContentSection
                bgColor="bg-blue-50"
                borderColor="border-blue-200"
              >
                <p className="text-blue-900 font-semibold text-center">
                  <span aria-hidden="true">📍</span> Don't worry about getting
                  lost! There are colored lines on the floor and signs
                  everywhere. You can also ask any staff member for directions.
                </p>
              </ContentSection>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Hospital Floors
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {areas.map((area, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-indigo-200"
                    >
                      <h4 className="text-lg md:text-xl font-bold text-indigo-900 mb-3">
                        {area.floor}
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {area.locations.map((loc, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-gray-700"
                          >
                            <span className="text-indigo-600">→</span>
                            <span>{loc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ContentSection
                bgColor="bg-yellow-50"
                borderColor="border-yellow-200"
              >
                <h4 className="text-base md:text-lg font-bold text-yellow-900 mb-3">
                  <span aria-hidden="true">🎨</span> Follow the Colors
                </h4>
                <p className="text-yellow-800 mb-3">
                  Many hospitals have colored lines on the floor to help you
                  find different areas:
                </p>
                <div className="grid md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-yellow-800">
                      Blue → Children's Ward
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-yellow-800">Green → Playroom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-yellow-800">Red → Emergency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <span className="text-yellow-800">
                      Purple → Radiology (X-Ray, MRI)
                    </span>
                  </div>
                </div>
                <p className="text-yellow-800 text-sm mt-3">
                  *Note: Colors may vary by hospital. Check the signs near the
                  entrance!
                </p>
              </ContentSection>

              <ContentSection
                bgColor="bg-green-50"
                borderColor="border-green-200"
              >
                <h4 className="text-base md:text-lg font-bold text-green-900 mb-3">
                  <span aria-hidden="true">💡</span> Helpful Tips
                </h4>
                <ul className="space-y-2 sm:space-y-3 text-green-800">
                  <li>
                    • Elevators have pictures showing which floor you're on
                  </li>
                  <li>• Look for landmarks like the café or gift shop</li>
                  <li>
                    • Ward names often include fun themes (Rainbow Ward,
                    Sunshine Ward, etc.)
                  </li>
                  <li>
                    • Ask your nurse to walk you to the playroom the first time
                  </li>
                  <li>
                    • Take a photo of important signs to remember your way back
                  </li>
                </ul>
              </ContentSection>

              <ContentSection
                bgColor="bg-indigo-50"
                borderColor="border-indigo-200"
              >
                <h4 className="text-base md:text-lg font-bold text-indigo-900 mb-3">
                  <span aria-hidden="true">🚨</span> Important Numbers to
                  Remember
                </h4>
                <div className="space-y-2 sm:space-y-3 text-indigo-800">
                  <p>
                    • <span className="font-bold">Your Ward Extension:</span>{" "}
                    Ask your nurse (write it down!)
                  </p>
                  <p>
                    • <span className="font-bold">Nurse Call Button:</span> In
                    every room
                  </p>
                  <p>
                    • <span className="font-bold">Security:</span> Usually
                    posted on signs
                  </p>
                </div>
              </ContentSection>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
              <Link
                to="/explainers"
                className="btn btn-primary py-2.5 px-5 md:py-3 md:px-6 text-sm md:text-base"
              >
                Back to Explainers
              </Link>
              <Link
                to="/"
                className="btn btn-secondary py-2.5 px-5 md:py-3 md:px-6 text-sm md:text-base"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
