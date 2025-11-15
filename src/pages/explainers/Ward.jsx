// Ward.jsx
// Purpose: Explain hospital ward in child-friendly way (FR-5)

import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Ward() {
  useEffect(() => {
    document.title = "Hospital Ward — Children's Hospital Portal";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            🛏️ Hospital Ward
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            Your room and where you'll stay
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                What is a Ward?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A ward is the name for the area where patient rooms are located.
                Think of it like a special neighborhood in the hospital where
                you'll have your own room or share a room with other kids. It's
                your home away from home while you're here!
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
              <h4 className="text-lg font-bold text-purple-900 mb-2">
                🏠 What's in Your Room?
              </h4>
              <ul className="space-y-2 text-purple-800">
                <li>• A bed with buttons to make it go up and down</li>
                <li>• A call button to get help from nurses anytime</li>
                <li>• A TV (in most rooms)</li>
                <li>• A small closet or drawer for your things</li>
                <li>• A bathroom</li>
                <li>• A chair for visitors</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Who Will You Meet?
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex gap-3">
                  <span className="text-2xl">👨‍⚕️</span>
                  <div>
                    <p className="font-bold">Doctors</p>
                    <p>They check on you and decide what treatment you need</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">👩‍⚕️</span>
                  <div>
                    <p className="font-bold">Nurses</p>
                    <p>
                      They give you medicine, check your temperature, and help
                      with anything you need
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">🧹</span>
                  <div>
                    <p className="font-bold">Cleaning Staff</p>
                    <p>They keep your room clean and tidy</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">🍽️</span>
                  <div>
                    <p className="font-bold">Food Service</p>
                    <p>They bring your meals</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <h4 className="text-lg font-bold text-blue-900 mb-2">
                📋 Ward Rules
              </h4>
              <ul className="space-y-2 text-blue-800">
                <li>• Wash your hands often, especially before eating</li>
                <li>
                  • Use the call button if you need help - don't get out of bed
                  alone
                </li>
                <li>• Keep your room tidy so staff can move around safely</li>
                <li>• Quiet time is usually in the afternoon and at night</li>
                <li>• Visitors have specific hours (ask your nurse)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Daily Routine
              </h3>
              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <p className="font-bold text-yellow-900">Morning (7-9 AM)</p>
                  <p className="text-yellow-800">
                    Breakfast, washing up, doctor's rounds
                  </p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <p className="font-bold text-orange-900">
                    Daytime (9 AM - 5 PM)
                  </p>
                  <p className="text-orange-800">
                    Treatments, activities, lunch, visiting time
                  </p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                  <p className="font-bold text-indigo-900">Evening (5-9 PM)</p>
                  <p className="text-indigo-800">
                    Dinner, quiet activities, bedtime routine
                  </p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
                  <p className="font-bold text-gray-900">Night (9 PM - 7 AM)</p>
                  <p className="text-gray-700">
                    Sleep time, but nurses check on you regularly
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <h4 className="text-lg font-bold text-green-900 mb-2">
                💡 Tips for Your Stay
              </h4>
              <ul className="space-y-2 text-green-800">
                <li>• Bring photos from home to make your room feel cozy</li>
                <li>• Ask about the playroom schedule</li>
                <li>
                  • Keep a notebook to write down questions for the doctor
                </li>
                <li>• Decorate your space with drawings or cards</li>
                <li>
                  • Make friends with other kids in the ward (if you feel up to
                  it!)
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/explainers" className="btn btn-primary">
              Back to Explainers
            </Link>
            <Link to="/" className="btn btn-secondary">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
