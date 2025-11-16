# Children's Hospital Portal — Tutor Presentation Script

Use this as a clear, 3–5 minute walkthrough of your project.

## 1) What It Is

- A child‑friendly hospital portal built with React (frontend) and Node/Express (backend) using MongoDB.
- Kids can play accessible games, track appointments and medicines, and read explainers about hospital experiences.
- Accessibility is first-class: keyboard navigation, screen reader hints, high contrast mode, text size control, reduced motion.

## 2) Tech Stack

- Frontend: React + React Router, Tailwind CSS, Framer Motion
- Backend: Node.js + Express, MongoDB + Mongoose, JWT (access + httpOnly refresh cookies)
- Security: Helmet, CORS allowlist, rate limiting

## 3) Frontend Structure (How it’s organized)

- `src/App.js`: App shell, routes, skip link, toasts, wraps in `AccessibilityProvider`.
- Routing: Protected pages use `ProtectedRoute` to redirect unauthenticated users.
- Animations: `AnimatedPage` adds quick fades and respects reduced motion.
- Notifications: `showToast(message, variant)` triggers global toasts.
- Accessibility Settings: Global context controls high contrast, text size, and motion.

## 4) Backend Structure (What the server does)

- `backend/server.js`: Express app, middleware, routes, DB connection.
- Auth Flow:
  - Login returns an access token and sets a refresh cookie.
  - `POST /api/users/refresh` rotates the refresh token and issues a new access token.
  - Logout revokes the refresh token.
- RBAC:
  - `protect` checks JWT.
  - `adminOnly` restricts admin routes.
  - `staffOnly` restricts clinical edits like medicines.

## 5) Data Models (Main collections)

- `User`: username, password hash, `userType` (child/parent/staff), (for children) `ageGroup`, avatar, `refreshTokens` metadata.
- `Medicine`: name/dosage/frequency/time/notes, `active`, audit field `updatedBy`, timestamps.
- `Appointment`: title/date/location/type/notes (per user).
- `Score`: gameType, score/total, moves/seconds; used for achievements.
- `Achievement`: unlocked badges based on game activity.

## 6) Key User Flows (How it works end-to-end)

- Auth Lifecycle
  - Login → store access token (localStorage) + set refresh cookie (httpOnly).
  - API calls use `Authorization: Bearer <token>`.
  - On 401, frontend calls `/api/users/refresh` once and retries.
  - Logout revokes refresh cookie and clears local auth.
- Medicines with RBAC and Audit
  - Everyone can read their medicines.
  - Only staff can create/update/delete (server-enforced with `staffOnly`).
  - Backend sets `updatedBy` on create/update; UI shows “Last updated by/on”.
- Achievements
  - Saving a score runs achievement checks and returns any newly unlocked badges.
  - UI shows confetti/toasts (suppressed when reduced motion is on).
- Accessibility Preferences
  - High contrast, text size, and reduced motion are global and persistent (localStorage + DOM flags).

## 7) Important Functions (by file)

- Frontend
  - `src/utils/api.js`
    - `apiFetch(path, options)`: attaches JWT; on 401, runs a single refresh + retry.
  - `src/utils/auth.js`
    - `setAuthData(token, user)`: saves token/user/expiry to localStorage.
    - `isAuthenticated()`: token present and not expired.
    - `logout(navigate)`: calls backend logout, clears auth, redirects.
  - `src/components/ProtectedRoute.jsx`: redirects to `/login` when not authenticated.
  - `src/components/Toast.jsx`
    - `showToast(message, variant)`: emits global toast events.
  - `src/contexts/AccessibilityContext.jsx`: highContrast, textSize, reducedMotion (with persistence).
- Backend (`backend/server.js`)
  - Middleware: `protect`, `adminOnly`, `staffOnly`.
  - Helpers: `calculateAge`, `getAgeGroupFromAge`, `checkAndAwardAchievements`, `unlockAchievement`.

## 8) Security Highlights

- Short-lived access token; long-lived httpOnly refresh cookie (rotated).
- Helmet security headers, rate limits, CORS allowlist.
- Server-side RBAC for medicines (staff-only edits) + audit fields.

## 9) Demo Script (fast)

1. Log in. Try visiting a protected route unauthenticated to see redirect.
2. Open Profile → Accessibility; toggle high contrast and text size.
3. Go to My Medicines: as non-staff you’ll see a read-only banner; as staff, add/edit/stop a medicine and see “Last updated by”.
4. Play Quiz or Memory; submit results; see achievements appear.
5. Show a 401 refresh by letting the access token expire (or simulate) and watching auto-refresh.

## 10) Wrap-Up

- Tablet-first, accessible UI for kids.
- Secure backend with role-based controls and auditability.
- Modular code: utilities handle auth/fetch, components handle UX/accessibility, backend enforces security and data integrity.

---

## Summary (Tutor Version)

- Scope: Full-stack app with accounts, games, health hub (appointments, medicines, care team), and learning pages.
- Auth: Short-lived access token + httpOnly refresh cookie; frontend auto-refresh via `apiFetch`.
- RBAC: `protect`, `adminOnly`, `staffOnly` middleware; medicines create/update/delete restricted to staff.
- Audit: `Medicine.updatedBy` + timestamps populated and shown (“Last updated by/on”).
- Accessibility: High contrast, text size, reduced motion (global/persistent), ARIA roles/live regions, keyboard traps, skip link.
- Games: Quiz, Memory, Word Scramble, Math Challenge, Pattern Match; keyboard shortcuts; achievements engine.
- Performance: Route-based lazy loading, short transitions respecting reduced motion, loading skeletons.
- Security: Helmet, rate limiting, CORS allowlist, bcrypt password hashing, refresh token rotation/revocation.
- Data Models: Users (age group, roles), Medicines (active, audit), Appointments, Care Team, Scores, Achievements.
- Docs & Demo: This script + flow diagrams; demo covers auth, accessibility, medicines RBAC/audit, achievements.

## Plain English (Non-Technical)

- What it is: A friendly hospital website for children to learn, play, and keep track of hospital life.
- What kids can do: Play simple games, see their appointments, learn about tests like X‑rays, and view their medicines.
- Simple to use: Big buttons, clear pages, and playful colors designed for tablets.
- Accessible for everyone: Make text bigger, turn on high contrast, or turn off animations if they bother you.
- Keyboard friendly: Works fully with the keyboard; the site tells screen readers what’s happening.
- Safe and private: Only the care team can change medicines. The system records who made updates and when.
- Secure login: You sign in safely; the site keeps you signed in without asking all the time.
- Helpful feedback: Gentle messages and celebrations when you finish games.
- Grows with the child: Content and games are suitable for different age groups.
- Ready to show: A clear walkthrough and diagrams explain how everything works.
