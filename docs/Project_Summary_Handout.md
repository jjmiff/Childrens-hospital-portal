# Children's Hospital Portal — Project Summary

**Developer:** John J Smith  
**Date:** November 16, 2025  
**Project:** Interactive Patient Portal Prototype

---

## Technical Summary (For Tutors/Assessors)

**Scope:** Full-stack application with user accounts, educational games, health tracking hub (appointments, medicines, care team), and learning content pages.

**Authentication & Security:**

- Short-lived access token (1 hour) + httpOnly refresh cookie (7 days)
- Frontend auto-refresh via `apiFetch` on 401 responses
- Helmet security headers, rate limiting, CORS allowlist
- Bcrypt password hashing, refresh token rotation/revocation

**Role-Based Access Control (RBAC):**

- `protect` middleware: Validates JWT for all authenticated routes
- `adminOnly`: Restricts admin dashboard and user management
- `staffOnly`: Medical staff-only for medicine create/update/delete
- Medicines audit: `updatedBy` field + timestamps shown in UI

**Accessibility (WCAG 2.1 AA):**

- High contrast mode, text size scaling, reduced motion (persistent preferences)
- ARIA roles, live regions, keyboard focus traps, skip links
- Keyboard shortcuts in all games (Space/Enter/number keys)
- Screen reader announcements for game progress and results

**Games & Features:**

- Quiz, Memory Match, Word Scramble, Math Challenge, Pattern Match
- Achievement system with automatic milestone detection
- Confetti celebrations (respects reduced motion)
- Performance tracking and statistics dashboard

**Performance:**

- Route-based lazy loading (~30+ components)
- Loading skeletons for perceived speed
- Short page transitions respecting reduced motion
- Initial bundle reduced from 450KB to 180-250KB

**Data Models:**

- Users: age groups, roles (child/parent/staff), refresh token metadata
- Medicines: active status, audit fields (updatedBy, timestamps)
- Appointments, Care Team, Scores, Achievements

**Tech Stack:**

- Frontend: React 19, React Router 7, Tailwind CSS, Framer Motion
- Backend: Node.js, Express 4, MongoDB, Mongoose, JWT
- Security: Helmet, express-rate-limit, bcryptjs, cookie-parser

---

## Plain English (For Non-Technical Audiences)

**What it is:**  
A friendly hospital website designed for children to learn about hospital visits, play educational games, and keep track of their appointments and medicines.

**What children can do:**

- Play fun learning games (quizzes, memory games, word puzzles)
- See their upcoming hospital appointments
- Read simple explanations about tests like X-rays and MRI scans
- View their medicine schedule
- Meet their care team online

**Why it's helpful:**

- Big buttons and clear pages make it easy to use on tablets
- You can make text bigger if it's hard to read
- Turn on high contrast colors for better visibility
- Turn off animations if they're distracting
- Everything works with the keyboard for children who can't use a mouse

**How it keeps information safe:**

- Only the child's care team can add or change medicines
- The system remembers who made changes and when
- Secure login keeps each child's information private
- Parents and children each have their own accounts

**What makes it friendly:**

- Playful colors and emoji throughout
- Gentle messages and celebrations when games are completed
- Age-appropriate content for different age groups
- Games track progress and award achievement badges

---

## Demo Highlights

1. **Authentication Flow:** Login → automatic session refresh → protected routes → logout
2. **Accessibility Settings:** Toggle high contrast, adjust text size, enable reduced motion
3. **Medicines RBAC:** Non-staff see read-only view; staff can edit with audit trail
4. **Games & Achievements:** Play games → earn badges → see confetti (if motion allowed)
5. **Responsive Design:** Tablet-first layout with mobile and desktop support

---

## Project Deliverables

- Full-stack application (React frontend + Node/Express backend)
- MongoDB database with 6+ data models
- 30+ routes and pages with lazy loading
- Comprehensive accessibility system
- Security middleware and RBAC implementation
- Tutor presentation script and flow diagrams
- Complete documentation (README, ACCESSIBILITY.md, setup guides)

---

**Repository:** [github.com/jjmiff/Childrens-hospital-portal](https://github.com/jjmiff/Childrens-hospital-portal)
