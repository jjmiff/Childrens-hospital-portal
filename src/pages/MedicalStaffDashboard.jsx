// MedicalStaffDashboard.jsx
// Purpose: Allow staff to search/select patients and view/edit their records

import { useEffect, useState } from "react";
import { useCallback } from "react";
import LoadingErrorEmpty from "../components/LoadingErrorEmpty";
import { apiFetch } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function MedicalStaffDashboard() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(
        `/api/staff/patients?search=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      setPatients(data.patients || []);
    } catch {
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    document.title = "Staff Dashboard — Children's Hospital Portal";
    fetchPatients();
  }, [fetchPatients]);

  function handleSelectPatient(patient) {
    // Navigate to a patient record page, passing userId
    navigate(`/staff/patient/${patient._id}`);
  }

  return (
    <main
      className="max-w-3xl mx-auto p-6"
      aria-label="Medical Staff Dashboard"
      role="main"
    >
      <h1 className="title mb-6" tabIndex={0}>
        Medical Staff Dashboard
      </h1>
      <form
        className="mb-4"
        role="search"
        aria-label="Patient search"
        onSubmit={(e) => {
          e.preventDefault();
          fetchPatients();
        }}
      >
        <label htmlFor="patient-search" className="sr-only">
          Search patients by name
        </label>
        <input
          id="patient-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patients by name..."
          className="w-full px-4 py-2 border rounded-lg"
          aria-label="Search patients by name"
          autoComplete="off"
        />
        <button
          type="submit"
          onClick={fetchPatients}
          className="btn btn-primary mt-2 focus:outline focus:outline-2 focus:outline-blue-600"
          aria-label="Search patients"
        >
          Search
        </button>
      </form>
      <section
        className="mb-6 p-4"
        style={{
          backgroundColor: "#e3f2fd",
          border: "2px solid #1976d2",
          borderRadius: "0.75rem",
        }}
        aria-label="How to access patient records"
      >
        <h2 className="text-lg font-bold mb-2" tabIndex={0} id="how-to-access">
          How to access patient records:
        </h2>
        <ol
          className="list-decimal ml-6 text-gray-700"
          aria-labelledby="how-to-access"
        >
          <li>Log in as a staff user.</li>
          <li>Go to the Medical Staff Dashboard (this page).</li>
          <li>Search for a patient by name.</li>
          <li>
            Click <b>View Records</b> next to the patient to manage their
            medicines, appointments, and care team.
          </li>
        </ol>
      </section>
      <LoadingErrorEmpty
        loading={loading}
        error={false}
        empty={patients.length === 0}
        loadingText="Loading patients..."
        errorText={"Could not load patients."}
        emptyText={
          search.trim()
            ? "No patients found matching your search."
            : "No patients found. Please check if any child users exist."
        }
      >
        <ul className="divide-y divide-gray-200" aria-label="Patient list">
          {patients.map((patient) => (
            <li
              key={patient._id}
              className="py-3 flex justify-between items-center"
              tabIndex={0}
              aria-label={`Patient: ${patient.username}`}
            >
              <span aria-label="Patient name">
                {patient.username} ({patient.ageGroup || patient.userType})
              </span>
              <button
                className="btn btn-secondary focus:outline focus:outline-2 focus:outline-blue-600"
                onClick={() => handleSelectPatient(patient)}
                aria-label={`View records for ${patient.username}`}
              >
                View Records
              </button>
            </li>
          ))}
        </ul>
      </LoadingErrorEmpty>
    </main>
  );
}
