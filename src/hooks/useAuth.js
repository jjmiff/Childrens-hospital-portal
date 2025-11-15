// useAuth.js
// Purpose: Custom hook for authentication state and actions
// Provides consistent auth interface across components

import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  isAuthenticated,
  getUser,
  getToken,
  logout as authLogout,
  setAuthData,
  isTokenExpired,
} from "../utils/auth";

export function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  // Check auth status on mount and periodically
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      setUser(getUser());

      // If token expired, logout
      if (!authenticated && getToken()) {
        authLogout(navigate);
      }
    };

    checkAuth();

    // Check every minute for token expiry
    const interval = setInterval(checkAuth, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  const login = useCallback((token, userData) => {
    setAuthData(token, userData);
    setUser(userData);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    authLogout(navigate);
    setUser(null);
    setIsLoggedIn(false);
  }, [navigate]);

  const updateUserData = useCallback((updates) => {
    const currentUser = getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setAuthData(getToken(), updatedUser);
      setUser(updatedUser);
    }
  }, []);

  return {
    user,
    isLoggedIn,
    isAuthenticated: isLoggedIn,
    login,
    logout,
    updateUser: updateUserData,
    token: getToken(),
    tokenExpired: isTokenExpired(),
  };
}
