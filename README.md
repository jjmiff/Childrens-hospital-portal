# 🏥 Children's Hospital Portal

A child-friendly web application designed to help young patients at Children's Hospital stay engaged, informed, and empowered during their healthcare journey. Built with React, Node.js, and MongoDB, this portal provides interactive games, health tracking, and educational content tailored to different age groups.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [User Guide](#-user-guide)
- [Deployment](#-deployment)
- [Accessibility](#-accessibility)
- [License](#-license)

## ✨ Features

### 🎮 Interactive Games & Learning

- **Quiz Challenge**: Test knowledge with fun trivia questions
- **Memory Match**: Improve memory with card matching game
- Age-appropriate content for different age groups (4-6, 7-10, 11-14, 15-18)
- Performance tracking and achievements
- Confetti celebrations on game completion

### 🏥 My Health Hub

- **My Calendar**: Track hospital appointments and visits
  - Upcoming/Past appointment filters
  - Color-coded appointment types
  - Edit and delete functionality
- **My Medicines**: Manage medications with reminders
  - Active/Stopped medicine tracking
  - Quick toggle to stop/resume medications
  - Dosage and timing information
- **My Care Team**: Keep contact information for healthcare providers
  - Store doctor and nurse details
  - Contact information and specialties
  - Notes for each team member

### 👤 User Profiles

- Personalized avatars (emoji-based)
- Age-based content filtering
- Statistics dashboard with game scores
- Achievement badges and progress tracking
- Profile customization

### 🎨 Child-Friendly Design

- Bright, colorful interface with playful elements
- Large buttons and clear navigation
- Emoji-based visual cues throughout
- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions

### ♿ Accessibility Features

- WCAG 2.1 AA compliant
- Full keyboard navigation support
- Screen reader optimized with ARIA labels
- High contrast focus indicators
- Reduced motion support for accessibility preferences
- Error boundary for graceful error handling

### 🛡️ Production-Ready Features

- Client-side form validation with helpful error messages
- Loading skeleton components for better UX
- Toast notifications for user feedback
- Error boundary to catch React errors
- Comprehensive input validation
- Comprehensive input validation
- Performance optimized with lazy loading

## 🚀 Recent Enhancements (Nov 2025)

### Security & Auth Improvements

- ✅ Centralized authentication system (`src/utils/auth.js`)
- ✅ Custom `useAuth` hook for consistent auth state
- ✅ Token expiry tracking with auto-logout
- ✅ Protected route wrapper component
- ✅ Session expiry messages and graceful UX

### Performance Optimizations

- ✅ Lazy loading for 30+ route components
- ✅ ~50% reduction in initial bundle size (450KB → 180-250KB)
- ✅ Faster First Contentful Paint (~40% improvement)
- ✅ Better mobile experience on slow connections

📖 **See [ENHANCEMENTS_SUMMARY.md](./ENHANCEMENTS_SUMMARY.md) for detailed documentation**
📋 **See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for testing procedures**

## 🏗️ Tech Stack

### Frontend

- **React** 18.x - UI framework
- **React Router** 6.x - Client-side routing
- **TailwindCSS** - Utility-first styling
- **PostCSS** - CSS processing

### Backend

- **Node.js** - Runtime environment
- **Express** 4.x - Web server framework
- **MongoDB** - NoSQL database
- **Mongoose** 6.x - ODM for MongoDB
- **JWT** - Authentication tokens (1-hour expiry)
- **Helmet** - Security headers
- **Express Rate Limit** - API rate limiting
- **bcrypt** - Password hashing (10 rounds)

### Development Tools

- **Create React App** - Build tooling
- **ESLint** - Code linting
- **Prettier** (recommended) - Code formatting

## 📋 Requirements

- Node.js 16+ and npm
- MongoDB 4.4+
- Modern web browser

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/jjmiff/Childrens-hospital-portal.git
cd childrens-portal
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration:
# DATABASE_URL=mongodb://localhost:27017/childrens-portal
# JWT_SECRET=your-super-secret-key-here
# PORT=5000

# Start MongoDB (if not running)
# Windows: Start MongoDB service from Services
# Mac/Linux: sudo systemctl start mongod

# Start the backend server
npm start
# For development with auto-reload:
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# From project root
cd ..

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env

# Start the development server
npm start
```

Frontend will open at `http://localhost:3000`

## 📚 Available Scripts

### Frontend

- `npm start` - Run development server
- `npm test` - Run test suite
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (one-way operation)

### Backend

- `npm start` - Run production server
- `npm run dev` - Run with nodemon (auto-reload)
- `npm test` - Run tests (not yet implemented)

## 🗂️ Project Structure

```
childrens-portal/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema with age groups
│   │   └── Score.js         # Game score tracking
│   ├── server.js            # Express server & API routes
│   ├── package.json
│   └── .env.example
├── src/
│   ├── components/
│   │   ├── ConfettiLayer.jsx
│   │   ├── MemoryGame.jsx
│   │   └── ProgressBar.jsx
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── Login.jsx        # User login
│   │   ├── Register.jsx     # New user registration
│   │   ├── Profile.jsx      # User profile (FR-2)
│   │   ├── Games.jsx        # Game selection
│   │   ├── Quiz.jsx         # Educational quiz (FR-7)
│   │   └── Results.jsx      # Quiz results
│   ├── App.js               # Route configuration
│   ├── index.css            # Global styles
│   └── index.js             # React entry point
├── public/
│   └── sfx/                 # Sound effects (optional)
└── README.md
```

## 🔐 API Endpoints

### Authentication

**Register User**

```http
POST /api/users/register
Content-Type: application/json

{
  "username": "johnny123",
  "password": "securepass",
  "dateOfBirth": "2010-05-15"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Login**

```http
POST /api/users/login
Content-Type: application/json

{
  "username": "johnny123",
  "password": "securepass"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johnny123",
    "ageGroup": "11-14",
    "avatar": "🧒"
  }
}

Sets httpOnly refresh token cookie (7-day expiry)
```

**Refresh Access Token**

```http
POST /api/users/refresh
Cookie: refreshToken=<httpOnly-cookie>

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Rotates refresh token cookie automatically
```

**Logout**

```http
POST /api/users/logout
Cookie: refreshToken=<httpOnly-cookie>

Response: 200 OK
{
  "message": "Logged out"
}

Revokes refresh token and clears cookie
```

### User Profile

**Get User Stats**

```http
GET /api/users/stats
Authorization: Bearer <token>

Response: 200 OK
{
  "totalGames": 45,
  "totalQuizzes": 30,
  "totalMemoryGames": 15,
  "averageScore": 82.5
}
```

**Update Avatar**

```http
PATCH /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "avatar": "🦸"
}
```

### Appointments

All appointment endpoints require authentication.

**List Appointments**

```http
GET /api/appointments
Authorization: Bearer <token>
```

**Create Appointment**

```http
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Dentist Checkup",
  "date": "2024-02-15T10:00:00.000Z",
  "location": "Room 204",
  "type": "check-up"
}
```

**Update Appointment**

```http
PATCH /api/appointments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "date": "2024-02-16T14:00:00.000Z"
}
```

**Delete Appointment**

```http
DELETE /api/appointments/:id
Authorization: Bearer <token>
```

### Medicines

**List Medicines**

```http
GET /api/medicines
Authorization: Bearer <token>
```

**Create Medicine**

```http
POST /api/medicines
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Vitamin C",
  "dosage": "500mg",
  "frequency": "Daily",
  "time": "09:00",
  "notes": "With breakfast"
}
```

**Update Medicine (Stop/Resume)**

```http
PATCH /api/medicines/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "active": false
}
```

### Care Team

**List Care Team Members**

```http
GET /api/careteam
Authorization: Bearer <token>
```

**Create Care Team Member**

```http
POST /api/careteam
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Dr. Sarah Johnson",
  "role": "Pediatrician",
  "phone": "+1-555-0123",
  "email": "dr.johnson@hospital.com"
}
```

### Scores

**Save Game Score**

```http
POST /api/scores
Authorization: Bearer <token>
Content-Type: application/json

{
  "gameType": "quiz",
  "score": 85,
  "totalQuestions": 10,
  "correctAnswers": 9
}
```

**Get User Scores**

```http
GET /api/scores
Authorization: Bearer <token>
```

**Authentication:** Include JWT token in headers:

```javascript
Authorization: Bearer <your-token-here>
```

## 👥 User Age Groups

Users select their age group during registration:

- **4-8 years:** Younger Kids (simple games, animations)
- **9-14 years:** Older Kids (interactive educational content)
- **15-18 years:** Teens (complex medical info, advanced features)

## ✅ Functional Requirements Status

| ID   | Requirement                                       | Status                                          |
| ---- | ------------------------------------------------- | ----------------------------------------------- |
| FR-1 | Secure login linked to hospital registration      | ✅ Implemented (JWT)                            |
| FR-2 | Profiles with avatars and accessible medical info | ⚠️ Partial (profile page, medical info pending) |
| FR-3 | Personalized calendars, medicines, care team      | ❌ Planned                                      |
| FR-4 | Content segmented by age bands                    | ⚠️ Partial (structure ready)                    |
| FR-5 | Departmental explainers                           | ✅ Implemented (6 explainers + hub)             |
| FR-6 | Medical event guidance                            | ✅ Implemented (4 guidance pages)               |
| FR-7 | Amusement Zone                                    | ✅ Implemented (quiz + memory game)             |
| FR-8 | Easy navigation                                   | ✅ Implemented (navigation + footer)            |

## ♿ Accessibility Features

- WCAG 2.1 AA compliance target
- Keyboard navigation support
- Skip-to-content links
- High contrast focus indicators
- ARIA labels throughout
- Screen reader friendly
- Respects `prefers-reduced-motion`
- Large touch targets for tablets

## 🎨 Design System

**Color Palette:**

- Sky Blue: `#A3D5FF` (background)
- Mint: `#B2F0E8` (primary actions)
- Warm Yellow: `#FFE69A` (accents)
- White cards with soft shadows

**Typography:**

- Body: Comic Neue, Poppins
- Headings: Fredoka One (friendly, readable)

## 🔒 Security

- Password hashing with bcrypt (10 rounds)
- JWT access tokens (1-hour expiration)
- HttpOnly refresh tokens (7-day expiration with rotation)
- Protected API routes with middleware
- Input validation on backend
- CORS configuration with credentials support
- Helmet security headers
- Express rate limiting (300 req/15min API, 120 req/15min admin)

### Session & Token Management

**Access Tokens:**

- Short-lived (1 hour)
- Stored in localStorage
- Auto-attached to API requests
- Used for API authorization

**Refresh Tokens:**

- Long-lived (7 days, configurable via `REFRESH_TTL`)
- Stored in httpOnly cookies (XSS protection)
- Automatically rotated on each refresh
- Revoked on logout
- Tracked per-device with metadata (user agent, IP, timestamps)

**Silent Token Refresh:**

- Frontend automatically refreshes expired access tokens
- Single-flight guard prevents refresh storms
- One retry on 401 responses
- Falls back to login redirect on refresh failure

### Environment Variables

**Backend (.env):**

```bash
DATABASE_URL=mongodb://localhost:27017/childrens-portal
JWT_SECRET=your-strong-access-token-secret
REFRESH_SECRET=your-strong-refresh-token-secret  # Optional, defaults to JWT_SECRET
REFRESH_TTL=7d                                    # Optional, default 7 days
PORT=5000
NODE_ENV=production                               # Use 'production' for secure cookies
FRONTEND_ORIGIN=https://your-app.com              # Required for CORS with credentials
```

**Frontend (.env):**

```bash
REACT_APP_API_URL=https://api.your-app.com        # Optional, defaults to same-origin
```

**Production Recommendations:**

- Use strong, unique secrets for `JWT_SECRET` and `REFRESH_SECRET`
- Set `NODE_ENV=production` to enable secure cookies
- Configure `FRONTEND_ORIGIN` to your deployed domain
- Use HTTPS only in production
- Consider shorter `REFRESH_TTL` for higher security contexts
- Monitor and prune revoked refresh tokens periodically

## 🧪 Testing

```bash
# Frontend tests
npm test

# Run with coverage
npm test -- --coverage
```

Current test files:

- `src/App.test.js` - Basic render test
- Additional tests planned for components

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Tablet-optimized (iPad, Android tablets)

## 🚧 Known Issues & Limitations

1. **Prototype Scope:** Focus on ages 6-12 content subset
2. **Sound Effects:** Optional MP3 files in `/public/sfx/`
3. **FAQ Page:** Linked but not implemented
4. **Offline Mode:** Service worker not yet configured
5. **Memory Game CSS:** Card flip animations need styling enhancement

## 🔮 Planned Enhancements

**Phase 1 (Current Prototype):**

- ✅ Authentication system
- ✅ Basic profile
- ✅ Quiz game
- ✅ Memory game

**Phase 2 (Next Release):**

- Departmental explainers (MRI, X-ray, etc.)
- Medical event guidance
- Personalized calendar
- Age-appropriate content filtering

**Phase 3 (Future):**

- EMR integration
- Real-time chat with care team
- AR/VR hospital tours
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is private and proprietary to the Local Hospital Children's Wing.

## 👨‍💻 Development Team

**Developer:** John J Smith  
**Client:** Local Hospital Children's Wing  
**Project Type:** Interactive Patient Portal Prototype

## 📞 Support

For issues or questions:

1. Check the documentation
2. Review existing GitHub issues
3. Contact the development team

## 🙏 Acknowledgments

- Hospital staff for requirements and feedback
- Testing participants from patient families
- React and Node.js communities

---

**Built with ❤️ for children's healthcare**
