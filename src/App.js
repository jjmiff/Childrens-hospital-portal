// App.js
// Purpose: App shell + routes. Adds a "Skip to content" link for accessibility.

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import { AccessibilityProvider } from "./contexts/AccessibilityContext";

// Lazy load pages that aren't needed immediately
const Quiz = lazy(() => import("./pages/Quiz"));
const Results = lazy(() => import("./pages/Results"));
const Profile = lazy(() => import("./pages/Profile"));
const MyCalendar = lazy(() => import("./pages/MyCalendar"));
const MyMedicines = lazy(() => import("./pages/MyMedicines"));
const MyCareTeam = lazy(() => import("./pages/MyCareTeam"));
const MyMedicalInfo = lazy(() => import("./pages/MyMedicalInfo"));
const AccessibilitySettings = lazy(() =>
  import("./pages/AccessibilitySettings")
);
const FAQ = lazy(() => import("./pages/FAQ"));
const Explainers = lazy(() => import("./pages/Explainers"));
const MRI = lazy(() => import("./pages/explainers/MRI"));
const XRay = lazy(() => import("./pages/explainers/XRay"));
const Ward = lazy(() => import("./pages/explainers/Ward"));
const Playroom = lazy(() => import("./pages/explainers/Playroom"));
const Theatre = lazy(() => import("./pages/explainers/Theatre"));
const AandE = lazy(() => import("./pages/explainers/AandE"));
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
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));

// Loading fallback component
function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className="flex justify-center items-center min-h-[400px]"
    >
      <CardSkeleton />
    </motion.div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <Router>
          <ScrollToTop />
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
                <RoutedContent />
              </div>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </Router>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
}

function RoutedContent() {
  const location = useLocation();
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
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
          <Route
            path="/accessibility"
            element={
              <ProtectedRoute>
                <AccessibilitySettings />
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
          <Route path="/explainers/aande" element={<AandE />} />
          <Route path="/explainers/map" element={<HospitalMap />} />
          <Route path="/medical-guidance" element={<MedicalGuidance />} />
          <Route path="/medical-guidance/blood-test" element={<BloodTest />} />
          <Route path="/medical-guidance/surgery" element={<Surgery />} />
          <Route path="/medical-guidance/medicine" element={<Medicine />} />
          <Route path="/medical-guidance/school" element={<HospitalSchool />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

// Scroll to top on route change; respects reduced-motion preference
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    try {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    } catch (_) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
  return null;
}
