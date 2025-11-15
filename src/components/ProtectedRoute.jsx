// ProtectedRoute.jsx
// Purpose: Wrapper component for routes that require authentication
// Redirects to login if not authenticated

import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const authenticated = isAuthenticated();

  if (!authenticated) {
    // Redirect to login, saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
