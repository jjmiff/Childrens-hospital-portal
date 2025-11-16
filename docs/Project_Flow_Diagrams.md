# Project Flow Diagrams

Use these ASCII diagrams to explain major flows.

## Auth Lifecycle

```text
[User] --login--> [/api/users/login]
  -> Backend verifies credentials
  -> Returns access token (JSON) + sets httpOnly refresh cookie
  -> Frontend saves token+user in localStorage

[Frontend] --apiFetch--> [/api/*]
  -> Adds Authorization: Bearer <token>
  -> If 200: OK
  -> If 401: call /api/users/refresh (cookie) once
       -> New access token -> retry once
       -> If still 401: clear auth & redirect to /login

[User] --logout--> [/api/users/logout]
  -> Backend revokes refresh token
  -> Frontend clears localStorage, redirect to /login
```

## Medicines RBAC + Audit

```text
GET /api/medicines  (protect)
  Backend: find({ userId: req.user.userId })
           .populate('updatedBy', 'username userType')
  Returns list with audit fields

POST/PATCH/DELETE /api/medicines (:id)  (protect + staffOnly)
  Backend: only staff/admin allowed
           set med.updatedBy = req.user.userId
           save()
UI:
  - Non-staff: read-only banner; no edit controls
  - Staff: create/edit/stop/delete; shows “Last updated by X on Y”
```

## Achievements on Score Save

```text
POST /api/scores  (protect)
  -> Save score { gameType, score, total, moves?, seconds? }
  -> checkAndAwardAchievements(userId)
       - analyze prior scores
       - unlock new achievements (e.g., FIRST_QUIZ, MEMORY_FAST)
  -> Returns { message, score, newAchievements }
UI: show toasts/confetti for new achievements (respect reduced motion)
```

## Accessibility Preferences

```text
AccessibilitySettings.jsx
  - Toggle High Contrast, Text Size, Reduced Motion
AccessibilityContext.jsx
  - Persist to localStorage
  - Update DOM: html.classList (high-contrast, reduce-motion)
                html[data-text-size="small|normal|large|xlarge"]
index.css
  - CSS for contrast, font scaling, motion reduction
Result: entire app updates instantly + persists across sessions
```
