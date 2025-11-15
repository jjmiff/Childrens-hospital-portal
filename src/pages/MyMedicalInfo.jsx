// MyMedicalInfo.jsx
// Purpose: Display age-appropriate medical information for the child
// Shows basic health info, allergies, and medical history

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MyMedicalInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = "My Medical Info — Children's Hospital Portal";

    // Get user data
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Mock medical data - in production, fetch from backend
  const medicalInfo = {
    bloodType: "O+",
    allergies: ["Peanuts", "Penicillin"],
    conditions: ["Asthma (mild)"],
    vaccinations: [
      { name: "MMR", date: "2020-03-15", emoji: "💉" },
      { name: "Flu Shot", date: "2024-10-01", emoji: "💉" },
      { name: "COVID-19", date: "2023-06-20", emoji: "💉" },
    ],
    emergencyContact: {
      name: "Parent/Guardian",
      phone: "Ask at reception",
    },
  };

  const getAgeGroupInfo = (ageGroup) => {
    switch (ageGroup) {
      case "4-8":
        return {
          title: "Your Health Info (Just for You!)",
          intro:
            "Here's some information about your body and health. It's important to know these things!",
        };
      case "9-14":
        return {
          title: "Your Medical Information",
          intro:
            "Understanding your health information helps you take better care of yourself.",
        };
      case "15-18":
        return {
          title: "Your Health Records",
          intro:
            "This is your personal health information. Understanding it helps you make informed decisions about your healthcare.",
        };
      default:
        return {
          title: "Your Medical Information",
          intro: "Important information about your health.",
        };
    }
  };

  const ageInfo = user ? getAgeGroupInfo(user.ageGroup) : getAgeGroupInfo("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="text-5xl sm:text-6xl mb-4">📋</div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {ageInfo.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                {ageInfo.intro}
              </p>
            </div>

            {/* Why This Matters */}
            <section className="bg-blue-50 rounded-2xl p-4 sm:p-6 border-2 border-blue-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                🤔 Why Should I Know This?
              </h2>
              <p className="text-gray-700 mb-3">
                Knowing about your health helps you:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>Stay safe by avoiding things you're allergic to</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>Tell doctors important information quickly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>
                    Understand why you need certain medicines or treatments
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>Take charge of your own health as you grow up</span>
                </li>
              </ul>
            </section>

            {/* Basic Health Info */}
            <section className="bg-purple-50 rounded-2xl p-4 sm:p-6 border-2 border-purple-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🩸</span>
                <span>Basic Health Information</span>
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🩸</span>
                  <div>
                    <p className="font-semibold text-gray-800">Blood Type</p>
                    <p className="text-gray-700">{medicalInfo.bloodType}</p>
                  </div>
                </div>
                {user && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👤</span>
                    <div>
                      <p className="font-semibold text-gray-800">Age Group</p>
                      <p className="text-gray-700">{user.ageGroup} years</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Allergies */}
            <section className="bg-red-50 rounded-2xl p-4 sm:p-6 border-2 border-red-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>⚠️</span>
                <span>My Allergies</span>
              </h2>
              {medicalInfo.allergies.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-gray-700 mb-3">
                    <strong>Important:</strong> These things can make you sick,
                    so always avoid them!
                  </p>
                  {medicalInfo.allergies.map((allergy, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 border-2 border-red-300"
                    >
                      <p className="text-red-800 font-semibold text-lg">
                        🚫 {allergy}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">
                  Great news! You don't have any known allergies.
                </p>
              )}
            </section>

            {/* Conditions */}
            {medicalInfo.conditions.length > 0 && (
              <section className="bg-green-50 rounded-2xl p-4 sm:p-6 border-2 border-green-200">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🏥</span>
                  <span>Health Conditions</span>
                </h2>
                <p className="text-gray-700 mb-3">
                  These are health conditions your doctors are helping you with:
                </p>
                {medicalInfo.conditions.map((condition, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 border-2 border-green-300 mb-2"
                  >
                    <p className="text-gray-800 font-semibold">{condition}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Vaccinations */}
            <section className="bg-yellow-50 rounded-2xl p-4 sm:p-6 border-2 border-yellow-300">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>💉</span>
                <span>My Vaccinations</span>
              </h2>
              <p className="text-gray-700 mb-4">
                Vaccinations are like shields that protect you from getting
                sick! Here are yours:
              </p>
              <div className="space-y-2">
                {medicalInfo.vaccinations.map((vax, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 border-2 border-yellow-400 flex items-center gap-3"
                  >
                    <span className="text-2xl">{vax.emoji}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{vax.name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(vax.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Emergency Contact */}
            <section className="bg-orange-50 rounded-2xl p-4 sm:p-6 border-2 border-orange-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>📞</span>
                <span>Emergency Contact</span>
              </h2>
              <p className="text-gray-700 mb-3">
                If something urgent happens, the hospital will contact:
              </p>
              <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
                <p className="font-semibold text-gray-800 text-lg">
                  {medicalInfo.emergencyContact.name}
                </p>
                <p className="text-gray-600">
                  {medicalInfo.emergencyContact.phone}
                </p>
              </div>
            </section>

            {/* Privacy & Safety */}
            <section className="bg-indigo-50 rounded-2xl p-4 sm:p-6 border-2 border-indigo-200">
              <h3 className="text-lg sm:text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <span>🔒</span>
                <span>Your Information is Private & Safe</span>
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>
                    Only you, your family, and your doctors can see this
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>
                    The hospital keeps your information very safe and private
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>
                    Doctors need your permission (and your parents') to share it
                  </span>
                </li>
              </ul>
            </section>

            {/* Coming Soon */}
            <section className="bg-green-50 rounded-2xl p-4 sm:p-6 border-2 border-green-200">
              <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-3">
                🌟 Coming Soon!
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                <li>📊 Growth charts showing how you've grown</li>
                <li>📝 Download your medical information as a PDF</li>
                <li>🔔 Reminders for upcoming vaccinations</li>
                <li>📈 Track your health measurements over time</li>
                <li>🏆 Health milestones and achievements</li>
                <li>📚 Learn more about your conditions</li>
              </ul>
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
  );
}
