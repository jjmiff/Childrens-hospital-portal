// MyCalendar.jsx
// Purpose: Display upcoming appointments and hospital visits
// Child-friendly calendar and appointment information

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../utils/api";
import { showToast } from "../components/Toast";
import { ListSkeleton } from "../components/LoadingSkeleton";
import { isAuthenticated } from "../utils/auth";
import AnimatedPage from "../components/AnimatedPage";

export default function MyCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My Calendar — Children's Hospital Portal";
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Token retrieval not required; apiFetch attaches Authorization automatically

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiFetch("/api/appointments", {});
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to load appointments");
        }
        const data = await res.json();
        // Expect array
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          setAppointments([]);
        }
      } catch (err) {
        setError(err.message);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Create appointment form state
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(""); // yyyy-mm-dd
  const [time, setTime] = useState(""); // HH:MM
  const [location, setLocation] = useState("");
  const [type, setType] = useState("check-up");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [editError, setEditError] = useState(null);
  const [eTitle, setETitle] = useState("");
  const [eDate, setEDate] = useState("");
  const [eTime, setETime] = useState("");
  const [eLocation, setELocation] = useState("");
  const [eType, setEType] = useState("check-up");
  const [tab, setTab] = useState("upcoming"); // 'upcoming' | 'past'

  const startOfToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const { upcomingAppts, pastAppts } = useMemo(() => {
    const todayStart = startOfToday().getTime();
    const ups = [];
    const past = [];
    for (const a of appointments) {
      const t = new Date(a.date).getTime();
      if (!isNaN(t) && t >= todayStart) ups.push(a);
      else past.push(a);
    }
    ups.sort((a, b) => new Date(a.date) - new Date(b.date));
    past.sort((a, b) => new Date(b.date) - new Date(a.date));
    return { upcomingAppts: ups, pastAppts: past };
  }, [appointments]);

  const refreshAppointments = async () => {
    try {
      const res = await apiFetch("/api/appointments", {});
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setAppointments(Array.isArray(data) ? data : []);
      }
    } catch (_) {
      // ignore; listing section already shows error state
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateError(null);
    // Authorization handled centrally in apiFetch
    // Basic validation
    if (!title || !date || !location) {
      setCreateError("Please fill in title, date, and location.");
      return;
    }
    setCreating(true);
    try {
      const isoDate = time
        ? new Date(`${date}T${time}`).toISOString()
        : new Date(`${date}T00:00`).toISOString();
      const res = await apiFetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, date: isoDate, location, type }),
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Could not create appointment");
      }
      // Reset form
      setTitle("");
      setDate("");
      setTime("");
      setLocation("");
      setType("check-up");
      await refreshAppointments();
      showToast("Appointment added", "success");
    } catch (err) {
      setCreateError(err.message);
      showToast(err.message || "Could not create appointment", "error");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    // Authorization handled centrally in apiFetch
    setDeletingId(id);
    try {
      const res = await apiFetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Could not delete appointment");
      }
      setAppointments((prev) => prev.filter((a) => a._id !== id));
      showToast("Appointment deleted", "success");
    } catch (err) {
      setError(err.message);
      showToast(err.message || "Could not delete appointment", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const toLocalDateInputValue = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const toLocalTimeInputValue = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mi}`;
  };

  const startEdit = (appt) => {
    setEditError(null);
    setEditingId(appt._id);
    setETitle(appt.title || "");
    setEDate(toLocalDateInputValue(appt.date));
    setETime(toLocalTimeInputValue(appt.date));
    setELocation(appt.location || "");
    setEType(appt.type || "check-up");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSavingEdit(false);
    setEditError(null);
  };

  const saveEdit = async (id) => {
    setEditError(null);
    // Authorization handled centrally in apiFetch
    if (!eTitle || !eDate || !eLocation) {
      setEditError("Please fill in title, date, and location.");
      return;
    }
    setSavingEdit(true);
    try {
      const isoDate = eTime
        ? new Date(`${eDate}T${eTime}`).toISOString()
        : new Date(`${eDate}T00:00`).toISOString();
      const res = await apiFetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: eTitle,
          date: isoDate,
          location: eLocation,
          type: eType,
        }),
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Could not update appointment");
      }
      const { appointment } = await res.json();
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? appointment : a))
      );
      cancelEdit();
      showToast("Appointment updated", "success");
    } catch (err) {
      setEditError(err.message);
      showToast(err.message || "Could not update appointment", "error");
    } finally {
      setSavingEdit(false);
    }
  };

  const getEmojiForType = (type) => {
    const map = {
      "check-up": "🩺",
      test: "💉",
      therapy: "🎨",
      surgery: "🏥",
      other: "📌",
    };
    return map[type] || "📌";
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <div className="text-5xl sm:text-6xl mb-4">📅</div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  My Calendar
                </h1>
                <p className="text-base sm:text-lg text-gray-600">
                  Keep track of your hospital visits and appointments
                </p>
              </div>

              {/* What is This? */}
              <section className="bg-blue-50 rounded-2xl p-4 sm:p-6 border-2 border-blue-200">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                  📆 What's My Calendar For?
                </h2>
                <p className="text-gray-700 mb-3">
                  Your calendar helps you remember when you have appointments at
                  the hospital. You can see:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-lg">✓</span>
                    <span>When you need to visit the hospital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">✓</span>
                    <span>Which doctor or nurse you'll see</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">✓</span>
                    <span>What room or department to go to</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">✓</span>
                    <span>What time you need to be there</span>
                  </li>
                </ul>
              </section>

              {/* Add Appointment */}
              <section className="bg-mint-50 rounded-2xl p-4 sm:p-6 border-2 border-mint-200">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                  ➕ Add an Appointment
                </h2>
                <form
                  onSubmit={handleCreate}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="sm:col-span-2">
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                      placeholder="e.g. Check-up with Dr. Smith"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor="date"
                    >
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
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
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor="type"
                    >
                      Type
                    </label>
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-mint-400"
                    >
                      <option value="check-up">Check-up</option>
                      <option value="test">Test</option>
                      <option value="therapy">Therapy</option>
                      <option value="surgery">Surgery</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor="location"
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                      placeholder="e.g. Children's Clinic, Room 3"
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
                      {creating ? "Adding..." : "Add Appointment"}
                    </button>
                  </div>
                </form>
              </section>

              {/* Appointments */}
              <section>
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <span>🗓️</span>
                    <span>Appointments</span>
                  </h2>
                  <div
                    className="inline-flex rounded-lg overflow-hidden border border-gray-200"
                    role="tablist"
                    aria-label="Appointment filters"
                  >
                    <button
                      role="tab"
                      aria-selected={tab === "upcoming"}
                      aria-controls="appointments-list"
                      className={`px-3 py-2 text-sm font-semibold ${
                        tab === "upcoming"
                          ? "bg-mint-300 text-gray-900"
                          : "bg-white text-gray-700"
                      }`}
                      onClick={() => setTab("upcoming")}
                    >
                      Upcoming ({upcomingAppts.length})
                    </button>
                    <button
                      role="tab"
                      aria-selected={tab === "past"}
                      aria-controls="appointments-list"
                      className={`px-3 py-2 text-sm font-semibold border-l border-gray-200 ${
                        tab === "past"
                          ? "bg-mint-300 text-gray-900"
                          : "bg-white text-gray-700"
                      }`}
                      onClick={() => setTab("past")}
                    >
                      Past ({pastAppts.length})
                    </button>
                  </div>
                </div>
                {loading && <ListSkeleton count={3} />}
                {error && !loading && (
                  <p className="text-red-600 font-semibold">{error}</p>
                )}
                {!loading &&
                  !error &&
                  (tab === "upcoming" ? upcomingAppts : pastAppts).length ===
                    0 && (
                    <p className="text-gray-700">
                      {tab === "upcoming"
                        ? "No upcoming appointments."
                        : "No past appointments yet."}
                    </p>
                  )}
                <div
                  className="space-y-4"
                  id="appointments-list"
                  role="tabpanel"
                  aria-label={`${tab} appointments`}
                >
                  {(tab === "upcoming" ? upcomingAppts : pastAppts).map(
                    (appt) => (
                      <div
                        key={appt._id}
                        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-5 border-2 border-purple-200 hover:shadow-md transition-shadow"
                      >
                        {editingId === appt._id ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="text-3xl sm:text-4xl flex-shrink-0">
                                {getEmojiForType(eType)}
                              </div>
                              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                                Edit Appointment
                              </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="sm:col-span-2">
                                <label
                                  className="block text-sm font-semibold text-gray-700 mb-1"
                                  htmlFor={`etitle-${appt._id}`}
                                >
                                  Title
                                </label>
                                <input
                                  id={`etitle-${appt._id}`}
                                  value={eTitle}
                                  onChange={(e) => setETitle(e.target.value)}
                                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                                />
                              </div>
                              <div>
                                <label
                                  className="block text-sm font-semibold text-gray-700 mb-1"
                                  htmlFor={`edate-${appt._id}`}
                                >
                                  Date
                                </label>
                                <input
                                  id={`edate-${appt._id}`}
                                  type="date"
                                  value={eDate}
                                  onChange={(e) => setEDate(e.target.value)}
                                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                                />
                              </div>
                              <div>
                                <label
                                  className="block text-sm font-semibold text-gray-700 mb-1"
                                  htmlFor={`etime-${appt._id}`}
                                >
                                  Time
                                </label>
                                <input
                                  id={`etime-${appt._id}`}
                                  type="time"
                                  value={eTime}
                                  onChange={(e) => setETime(e.target.value)}
                                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                                />
                              </div>
                              <div>
                                <label
                                  className="block text-sm font-semibold text-gray-700 mb-1"
                                  htmlFor={`etype-${appt._id}`}
                                >
                                  Type
                                </label>
                                <select
                                  id={`etype-${appt._id}`}
                                  value={eType}
                                  onChange={(e) => setEType(e.target.value)}
                                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-mint-400"
                                >
                                  <option value="check-up">Check-up</option>
                                  <option value="test">Test</option>
                                  <option value="therapy">Therapy</option>
                                  <option value="surgery">Surgery</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                              <div>
                                <label
                                  className="block text-sm font-semibold text-gray-700 mb-1"
                                  htmlFor={`elocation-${appt._id}`}
                                >
                                  Location
                                </label>
                                <input
                                  id={`elocation-${appt._id}`}
                                  value={eLocation}
                                  onChange={(e) => setELocation(e.target.value)}
                                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                                />
                              </div>
                              {editError && (
                                <div className="sm:col-span-2 text-red-700 font-semibold">
                                  {editError}
                                </div>
                              )}
                              <div className="sm:col-span-2 flex gap-2">
                                <button
                                  onClick={() => saveEdit(appt._id)}
                                  disabled={savingEdit}
                                  className="bg-mint-300 hover:bg-mint-400 disabled:opacity-50 text-gray-900 font-bold py-2 px-4 rounded-lg shadow"
                                >
                                  {savingEdit ? "Saving..." : "Save"}
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  type="button"
                                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="text-3xl sm:text-4xl flex-shrink-0">
                              {getEmojiForType(appt.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                                {appt.title}
                              </h3>
                              <div className="space-y-1 text-sm sm:text-base text-gray-700">
                                <p className="flex items-center gap-2">
                                  <span className="font-semibold">
                                    📅 Date:
                                  </span>
                                  <span>{formatDate(appt.date)}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                  <span className="font-semibold">
                                    🕐 Time:
                                  </span>
                                  <span>
                                    {formatTime(appt.date) || "(Not set)"}
                                  </span>
                                </p>
                                <p className="flex items-center gap-2">
                                  <span className="font-semibold">
                                    📍 Location:
                                  </span>
                                  <span>{appt.location}</span>
                                </p>
                              </div>
                            </div>
                            <div className="ml-auto flex gap-2">
                              <button
                                onClick={() => startEdit(appt)}
                                className="text-sm bg-blue-100 border border-blue-300 text-blue-800 rounded-lg px-3 py-2 hover:bg-blue-200"
                                aria-label="Edit appointment"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(appt._id)}
                                disabled={deletingId === appt._id}
                                className="text-sm bg-red-100 border border-red-300 text-red-700 rounded-lg px-3 py-2 hover:bg-red-200 disabled:opacity-50"
                                aria-label="Delete appointment"
                              >
                                {deletingId === appt._id
                                  ? "Deleting..."
                                  : "Delete"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* Tips Box */}
              <section className="bg-yellow-50 rounded-2xl p-4 sm:p-6 border-2 border-yellow-300">
                <h3 className="text-lg sm:text-xl font-bold text-yellow-900 mb-3 flex items-center gap-2">
                  <span>💡</span>
                  <span>Helpful Tips</span>
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>
                      <strong>Arrive a bit early</strong> so you're not rushed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>
                      <strong>Bring a book or game</strong> to play while
                      waiting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>
                      <strong>Write down questions</strong> you want to ask the
                      doctor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>
                      <strong>Ask a grown-up</strong> if you're worried about
                      anything
                    </span>
                  </li>
                </ul>
              </section>

              {/* Coming Soon Features */}
              <section className="bg-green-50 rounded-2xl p-4 sm:p-6 border-2 border-green-200">
                <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-3">
                  🌟 Coming Soon!
                </h3>
                <p className="text-gray-700 mb-3">
                  We're working on exciting new features for your calendar:
                </p>
                <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <li>📱 Reminders sent to your phone or email</li>
                  <li>✅ Check off appointments when you've been</li>
                  <li>📝 Add notes about how you felt during visits</li>
                  <li>🎁 Earn badges for attending appointments</li>
                  <li>👨‍👩‍👧 Share your calendar with family members</li>
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
    </AnimatedPage>
  );
}
