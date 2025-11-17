// MyMedicines.jsx
// Purpose: Display current medicines and medication schedule
// Child-friendly medicine information and reminders

import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingErrorEmpty from "../components/LoadingErrorEmpty";
import AnimatedPage from "../components/AnimatedPage";

export default function MyMedicines() {
  // Minimal state for demo
  const [medicines] = useState([]);
  const [loading] = useState(false);
  const [error] = useState(null);
  const [creating] = useState(false);
  const [createError] = useState(null);
  const [tab, setTab] = useState("active");
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  // Placeholder for staff check
  const isStaff = false;
  // Placeholder for medicine lists
  const activeMeds = [];
  const stoppedMeds = [];
  // Placeholder for create handler
  function handleCreate(e) {
    e.preventDefault();
    // Add logic here
  }
  // Placeholder for medicine renderer
  function renderMedicine(med) {
    return <div key={med.id}>Medicine</div>;
  }
  return (
    <AnimatedPage>
      <>
        <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
              <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl mb-4">💊</div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    My Medicines
                  </h1>
                  <p className="text-base sm:text-lg text-gray-600">
                    Keep track of your medicines and when to take them
                  </p>
                </div>
                {/* Read-only notice (non-staff) */}
                {!isStaff && (
                  <div
                    role="note"
                    aria-live="polite"
                    className="bg-blue-50 border-2 border-blue-200 text-blue-900 rounded-xl p-4 sm:p-5"
                  >
                    <p className="font-bold">Read-only</p>
                    <p>
                      Only your care team can add, edit, or stop medicines. If
                      something looks wrong, please tell a nurse or doctor.
                    </p>
                  </div>
                )}
                {/* What is This? */}
                <section className="bg-purple-50 rounded-2xl p-4 sm:p-6 border-2 border-purple-200">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                      🤔 Why Track My Medicines?
                    </h2>
                    <p className="text-gray-700 mb-3">
                      Keeping track of your medicines helps you:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-lg">✓</span>
                        <span>Remember to take them at the right time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lg">✓</span>
                        <span>Know what each medicine is for</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lg">✓</span>
                        <span>Take the right amount (dosage)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lg">✓</span>
                        <span>Tell doctors what medicines you're taking</span>
                      </li>
                    </ul>
                  </div>
                </section>
                {/* Current Medicines */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>💊</span>
                    <span>Your Current Medicines</span>
                  </h2>
                  {isStaff && (
                    <form
                      onSubmit={handleCreate}
                      className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 sm:p-5 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <div className="sm:col-span-2">
                        <label
                          className="block text-sm font-semibold text-gray-700 mb-1"
                          htmlFor="name"
                        >
                          Medicine name
                        </label>
                        <input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                          placeholder="e.g. Amoxicillin"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-semibold text-gray-700 mb-1"
                          htmlFor="dosage"
                        >
                          Dosage
                        </label>
                        <input
                          id="dosage"
                          value={dosage}
                          onChange={(e) => setDosage(e.target.value)}
                          className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                          placeholder="e.g. 5ml"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-semibold text-gray-700 mb-1"
                          htmlFor="frequency"
                        >
                          Frequency
                        </label>
                        <input
                          id="frequency"
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                          placeholder="e.g. Twice daily"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-semibold text-gray-700 mb-1"
                          htmlFor="time"
                        >
                          Time
                        </label>
                        <input
                          id="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                          placeholder="e.g. 08:00"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-semibold text-gray-700 mb-1"
                          htmlFor="notes"
                        >
                          Notes
                        </label>
                        <input
                          id="notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                          placeholder="e.g. With food"
                        />
                      </div>
                      {createError && (
                        <div className="sm:col-span-2 text-red-700 font-semibold">
                          {createError}
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <button
                          type="submit"
                          disabled={creating}
                          className="bg-mint-300 hover:bg-mint-400 disabled:opacity-50 text-gray-900 font-bold py-2 px-4 rounded-lg shadow"
                        >
                          {creating ? "Adding..." : "Add Medicine"}
                        </button>
                      </div>
                    </form>
                  )}
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                    <div
                      className="inline-flex rounded-lg overflow-hidden border border-gray-200"
                      role="tablist"
                      aria-label="Medicine status filters"
                    >
                      <button
                        role="tab"
                        aria-selected={tab === "active"}
                        aria-controls="medicines-list"
                        className={`px-3 py-2 text-sm font-semibold ${
                          tab === "active"
                            ? "bg-mint-300 text-gray-900"
                            : "bg-white text-gray-700"
                        }`}
                        onClick={() => setTab("active")}
                      >
                        Active ({activeMeds.length})
                      </button>
                      <button
                        role="tab"
                        aria-selected={tab === "stopped"}
                        aria-controls="medicines-list"
                        className={`px-3 py-2 text-sm font-semibold border-l border-gray-200 ${
                          tab === "stopped"
                            ? "bg-mint-300 text-gray-900"
                            : "bg-white text-gray-700"
                        }`}
                        onClick={() => setTab("stopped")}
                      >
                        Stopped ({stoppedMeds.length})
                      </button>
                    </div>
                  </div>
                  <LoadingErrorEmpty
                    loading={loading}
                    error={error}
                    empty={
                      tab === "active"
                        ? activeMeds.length === 0
                        : stoppedMeds.length === 0
                    }
                    loadingText="Loading medicines..."
                    errorText={error || "Could not load medicines."}
                    emptyText={
                      medicines.length === 0
                        ? "You have no medicines recorded yet."
                        : tab === "active"
                        ? "No active medicines."
                        : "No stopped medicines."
                    }
                  >
                    <div
                      className="space-y-4"
                      id="medicines-list"
                      role="tabpanel"
                      aria-label={`${tab} medicines`}
                    >
                      {(tab === "active" ? activeMeds : stoppedMeds).map(
                        renderMedicine
                      )}
                    </div>
                  </LoadingErrorEmpty>
                </section>
                {/* Medicine Safety Tips */}
                <section className="bg-red-50 rounded-2xl p-4 sm:p-6 border-2 border-red-200">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-3 flex items-center gap-2">
                      <span>⚠️</span>
                      <span>Important Safety Rules</span>
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        <span>
                          <strong>Always ask a grown-up</strong> before taking
                          any medicine
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        <span>
                          <strong>Never take someone else's medicine</strong> -
                          it might hurt you
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        <span>
                          <strong>Don't take extra</strong> even if it tastes
                          good
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        <span>
                          <strong>Tell a grown-up</strong> if the medicine makes
                          you feel funny
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        <span>
                          <strong>Keep medicines closed tight</strong> and away
                          from pets
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
                {/* Helpful Tips */}
                <section className="bg-yellow-50 rounded-2xl p-4 sm:p-6 border-2 border-yellow-300">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-yellow-900 mb-3 flex items-center gap-2">
                      <span>💡</span>
                      <span>Tips for Taking Medicine</span>
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600">•</span>
                        <span>
                          If it tastes yucky, have a treat ready for after (ask
                          first!)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600">•</span>
                        <span>
                          Take a deep breath and swallow quickly with water
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600">•</span>
                        <span>
                          It's okay to ask questions about your medicine
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600">•</span>
                        <span>
                          Set a phone alarm to help you remember when to take it
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
                {/* Coming Soon */}
                <section className="bg-green-50 rounded-2xl p-4 sm:p-6 border-2 border-green-200">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-3">
                      🌟 Coming Soon!
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                      <li>⏰ Reminders to take your medicine on time</li>
                      <li>✅ Check off medicines when you've taken them</li>
                      <li>📊 See your medicine-taking streak</li>
                      <li>🎁 Earn badges for taking medicine consistently</li>
                      <li>📝 Add notes about how medicines make you feel</li>
                      <li>🔔 Low medicine alerts (time for a refill!)</li>
                    </ul>
                  </div>
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
      </>
    </AnimatedPage>
  );
}
