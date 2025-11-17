// ...existing code...
// StaffPatientRecords.jsx
// Purpose: Staff view/edit medicines for a selected patient
// ...existing code...
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import LoadingErrorEmpty from "../components/LoadingErrorEmpty";
// ...existing code...

export default function StaffPatientRecords() {
  const { userId } = useParams();
  const [patient, setPatient] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [careTeam, setCareTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMed, setEditMed] = useState(null);
  const [medForm, setMedForm] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: "",
    notes: "",
  });
  const [apptForm, setApptForm] = useState({
    title: "",
    date: "",
    location: "",
    type: "check-up",
  });
  const [editAppt, setEditAppt] = useState(null);
  const [careForm, setCareForm] = useState({
    name: "",
    role: "",
    specialty: "",
    phone: "",
    email: "",
    hospital: "",
    department: "",
    notes: "",
  });
  const [editCare, setEditCare] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatient();
    fetchMedicines();
    fetchAppointments();
    fetchCareTeam();
    // eslint-disable-next-line
  }, []);

  async function fetchPatient() {
    try {
      const res = await apiFetch(`/api/admin/users/${userId}`); // admin endpoint for user details
      const data = await res.json();
      setPatient(data.user || null);
    } catch {
      setPatient(null);
    }
  }

  async function fetchMedicines() {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/staff/medicines/${userId}`);
      const data = await res.json();
      setMedicines(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Couldn't load medicines");
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAppointments() {
    try {
      const res = await apiFetch(`/api/appointments?userId=${userId}`);
      const data = await res.json();
      setAppointments(data);
    } catch {
      setAppointments([]);
    }
  }

  async function fetchCareTeam() {
    try {
      const res = await apiFetch(`/api/careteam?userId=${userId}`);
      const data = await res.json();
      setCareTeam(data);
    } catch {
      setCareTeam([]);
    }
  }

  async function handleAddMed() {
    try {
      await apiFetch(`/api/staff/medicines/${userId}`, {
        method: "POST",
        body: JSON.stringify(medForm),
      });
      setMedForm({ name: "", dosage: "", frequency: "", time: "", notes: "" });
      fetchMedicines();
    } catch (e) {
      setError("Couldn't add medicine");
    }
  }

  async function handleUpdateMed() {
    try {
      await apiFetch(`/api/staff/medicines/${editMed._id}`, {
        method: "PUT",
        body: JSON.stringify(medForm),
      });
      setEditMed(null);
      setMedForm({ name: "", dosage: "", frequency: "", time: "", notes: "" });
      fetchMedicines();
    } catch (e) {
      setError("Couldn't update medicine");
    }
  }

  async function handleDeleteMed(medId) {
    if (!window.confirm("Are you sure you want to delete this medicine?"))
      return;
    try {
      await apiFetch(`/api/staff/medicines/${medId}`, {
        method: "DELETE",
      });
      fetchMedicines();
    } catch (e) {
      setError("Couldn't delete medicine");
    }
  }

  async function handleAddAppt() {
    try {
      await apiFetch(`/api/appointments`, {
        method: "POST",
        body: JSON.stringify(apptForm),
      });
      setApptForm({ title: "", date: "", location: "", type: "check-up" });
      fetchAppointments();
    } catch (e) {
      setError("Couldn't add appointment");
    }
  }

  async function handleUpdateAppt() {
    try {
      await apiFetch(`/api/appointments/${editAppt._id}`, {
        method: "PUT",
        body: JSON.stringify(apptForm),
      });
      setEditAppt(null);
      setApptForm({ title: "", date: "", location: "", type: "check-up" });
      fetchAppointments();
    } catch (e) {
      setError("Couldn't update appointment");
    }
  }

  async function handleDeleteAppt(apptId) {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;
    try {
      await apiFetch(`/api/appointments/${apptId}`, {
        method: "DELETE",
      });
      fetchAppointments();
    } catch (e) {
      setError("Couldn't delete appointment");
    }
  }

  async function handleAddCareTeam() {
    try {
      await apiFetch(`/api/careteam`, {
        method: "POST",
        body: JSON.stringify(careForm),
      });
      setCareForm({
        name: "",
        role: "",
        specialty: "",
        phone: "",
        email: "",
        hospital: "",
        department: "",
        notes: "",
      });
      fetchCareTeam();
    } catch (e) {
      setError("Couldn't add care team member");
    }
  }

  async function handleUpdateCareTeam() {
    try {
      await apiFetch(`/api/careteam/${editCare._id}`, {
        method: "PUT",
        body: JSON.stringify(careForm),
      });
      setEditCare(null);
      setCareForm({
        name: "",
        role: "",
        specialty: "",
        phone: "",
        email: "",
        hospital: "",
        department: "",
        notes: "",
      });
      fetchCareTeam();
    } catch (e) {
      setError("Couldn't update care team member");
    }
  }

  async function handleDeleteCareTeam(memberId) {
    if (
      !window.confirm("Are you sure you want to delete this care team member?")
    )
      return;
    try {
      await apiFetch(`/api/careteam/${memberId}`, {
        method: "DELETE",
      });
      fetchCareTeam();
    } catch (e) {
      setError("Couldn't delete care team member");
    }
  }

  return (
    <div
      className="max-w-3xl mx-auto p-6"
      aria-label="Staff Patient Records"
      role="main"
    >
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)}
        aria-label="Back to Dashboard"
      >
        ← Back to Dashboard
      </button>
      <h1 className="title mb-2" tabIndex={0}>
        Patient Records
      </h1>
      {/* Main heading is focusable for screen readers */}
      {patient && (
        <section className="mb-6" aria-label="Patient details">
          <div
            className="font-bold text-lg"
            tabIndex={0}
            aria-label="Patient username"
          >
            {patient.username}
          </div>
          <div>Age Group: {patient.ageGroup || "N/A"}</div>
          <div>User Type: {patient.userType}</div>
        </section>
      )}
      <h2 className="text-xl font-semibold mb-2" tabIndex={0}>
        Medicines
      </h2>
      <LoadingErrorEmpty
        loading={loading}
        error={error}
        empty={medicines.length === 0}
        loadingText="Loading medicines..."
        errorText={error}
        emptyText="No medicines assigned yet."
      >
        <ul
          className="divide-y divide-gray-200 mb-6"
          aria-label="Medicine list"
        >
          {medicines.map((med) => (
            <li
              key={med._id}
              className="py-3 flex flex-col md:flex-row md:items-center md:justify-between"
              tabIndex={0}
              aria-label={`Medicine: ${med.name}`}
            >
              <div>
                <span className="font-bold" aria-label="Medicine name">
                  {med.name}
                </span>{" "}
                — {med.dosage || ""} {med.frequency || ""}
                <div
                  className="text-sm text-gray-700"
                  aria-label="Medicine notes"
                >
                  {med.notes}
                </div>
                <div className="text-xs text-gray-500">
                  Last updated by: {med.updatedBy?.username || "N/A"}
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  className="btn btn-small btn-secondary focus:outline focus:outline-2 focus:outline-blue-600"
                  onClick={() => setEditMed(med)}
                  aria-label={`Edit medicine ${med.name}`}
                >
                  Edit
                </button>
                <button
                  className="btn btn-small bg-red-200 text-red-800 focus:outline focus:outline-2 focus:outline-red-600"
                  onClick={() => handleDeleteMed(med._id)}
                  aria-label={`Delete medicine ${med.name}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </LoadingErrorEmpty>
      <h3 className="text-lg font-semibold mb-2">
        {editMed ? "Edit Medicine" : "Add Medicine"}
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editMed ? handleUpdateMed() : handleAddMed();
        }}
        className="mb-8"
        aria-label={editMed ? "Edit medicine form" : "Add medicine form"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <input
            type="text"
            placeholder="Name"
            value={medForm.name}
            onChange={(e) => setMedForm({ ...medForm, name: e.target.value })}
            required
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Dosage"
            value={medForm.dosage}
            onChange={(e) => setMedForm({ ...medForm, dosage: e.target.value })}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Frequency"
            value={medForm.frequency}
            onChange={(e) =>
              setMedForm({ ...medForm, frequency: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Time"
            value={medForm.time}
            onChange={(e) => setMedForm({ ...medForm, time: e.target.value })}
            className="px-3 py-2 border rounded-lg"
          />
        </div>
        <textarea
          placeholder="Notes"
          value={medForm.notes}
          onChange={(e) => setMedForm({ ...medForm, notes: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg mb-2"
        />
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editMed ? "Update" : "Add"}
          </button>
          {editMed && (
            <button
              type="button"
              className="btn btn-secondary focus:outline focus:outline-2 focus:outline-blue-600"
              onClick={() => setEditMed(null)}
              aria-label="Cancel medicine edit"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <h2 className="text-xl font-semibold mb-2">Appointments</h2>
      <LoadingErrorEmpty
        loading={false}
        error={null}
        empty={appointments.length === 0}
        loadingText="Loading appointments..."
        errorText={"Couldn't load appointments"}
        emptyText="No appointments scheduled yet."
      >
        <ul className="divide-y divide-gray-200 mb-6">
          {appointments.map((appt) => (
            <li
              key={appt._id}
              className="py-3 flex flex-col md:flex-row md:items-center md:justify-between"
              tabIndex={0}
              aria-label={`Appointment: ${appt.title}`}
            >
              <div>
                <span className="font-bold" aria-label="Appointment title">
                  {appt.title}
                </span>{" "}
                — {new Date(appt.date).toLocaleString()} @ {appt.location}
                <div className="text-sm text-gray-700">Type: {appt.type}</div>
                <div className="text-xs text-gray-500">Notes: {appt.notes}</div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  className="btn btn-small btn-secondary focus:outline focus:outline-2 focus:outline-blue-600"
                  onClick={() => setEditAppt(appt)}
                  aria-label={`Edit appointment ${appt.title}`}
                >
                  Edit
                </button>
                <button
                  className="btn btn-small bg-red-200 text-red-800 focus:outline focus:outline-2 focus:outline-red-600"
                  onClick={() => handleDeleteAppt(appt._id)}
                  aria-label={`Delete appointment ${appt.title}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </LoadingErrorEmpty>
      <h3 className="text-lg font-semibold mb-2">
        {editAppt ? "Edit Appointment" : "Add Appointment"}
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editAppt ? handleUpdateAppt() : handleAddAppt();
        }}
        className="mb-8"
        aria-label={editAppt ? "Edit appointment form" : "Add appointment form"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <input
            type="text"
            placeholder="Title"
            value={apptForm.title}
            onChange={(e) =>
              setApptForm({ ...apptForm, title: e.target.value })
            }
            required
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="datetime-local"
            value={apptForm.date}
            onChange={(e) => setApptForm({ ...apptForm, date: e.target.value })}
            required
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            value={apptForm.location}
            onChange={(e) =>
              setApptForm({ ...apptForm, location: e.target.value })
            }
            required
            className="px-3 py-2 border rounded-lg"
          />
          <select
            value={apptForm.type}
            onChange={(e) => setApptForm({ ...apptForm, type: e.target.value })}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="check-up">Check-up</option>
            <option value="test">Test</option>
            <option value="therapy">Therapy</option>
            <option value="surgery">Surgery</option>
            <option value="other">Other</option>
          </select>
        </div>
        <textarea
          placeholder="Notes"
          value={apptForm.notes}
          onChange={(e) => setApptForm({ ...apptForm, notes: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg mb-2"
        />
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editAppt ? "Update" : "Add"} Appointment
          </button>
          {editAppt && (
            <button
              type="button"
              className="btn btn-secondary focus:outline focus:outline-2 focus:outline-blue-600"
              onClick={() => setEditAppt(null)}
              aria-label="Cancel appointment edit"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <h2 className="text-xl font-semibold mb-2">Care Team</h2>
      <LoadingErrorEmpty
        loading={false}
        error={null}
        empty={careTeam.length === 0}
        loadingText="Loading care team..."
        errorText={"Couldn't load care team"}
        emptyText="No care team members assigned yet."
      >
        <ul className="divide-y divide-gray-200 mb-6">
          {careTeam.map((member) => (
            <li
              key={member._id}
              className="py-3 flex flex-col md:flex-row md:items-center md:justify-between"
              tabIndex={0}
              aria-label={`Care team member: ${member.name}`}
            >
              <div>
                <span className="font-bold" aria-label="Care team member name">
                  {member.name}
                </span>{" "}
                — {member.role} {member.specialty && `(${member.specialty})`}
                <div className="text-sm text-gray-700">{member.notes}</div>
                <div className="text-xs text-gray-500">
                  Contact: {member.phone} {member.email}
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  className="btn btn-small btn-secondary focus:outline focus:outline-2 focus:outline-blue-600"
                  onClick={() => setEditCare(member)}
                  aria-label={`Edit care team member ${member.name}`}
                >
                  Edit
                </button>
                <button
                  className="btn btn-small bg-red-200 text-red-800 focus:outline focus:outline-2 focus:outline-red-600"
                  onClick={() => handleDeleteCareTeam(member._id)}
                  aria-label={`Delete care team member ${member.name}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </LoadingErrorEmpty>
      <h3 className="text-lg font-semibold mb-2">
        {editCare ? "Edit Care Team Member" : "Add Care Team Member"}
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editCare ? handleUpdateCareTeam() : handleAddCareTeam();
        }}
        className="mb-8"
        aria-label={
          editCare ? "Edit care team member form" : "Add care team member form"
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <input
            type="text"
            placeholder="Name"
            value={careForm.name}
            onChange={(e) => setCareForm({ ...careForm, name: e.target.value })}
            required
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Role"
            value={careForm.role}
            onChange={(e) => setCareForm({ ...careForm, role: e.target.value })}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Specialty"
            value={careForm.specialty}
            onChange={(e) =>
              setCareForm({ ...careForm, specialty: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Phone"
            value={careForm.phone}
            onChange={(e) =>
              setCareForm({ ...careForm, phone: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={careForm.email}
            onChange={(e) =>
              setCareForm({ ...careForm, email: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Hospital"
            value={careForm.hospital}
            onChange={(e) =>
              setCareForm({ ...careForm, hospital: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Department"
            value={careForm.department}
            onChange={(e) =>
              setCareForm({ ...careForm, department: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          />
        </div>
        <textarea
          placeholder="Notes"
          value={careForm.notes}
          onChange={(e) => setCareForm({ ...careForm, notes: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg mb-2"
        />
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editCare ? "Update" : "Add"} Care Team Member
          </button>
          {editCare && (
            <button
              type="button"
              className="btn btn-secondary focus:outline focus:outline-2 focus:outline-blue-600"
              onClick={() => setEditCare(null)}
              aria-label="Cancel care team member edit"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
