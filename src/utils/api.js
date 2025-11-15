// utils/api.js
// Purpose: Centralize API base URL handling for frontend requests
// Uses REACT_APP_API_URL when set, falls back to localhost:5000 during local dev.

import { getToken, clearAuth, getUser, setAuthData } from "./auth";

const getDefaultBase = () => {
  if (typeof window !== "undefined") {
    const host = window.location.host;
    if (host.includes("localhost:3000") || host.includes("127.0.0.1:3000")) {
      return "http://localhost:5000";
    }
  }
  return ""; // same-origin in production
};

export const API_BASE = process.env.REACT_APP_API_URL || getDefaultBase();

let refreshInFlight = null;
async function refreshAccessToken() {
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = (async () => {
    try {
      const res = await fetch(`${API_BASE}/api/users/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Refresh failed");
      }
      const data = await res.json();
      if (data && data.token) {
        const user = getUser();
        setAuthData(data.token, user || {});
        return true;
      }
      throw new Error("No token in refresh response");
    } catch (e) {
      try {
        clearAuth();
      } catch (_) {}
      return false;
    } finally {
      refreshInFlight = null;
    }
  })();
  return refreshInFlight;
}

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;

  // Merge and attach Authorization header when token is present
  const headers = new Headers(options.headers || {});
  const token = getToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let res = await fetch(url, { ...options, headers });

  // On 401, attempt single refresh then retry once
  if (res && res.status === 401 && typeof window !== "undefined") {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const retryHeaders = new Headers(options.headers || {});
      const newToken = getToken();
      if (newToken) {
        retryHeaders.set("Authorization", `Bearer ${newToken}`);
      }
      res = await fetch(url, { ...options, headers: retryHeaders });
      if (res.status !== 401) {
        return res;
      }
    }

    // If still 401 after refresh, clear and redirect
    try {
      clearAuth();
    } catch (_) {}
    if (!window.location.pathname.startsWith("/login")) {
      const current = window.location.pathname + window.location.search;
      const redirect = encodeURIComponent(current);
      window.location.href = `/login?next=${redirect}`;
    }
  }
  return res;
}
