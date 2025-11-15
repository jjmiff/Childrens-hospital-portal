// auth.js
// Purpose: Centralized authentication utilities
// Handles token management, refresh, and logout

import { apiFetch } from "./api";

const TOKEN_KEY = "token";
const USER_KEY = "user";
const TOKEN_EXPIRY_KEY = "tokenExpiry";

/**
 * Store authentication data
 */
export function setAuthData(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // Store expiry time (1 hour from now)
  const expiryTime = Date.now() + 60 * 60 * 1000;
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
}

/**
 * Get stored token
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get stored user data
 */
export function getUser() {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
}

/**
 * Check if token is expired
 */
export function isTokenExpired() {
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiry) return true;
  return Date.now() > parseInt(expiry, 10);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  const token = getToken();
  const user = getUser();
  return !!(token && user && !isTokenExpired());
}

/**
 * Clear all authentication data
 */
export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
}

/**
 * Logout user and redirect
 */
export async function logout(navigate) {
  try {
    const base =
      process.env.REACT_APP_API_URL ||
      (typeof window !== "undefined" &&
      (window.location.host.includes("localhost:3000") ||
        window.location.host.includes("127.0.0.1:3000"))
        ? "http://localhost:5000"
        : "");
    await fetch(`${base}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (_) {}
  clearAuth();
  if (navigate) {
    navigate("/login");
  } else {
    window.location.href = "/login";
  }
}

/**
 * Handle 401 responses centrally
 */
export function handle401(navigate) {
  clearAuth();
  if (navigate) {
    navigate("/login", {
      state: { message: "Your session has expired. Please log in again." },
    });
  }
}

/**
 * Refresh token (placeholder for future backend implementation)
 * TODO: Implement refresh token endpoint on backend
 */
export async function refreshToken() {
  const token = getToken();
  if (!token) return false;

  try {
    // This would call a /api/auth/refresh endpoint
    // For now, we just check if we need to refresh
    if (isTokenExpired()) {
      clearAuth();
      return false;
    }
    return true;
  } catch (error) {
    clearAuth();
    return false;
  }
}

/**
 * Update user data in localStorage
 */
export function updateUser(userData) {
  const currentUser = getUser();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  }
  return null;
}

/**
 * Protected fetch - automatically handles auth and 401s
 */
export async function authenticatedFetch(url, options = {}, navigate = null) {
  const token = getToken();

  if (!token || isTokenExpired()) {
    if (navigate) {
      handle401(navigate);
    }
    throw new Error("Authentication required");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await apiFetch(url, { ...options, headers });

  if (response.status === 401) {
    if (navigate) {
      handle401(navigate);
    }
    throw new Error("Unauthorized");
  }

  return response;
}
