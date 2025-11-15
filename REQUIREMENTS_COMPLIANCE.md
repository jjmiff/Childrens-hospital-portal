# Requirements Compliance Matrix

## Project: Children's Hospital Portal

**Date:** November 14, 2025  
**Developer:** John J Smith

This document maps functional and non-functional requirements from the requirements document to implementation status.

---

## Functional Requirements (FR)

### FR-1: Secure Login

**Requirement:** Secure login linked to hospital registration.

**Status:** ✅ **IMPLEMENTED**

**Implementation Details:**

- JWT-based authentication system
- Password hashing with bcrypt (10 salt rounds)
- Secure token storage in localStorage
- Protected API routes with middleware
- 1-hour token expiration

**Files:**

- `backend/server.js` - Login/register endpoints
- `src/pages/Login.jsx` - Login UI
- `src/pages/Register.jsx` - Registration UI
- `backend/models/User.js` - User schema

**Test:** Users can register and login successfully.

---

### FR-2: Profiles with Avatars

**Requirement:** Profiles with avatars and accessible medical info.

**Status:** ⚠️ **PARTIALLY IMPLEMENTED**

**Implemented:**

- User profile page (`/profile`)
- Avatar display (emoji-based)
- Age group display
- Username display
- Logout functionality

**Pending:**

- Avatar selection during registration
- Medical information display (age-appropriate)
- Profile editing functionality

**Files:**

- `src/pages/Profile.jsx` - Profile page
- `backend/models/User.js` - User schema with avatar field

**Next Steps:**

- Add medical info fields to User schema
- Create age-appropriate medical info display
- Add avatar selection modal

---

### FR-3: Personalized Features

**Requirement:** Personalized calendars, medicines, care team.

**Status:** ❌ **NOT IMPLEMENTED**

**Planned Implementation:**

- Calendar component for appointments
- Medicines list with reminders
- Care team member cards
- Integration points in Profile page

**Files Needed:**

- `src/pages/Calendar.jsx`
- `src/pages/Medicines.jsx`
- `src/pages/CareTeam.jsx`
- `backend/models/Appointment.js`
- `backend/models/Medicine.js`
- `backend/models/CareTeamMember.js`

**Priority:** High (Phase 2)

---

### FR-4: Age-Appropriate Content

**Requirement:** Content segmented into three age bands (4-8, 9-14, 15-18) with tailored UI and language.

**Status:** ⚠️ **PARTIALLY IMPLEMENTED**

**Implemented:**

- Age group selection during registration
- Age group stored in User model
- Age group included in JWT payload
- Age group displayed in profile

**Pending:**

- Content filtering based on age group
- UI adaptation per age group
- Language simplification for younger users
- Different game difficulties

**Files:**

- `backend/models/User.js` - Age groups defined
- `src/pages/Register.jsx` - Age selection
- `src/pages/Profile.jsx` - Age display

**Next Steps:**

- Create age-appropriate routing/components
- Implement content filter utility
- Adapt quiz difficulty by age
- Create age-specific home screens

---

### FR-5: Departmental Explainers

**Requirement:** Explainers for MRI, X-ray, Wards, Play Areas, Surgical Theatres, Hospital Map.

**Status:** ❌ **NOT IMPLEMENTED**

**Planned Structure:**

```
src/pages/Explainers/
  - MRI.jsx
  - XRay.jsx
  - Wards.jsx
  - PlayAreas.jsx
  - SurgicalTheatres.jsx
  - HospitalMap.jsx
```

**Design Approach:**

- Interactive animations
- Simple language for younger children
- Detailed explanations for teens
- Virtual tours with images/video
- "What to expect" sections

**Priority:** High (Phase 2)

---

### FR-6: Medical Event Guidance

**Requirement:** Guidance for blood tests, surgery prep, taking medicine, hospital schooling.

**Status:** ❌ **NOT IMPLEMENTED**

**Planned Content:**

- Blood test preparation (step-by-step)
- Surgery preparation checklist
- Medicine-taking guide
- Hospital school information
- Coping strategies

**Planned Files:**

```
src/pages/Guidance/
  - BloodTests.jsx
  - SurgeryPrep.jsx
  - TakingMedicine.jsx
  - HospitalSchool.jsx
```

**Priority:** Medium (Phase 2)

---

### FR-7: Amusement Zone

**Requirement:** Age-appropriate games and entertainment.

**Status:** ⚠️ **PARTIALLY IMPLEMENTED**

#### 4-8 Years:

- ✅ Hospital Quiz (implemented)
- ✅ Memory Game (implemented)
- ❌ Simple interactive games (pending)
- ❌ Cartoons/animations (pending)

#### 9-14 Years:

- ⚠️ Quizzes (basic quiz exists, needs expansion)
- ❌ Puzzles (not implemented)
- ❌ Advanced games (not implemented)

#### 15-18 Years:

- ❌ Stress relief videos (not implemented)
- ❌ Mindfulness exercises (not implemented)
- ❌ Patient education games (not implemented)

**Implemented Files:**

- `src/pages/Quiz.jsx` - Educational quiz
- `src/components/MemoryGame.jsx` - Memory matching game
- `src/pages/Games.jsx` - Game selection hub

**Priority:** Medium (Progressive enhancement)

---

### FR-8: Easy Navigation

**Requirement:** Easy navigation to return to home screen.

**Status:** ✅ **IMPLEMENTED**

**Implementation:**

- "Back to Home" buttons on all pages
- React Router navigation
- Header with site title links to home
- Breadcrumb-style navigation
- Keyboard navigation support

**Files:**

- `src/App.js` - Route configuration
- All page components have Home links

---

## Non-Functional Requirements (NFR)

### NFR-1: Child Independence

**Requirement:** Designed for use independently by children aged 4+.

**Status:** ⚠️ **PARTIALLY IMPLEMENTED**

**Implemented:**

- Large touch targets (tiles)
- Simple language
- Icon-based navigation
- Visual feedback
- Emoji indicators

**Improvements Needed:**

- Voice assistance option
- More visual cues
- Reduced text for younger children
- Tutorial/onboarding

**Priority:** High

---

### NFR-2: WCAG 2.1 AA Accessibility

**Requirement:** WCAG 2.1 AA accessibility compliance.

**Status:** ⚠️ **IN PROGRESS**

**Implemented:**

- ✅ Skip-to-content links
- ✅ Keyboard navigation
- ✅ ARIA labels on interactive elements
- ✅ High contrast focus indicators
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Alt text for icons (aria-hidden where appropriate)
- ✅ Respects prefers-reduced-motion

**Needs Testing:**

- Screen reader compatibility
- Color contrast ratios (all combinations)
- Form label associations
- Error message announcements

**Tools Needed:**

- WAVE accessibility tool
- axe DevTools
- Screen reader testing (NVDA/JAWS)

**Priority:** High

---

### NFR-3: Performance

**Requirement:** Quick load times (<2s in hospital network).

**Status:** ❌ **NOT MEASURED**

**Current State:**

- No performance monitoring
- No lazy loading
- No code splitting
- No image optimization

**Recommended Actions:**

- Implement React.lazy for code splitting
- Add performance monitoring (Lighthouse)
- Optimize bundle size
- Implement caching strategies
- Add loading states
- Measure actual load times

**Priority:** Medium

---

### NFR-4: Offline Support

**Requirement:** Offline caching for key resources.

**Status:** ❌ **NOT IMPLEMENTED**

**Requirements:**

- Service Worker registration
- Cache-first strategy for static assets
- Background sync for data updates
- Offline indicator UI
- Local storage fallbacks

**Recommended Approach:**

- Use Create React App's built-in service worker
- Configure Workbox for caching
- Implement offline page
- Cache quiz questions locally

**Priority:** Medium (Phase 2)

---

### NFR-5: Security

**Requirement:** Patient data encrypted in transit & rest.

**Status:** ⚠️ **PARTIALLY IMPLEMENTED**

**Implemented:**

- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ HTTPS support (in production)
- ✅ Input validation (basic)

**Missing:**

- Database encryption at rest
- Rate limiting
- Input sanitization against NoSQL injection
- CORS restrictions (currently allows all)
- CSP headers
- httpOnly cookies for tokens

**Recommendations:**

```javascript
// Add to backend
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
```

**Priority:** High (Before production)

---

### NFR-6: Reliability

**Requirement:** High uptime and reliability within hospital use.

**Status:** ❌ **NOT IMPLEMENTED**

**Needed:**

- Error boundaries in React
- Global error handling
- Logging system (Winston)
- Health check endpoints
- Database connection pooling
- Retry logic for failed requests
- Monitoring/alerting

**Priority:** High (Before production)

---

## Prototype Scope Acknowledgment

Per Section 5 (Constraints):

> "Prototype may focus only on ages 6–12 and a subset of content areas for demonstration."

**Current Focus:**

- ✅ Ages 4-18 structure (exceeds prototype scope)
- ✅ Authentication system
- ✅ Basic games (Quiz, Memory)
- ⚠️ Profile foundation
- ❌ Departmental explainers (planned Phase 2)
- ❌ Medical guidance (planned Phase 2)

---

## Summary Statistics

### Functional Requirements

- **Fully Implemented:** 2/8 (25%)
- **Partially Implemented:** 3/8 (37.5%)
- **Not Implemented:** 3/8 (37.5%)

### Non-Functional Requirements

- **Fully Implemented:** 0/6 (0%)
- **Partially Implemented:** 3/6 (50%)
- **Not Implemented:** 3/6 (50%)

### Overall Completion

**Phase 1 (Prototype): ~45% Complete**

---

## Acceptance Criteria Assessment

From Section 7:

| Criteria                                      | Status | Evidence                                        |
| --------------------------------------------- | ------ | ----------------------------------------------- |
| Users can log in and navigate independently   | ✅     | Registration, login, and navigation implemented |
| Age-appropriate comprehension of medical info | ⚠️     | Structure ready, content pending                |
| Entertainment reduces patient boredom         | ⚠️     | Quiz and memory game available                  |
| Staff feedback indicates usefulness           | ❌     | Awaiting user testing                           |

---

## Recommended Roadmap

### Phase 1 (Current - Prototype) ✅

- ✅ Authentication
- ✅ Basic profile
- ✅ Games foundation
- ✅ Navigation structure

### Phase 2 (Next - Core Features)

- Departmental explainers
- Medical event guidance
- Personalized calendar/medicines
- Age-based content filtering
- Enhanced security

### Phase 3 (Future - Advanced)

- EMR integration
- Real-time chat
- AR/VR tours
- Offline-first architecture
- Advanced analytics

---

**Document Version:** 1.0  
**Last Updated:** November 14, 2025  
**Status:** Living Document
