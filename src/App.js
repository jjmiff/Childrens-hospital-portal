// App.js
// Purpose: App shell + routes. Adds a "Skip to content" link for accessibility.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToastContainer from "./components/Toast";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import { CardSkeleton } from "./components/LoadingSkeleton";

// Lazy load pages that aren't needed immediately
const Quiz = lazy(() => import("./pages/Quiz"));
const Results = lazy(() => import("./pages/Results"));
const Profile = lazy(() => import("./pages/Profile"));
const MyCalendar = lazy(() => import("./pages/MyCalendar"));
const MyMedicines = lazy(() => import("./pages/MyMedicines"));
const MyCareTeam = lazy(() => import("./pages/MyCareTeam"));
const MyMedicalInfo = lazy(() => import("./pages/MyMedicalInfo"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Explainers = lazy(() => import("./pages/Explainers"));
const MRI = lazy(() => import("./pages/explainers/MRI"));
const XRay = lazy(() => import("./pages/explainers/XRay"));
const Ward = lazy(() => import("./pages/explainers/Ward"));
const Playroom = lazy(() => import("./pages/explainers/Playroom"));
const Theatre = lazy(() => import("./pages/explainers/Theatre"));
const HospitalMap = lazy(() => import("./pages/explainers/HospitalMap"));
const MedicalGuidance = lazy(() => import("./pages/MedicalGuidance"));
const BloodTest = lazy(() => import("./pages/medical-guidance/BloodTest"));
const Surgery = lazy(() => import("./pages/medical-guidance/Surgery"));
const Medicine = lazy(() => import("./pages/medical-guidance/Medicine"));
const HospitalSchool = lazy(() =>
  import("./pages/medical-guidance/HospitalSchool")
);
const MemoryGame = lazy(() => import("./components/MemoryGame"));
const WordScramble = lazy(() => import("./pages/WordScramble"));
const MathChallenge = lazy(() => import("./pages/MathChallenge"));
const PatternMatch = lazy(() => import("./pages/PatternMatch"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <CardSkeleton />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        {/* Skip link lets keyboard users jump to main content */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white border border-gray-300 rounded-xl px-3 py-2 shadow"
        >
          Skip to content
        </a>

        {/* Global toasts */}
        <ToastContainer />

        <div className="min-h-screen flex flex-col">
          {/* Navigation Header */}
          <Navigation />

          {/* Main content area. The id="main" is the skip link target. */}
          <main id="main" className="flex-1 px-4 pb-12 pt-8">
            <div className="max-w-4xl mx-auto">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/memory-game" element={<MemoryGame />} />
                  <Route path="/word-scramble" element={<WordScramble />} />
                  <Route path="/math-challenge" element={<MathChallenge />} />
                  <Route path="/pattern-match" element={<PatternMatch />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-calendar"
                    element={
                      <ProtectedRoute>
                        <MyCalendar />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-medicines"
                    element={
                      <ProtectedRoute>
                        <MyMedicines />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-care-team"
                    element={
                      <ProtectedRoute>
                        <MyCareTeam />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-medical-info"
                    element={
                      <ProtectedRoute>
                        <MyMedicalInfo />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/explainers" element={<Explainers />} />
                  <Route path="/explainers/mri" element={<MRI />} />
                  <Route path="/explainers/xray" element={<XRay />} />
                  <Route path="/explainers/ward" element={<Ward />} />
                  <Route path="/explainers/playroom" element={<Playroom />} />
                  <Route path="/explainers/theatre" element={<Theatre />} />
                  <Route path="/explainers/map" element={<HospitalMap />} />
                  <Route
                    path="/medical-guidance"
                    element={<MedicalGuidance />}
                  />
                  <Route
                    path="/medical-guidance/blood-test"
                    element={<BloodTest />}
                  />
                  <Route
                    path="/medical-guidance/surgery"
                    element={<Surgery />}
                  />
                  <Route
                    path="/medical-guidance/medicine"
                    element={<Medicine />}
                  />
                  <Route
                    path="/medical-guidance/school"
                    element={<HospitalSchool />}
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Suspense>
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
