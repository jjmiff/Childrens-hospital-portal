// MyMedicines.jsx
// Purpose: Display current medicines and medication schedule
// Child-friendly medicine information and reminders

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../utils/api";
import { showToast } from "../components/Toast";
import { ListSkeleton } from "../components/LoadingSkeleton";
import AnimatedPage from "../components/AnimatedPage";

export default function MyMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [tab, setTab] = useState("active");

  // User and role
  const [user, setUser] = useState(null);

  // Form states (create)
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  // Edit states
  const [eName, setEName] = useState("");
  const [eDosage, setEDosage] = useState("");
  const [eFrequency, setEFrequency] = useState("");
  const [eTime, setETime] = useState("");
  const [eNotes, setENotes] = useState("");
  const [eActive, setEActive] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My Medicines — Children's Hospital Portal";
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (_) {}
    }
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiFetch("/api/medicines", {});
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to load medicines");
        }
        const data = await res.json();
        setMedicines(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setMedicines([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const isStaff = user?.userType === "staff" || user?.isAdmin;

  const refresh = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await apiFetch("/api/medicines", {});
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setMedicines(Array.isArray(data) ? data : []);
      }
    } catch (_) {}
  };

  const { activeMeds, stoppedMeds } = useMemo(() => {
    const act = [];
    const stop = [];
    for (const m of medicines) {
      if (m.active !== false) act.push(m);
      else stop.push(m);
    }
    return { activeMeds: act, stoppedMeds: stop };
  }, [medicines]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateError(null);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (!name) {
      setCreateError("Please enter a medicine name.");
      return;
    }
    setCreating(true);
    try {
      const res = await apiFetch("/api/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, dosage, frequency, time, notes }),
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Could not create medicine");
      }
      setName("");
      setDosage("");
      setFrequency("");
      setTime("");
      setNotes("");
      await refresh();
      showToast("Medicine added", "success");
    } catch (err) {
      setCreateError(err.message);
      showToast(err.message || "Could not create medicine", "error");
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (m) => {
    if (!isStaff) return;
    setEditingId(m._id);
    setEName(m.name || "");
    setEDosage(m.dosage || "");
    setEFrequency(m.frequency || "");
    setETime(m.time || "");
    setENotes(m.notes || "");
    setEActive(m.active !== false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSavingEdit(false);
  };

  const saveEdit = async (id) => {
    if (!isStaff) return;
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (!eName) {
      showToast("Name is required", "error");
      return;
    }
    setSavingEdit(true);
    try {
      const res = await apiFetch(`/api/medicines/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: eName,
          dosage: eDosage,
          frequency: eFrequency,
          time: eTime,
          notes: eNotes,
          active: eActive,
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
        throw new Error(data.message || "Could not update medicine");
      }
      const { medicine } = await res.json();
      setMedicines((prev) => prev.map((x) => (x._id === id ? medicine : x)));
      cancelEdit();
      showToast("Medicine updated", "success");
    } catch (err) {
      showToast(err.message || "Could not update medicine", "error");
    } finally {
      setSavingEdit(false);
    }
  };

  const toggleActive = async (id, nextActive) => {
    if (!isStaff) return;
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await apiFetch(`/api/medicines/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: nextActive }),
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Could not update medicine");
      }
      const { medicine } = await res.json();
      setMedicines((prev) => prev.map((x) => (x._id === id ? medicine : x)));
      showToast(
        nextActive ? "Medicine resumed" : "Medicine stopped",
        "success"
      );
    } catch (err) {
      showToast(err.message || "Could not update medicine", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!isStaff) return;
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setDeletingId(id);
    try {
      const res = await apiFetch(`/api/medicines/${id}`, {
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
        throw new Error(data.message || "Could not delete medicine");
      }
      setMedicines((prev) => prev.filter((x) => x._id !== id));
      showToast("Medicine deleted", "success");
    } catch (err) {
      showToast(err.message || "Could not delete medicine", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AnimatedPage>
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
              </section>

              {/* Current Medicines */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>💊</span>
                  <span>Your Current Medicines</span>
                </h2>

                {/* Create form (staff only) */}
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

                {loading && <ListSkeleton count={3} />}
                {error && !loading && (
                  <p className="text-red-600 font-semibold">{error}</p>
                )}
                {!loading &&
                  !error &&
                  (tab === "active"
                    ? activeMeds.length === 0
                    : stoppedMeds.length === 0) && (
                    <p className="text-gray-700">
                      {medicines.length === 0
                        ? "You have no medicines recorded yet."
                        : tab === "active"
                        ? "No active medicines."
                        : "No stopped medicines."}
                    </p>
                  )}

                <div
                  className="space-y-4"
                  id="medicines-list"
                  role="tabpanel"
                  aria-label={`${tab} medicines`}
                >
                  {(tab === "active" ? activeMeds : stoppedMeds).map((med) => (
                    <div
                      key={med._id}
                      className={`rounded-xl p-4 sm:p-5 border-2 bg-blue-50 border-blue-200 hover:shadow-md transition-shadow`}
                    >
                      {editingId === med._id ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="sm:col-span-2">
                            <label
                              className="block text-sm font-semibold text-gray-700 mb-1"
                              htmlFor={`ename-${med._id}`}
                            >
                              Name
                            </label>
                            <input
                              id={`ename-${med._id}`}
                              value={eName}
                              onChange={(e) => setEName(e.target.value)}
                              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                            />
                          </div>
                          <div>
                            <label
                              className="block text-sm font-semibold text-gray-700 mb-1"
                              htmlFor={`edosage-${med._id}`}
                            >
                              Dosage
                            </label>
                            <input
                              id={`edosage-${med._id}`}
                              value={eDosage}
                              onChange={(e) => setEDosage(e.target.value)}
                              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                            />
                          </div>
                          <div>
                            <label
                              className="block text-sm font-semibold text-gray-700 mb-1"
                              htmlFor={`efreq-${med._id}`}
                            >
                              Frequency
                            </label>
                            <input
                              id={`efreq-${med._id}`}
                              value={eFrequency}
                              onChange={(e) => setEFrequency(e.target.value)}
                              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                            />
                          </div>
                          <div>
                            <label
                              className="block text-sm font-semibold text-gray-700 mb-1"
                              htmlFor={`etime-${med._id}`}
                            >
                              Time
                            </label>
                            <input
                              id={`etime-${med._id}`}
                              value={eTime}
                              onChange={(e) => setETime(e.target.value)}
                              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                            />
                          </div>
                          <div>
                            <label
                              className="block text-sm font-semibold text-gray-700 mb-1"
                              htmlFor={`enotes-${med._id}`}
                            >
                              Notes
                            </label>
                            <input
                              id={`enotes-${med._id}`}
                              value={eNotes}
                              onChange={(e) => setENotes(e.target.value)}
                              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={eActive}
                                onChange={(e) => setEActive(e.target.checked)}
                                className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-mint-400"
                              />
                              <span className="text-sm font-semibold text-gray-700">
                                Active medicine
                              </span>
                            </label>
                          </div>
                          <div className="sm:col-span-2 flex gap-2">
                            <button
                              onClick={() => saveEdit(med._id)}
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
                      ) : (
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="text-3xl sm:text-4xl flex-shrink-0">
                            💊
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                              {med.name}
                            </h3>
                            <div className="mb-2">
                              <span
                                className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                                  med.active !== false
                                    ? "bg-green-100 text-green-800 border border-green-200"
                                    : "bg-gray-100 text-gray-700 border border-gray-200"
                                }`}
                              >
                                {med.active !== false ? "Active" : "Stopped"}
                              </span>
                            </div>
                            <div className="space-y-2 text-sm sm:text-base text-gray-700">
                              {med.dosage && (
                                <p>
                                  <span className="font-semibold">Dosage:</span>{" "}
                                  {med.dosage}
                                </p>
                              )}
                              {med.frequency && (
                                <p>
                                  <span className="font-semibold">
                                    Frequency:
                                  </span>{" "}
                                  {med.frequency}
                                </p>
                              )}
                              {med.time && (
                                <p>
                                  <span className="font-semibold">Time:</span>{" "}
                                  {med.time}
                                </p>
                              )}
                              {med.notes && (
                                <p>
                                  <span className="font-semibold">Notes:</span>{" "}
                                  {med.notes}
                                </p>
                              )}
                              {med.updatedAt && (
                                <p className="text-xs text-gray-500 mt-2">
                                  Last updated:{" "}
                                  {new Date(med.updatedAt).toLocaleDateString()}
                                  {med.updatedBy?.username && (
                                    <>
                                      {" by "}
                                      <span className="font-semibold">
                                        {med.updatedBy.username}
                                        {med.updatedBy.userType === "staff" && (
                                          <span className="ml-1 inline-block text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 border border-blue-200">
                                            Staff
                                          </span>
                                        )}
                                      </span>
                                    </>
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                          {isStaff && (
                            <div className="ml-auto flex gap-2">
                              {med.active !== false ? (
                                <button
                                  onClick={() => toggleActive(med._id, false)}
                                  className="text-sm bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg px-3 py-2 hover:bg-yellow-200"
                                >
                                  Stop
                                </button>
                              ) : (
                                <button
                                  onClick={() => toggleActive(med._id, true)}
                                  className="text-sm bg-green-100 border border-green-300 text-green-800 rounded-lg px-3 py-2 hover:bg-green-200"
                                >
                                  Resume
                                </button>
                              )}
                              <button
                                onClick={() => startEdit(med)}
                                className="text-sm bg-blue-100 border border-blue-300 text-blue-800 rounded-lg px-3 py-2 hover:bg-blue-200"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `Are you sure you want to delete "${med.name}"?`
                                    )
                                  ) {
                                    handleDelete(med._id);
                                  }
                                }}
                                disabled={deletingId === med._id}
                                className="text-sm bg-red-100 border border-red-300 text-red-700 rounded-lg px-3 py-2 hover:bg-red-200 disabled:opacity-50"
                              >
                                {deletingId === med._id
                                  ? "Deleting..."
                                  : "Delete"}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Medicine Safety Tips */}
              <section className="bg-red-50 rounded-2xl p-4 sm:p-6 border-2 border-red-200">
                <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-3 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Important Safety Rules</span>
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>
                      <strong>Always ask a grown-up</strong> before taking any
                      medicine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>
                      <strong>Never take someone else's medicine</strong> - it
                      might hurt you
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>
                      <strong>Don't take extra</strong> even if it tastes good
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>
                      <strong>Tell a grown-up</strong> if the medicine makes you
                      feel funny
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>
                      <strong>Keep medicines closed tight</strong> and away from
                      pets
                    </span>
                  </li>
                </ul>
              </section>

              {/* Helpful Tips */}
              <section className="bg-yellow-50 rounded-2xl p-4 sm:p-6 border-2 border-yellow-300">
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
                    <span>It's okay to ask questions about your medicine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>
                      Set a phone alarm to help you remember when to take it
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
                  <li>⏰ Reminders to take your medicine on time</li>
                  <li>✅ Check off medicines when you've taken them</li>
                  <li>📊 See your medicine-taking streak</li>
                  <li>🎁 Earn badges for taking medicine consistently</li>
                  <li>📝 Add notes about how medicines make you feel</li>
                  <li>🔔 Low medicine alerts (time for a refill!)</li>
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
