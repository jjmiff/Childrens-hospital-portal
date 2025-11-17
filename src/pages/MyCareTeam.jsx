// MyCareTeam.jsx
// Purpose: Manage healthcare team contacts and information
// Track doctors, nurses, and other care providers

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { showToast } from "../components/Toast";
import { ListSkeleton } from "../components/LoadingSkeleton";
import LoadingErrorEmpty from "../components/LoadingErrorEmpty";
import AnimatedPage from "../components/AnimatedPage";

export default function MyCareTeam() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Form states (create)
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hospital, setHospital] = useState("");
  const [department, setDepartment] = useState("");
  const [notes, setNotes] = useState("");

  // Edit states
  const [eName, setEName] = useState("");
  const [eRole, setERole] = useState("");
  const [eSpecialty, setESpecialty] = useState("");
  const [ePhone, setEPhone] = useState("");
  const [eEmail, setEEmail] = useState("");
  const [eHospital, setEHospital] = useState("");
  const [eDepartment, setEDepartment] = useState("");
  const [eNotes, setENotes] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My Care Team — Children's Hospital Portal";
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiFetch("/api/careteam", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to load care team");
        }
        const data = await res.json();
        setMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setCreateError("Name is required");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setCreating(true);
      setCreateError(null);
      const res = await apiFetch("/api/careteam", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          role,
          specialty,
          phone,
          email,
          hospital,
          department,
          notes,
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
        throw new Error(data.message || "Could not add care team member");
      }
      const { member } = await res.json();
      setMembers((prev) => [...prev, member]);
      // Clear form
      setName("");
      setRole("");
      setSpecialty("");
      setPhone("");
      setEmail("");
      setHospital("");
      setDepartment("");
      setNotes("");
      showToast("Care team member added", "success");
    } catch (err) {
      setCreateError(err.message);
      showToast(err.message || "Could not add care team member", "error");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to remove this care team member?")
    ) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setDeletingId(id);
      const res = await apiFetch(`/api/careteam/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Could not delete care team member");
      }
      setMembers((prev) => prev.filter((m) => m._id !== id));
      showToast("Care team member removed", "success");
    } catch (err) {
      showToast(err.message || "Could not delete care team member", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (member) => {
    setEditingId(member._id);
    setEName(member.name);
    setERole(member.role || "");
    setESpecialty(member.specialty || "");
    setEPhone(member.phone || "");
    setEEmail(member.email || "");
    setEHospital(member.hospital || "");
    setEDepartment(member.department || "");
    setENotes(member.notes || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEName("");
    setERole("");
    setESpecialty("");
    setEPhone("");
    setEEmail("");
    setEHospital("");
    setEDepartment("");
    setENotes("");
  };

  const saveEdit = async (id) => {
    if (!eName.trim()) {
      showToast("Name is required", "error");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setSavingEdit(true);
      const res = await apiFetch(`/api/careteam/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: eName,
          role: eRole,
          specialty: eSpecialty,
          phone: ePhone,
          email: eEmail,
          hospital: eHospital,
          department: eDepartment,
          notes: eNotes,
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
        throw new Error(data.message || "Could not update care team member");
      }
      const { member } = await res.json();
      setMembers((prev) => prev.map((m) => (m._id === id ? member : m)));
      cancelEdit();
      showToast("Care team member updated", "success");
    } catch (err) {
      showToast(err.message || "Could not update care team member", "error");
    } finally {
      setSavingEdit(false);
    }
  };

  const getRoleEmoji = (role) => {
    const r = (role || "").toLowerCase();
    if (r.includes("doctor") || r.includes("physician")) return "👨‍⚕️";
    if (r.includes("nurse")) return "👩‍⚕️";
    if (r.includes("therapist") || r.includes("therapy")) return "🧑‍⚕️";
    if (r.includes("specialist")) return "🔬";
    if (r.includes("surgeon")) return "⚕️";
    return "👤";
  };

  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <div className="text-5xl sm:text-6xl mb-4">👨‍⚕️</div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  My Care Team
                </h1>
                <p className="text-base sm:text-lg text-gray-600">
                  Keep track of your doctors, nurses, and healthcare providers
                </p>
              </div>

              {/* What is This? */}
              <section className="bg-blue-50 rounded-2xl p-4 sm:p-6 border-2 border-blue-200">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                  👥 What's My Care Team?
                </h2>
                <p className="text-gray-700 mb-3">
                  Your care team is all the people who help take care of you at
                  the hospital. This includes:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-lg">✓</span>
                    <span>Your doctors and specialists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">✓</span>
                    <span>Your nurses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">✓</span>
                    <span>Therapists and other helpers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">✓</span>
                    <span>Their contact information</span>
                  </li>
                </ul>
              </section>

              {/* Add Care Team Member */}
              <section className="bg-mint-50 rounded-2xl p-4 sm:p-6 border-2 border-mint-200">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                  ➕ Add a Care Team Member
                </h2>
                <form
                  onSubmit={handleCreate}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="sm:col-span-2">
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor="name"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                      placeholder="e.g. Dr. Sarah Johnson"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor="role"
                    >
                      Role
                    </label>
                    <input
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                      placeholder="e.g. Pediatrician"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor="specialty"
                    >
                      Specialty
                    </label>
                    <input
                      id="specialty"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                      placeholder="e.g. Cardiology"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                      placeholder="e.g. +1-555-0123"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                      placeholder="e.g. doctor@hospital.com"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor="hospital"
                    >
                      Hospital
                    </label>
                    <input
                      id="hospital"
                      value={hospital}
                      onChange={(e) => setHospital(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                      placeholder="e.g. Children's Hospital"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor="department"
                    >
                      Department
                    </label>
                    <input
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                      placeholder="e.g. Pediatrics Ward"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor="notes"
                    >
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint-400"
                      placeholder="e.g. Primary care physician"
                      rows="2"
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
                      {creating ? "Adding..." : "Add Care Team Member"}
                    </button>
                  </div>
                </form>
              </section>

              {/* Care Team List */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>👥</span>
                  <span>Your Care Team</span>
                </h2>
                <LoadingErrorEmpty
                  loading={loading}
                  error={error}
                  empty={members.length === 0}
                  loadingText="Loading care team..."
                  errorText={error || "Could not load care team."}
                  emptyText="No care team members added yet. Add your first team member above!"
                >
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div
                        key={member._id}
                        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-5 border-2 border-blue-200 hover:shadow-md transition-shadow"
                      >
                        {editingId === member._id ? (
                          <div className="space-y-3">
                            {/* ...existing edit form code... */}
                          </div>
                        ) : (
                          <div className="flex items-start gap-3 sm:gap-4">
                            {/* ...existing member display code... */}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </LoadingErrorEmpty>
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
                      <strong>Keep contact info handy</strong> - It's helpful to
                      have phone numbers and emails saved
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>
                      <strong>Add everyone who helps you</strong> - Include
                      doctors, nurses, therapists, and specialists
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>
                      <strong>Update information</strong> - If contact details
                      change, remember to update them here
                    </span>
                  </li>
                </ul>
              </section>

              {/* Navigation */}
              <div className="text-center">
                <Link
                  to="/profile"
                  className="inline-block bg-sky-200 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-sky-300 transition-colors shadow-md"
                >
                  ← Back to Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
