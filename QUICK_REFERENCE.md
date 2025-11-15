# Quick Reference - Children's Hospital Portal

## 🚀 Start the Project

```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd ..
npm start
```

## 🔑 First Time Setup

1. Copy environment files:

   ```powershell
   cd backend; Copy-Item .env.example .env
   cd ..; Copy-Item .env.example .env
   ```

2. Edit `backend/.env`:

   - Set DATABASE_URL
   - Set JWT_SECRET (generate random string)

3. Start MongoDB service

4. Install dependencies:
   ```powershell
   npm install
   cd backend; npm install
   ```

## 📍 URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **MongoDB:** mongodb://localhost:27017

## 🎮 User Flow

1. Visit http://localhost:3000
2. Click "Register"
3. Select age group (4-8, 9-14, or 15-18)
4. Create username & password
5. Login with credentials
6. Access Profile, Games, Quiz

## 📂 Key Files

### Frontend

- `src/App.js` - Routes
- `src/pages/Home.jsx` - Landing page
- `src/pages/Login.jsx` - Login form
- `src/pages/Register.jsx` - Registration
- `src/pages/Profile.jsx` - User profile
- `src/pages/Quiz.jsx` - Hospital quiz
- `src/components/MemoryGame.jsx` - Memory game

### Backend

- `backend/server.js` - API server
- `backend/models/User.js` - User schema
- `backend/models/Score.js` - Score schema

## 🔌 API Endpoints

### Public

- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user

### Protected (requires JWT)

- `POST /api/scores` - Save score
- `GET /api/scores` - Get user scores

## 🐛 Common Issues

**MongoDB not starting:**

```powershell
net start MongoDB
```

**Port in use:**

```powershell
# Change PORT in backend/.env
PORT=5001
```

**Can't register:**

- Check backend is running
- Check MongoDB is running
- Check console for errors

## 📚 Documentation

- `README.md` - Full project overview
- `SETUP.md` - Detailed setup guide
- `REQUIREMENTS_COMPLIANCE.md` - Requirements tracking
- `REVIEW_SUMMARY.md` - Review results

## ✅ Checklist Before Pushing

- [ ] No `.env` files committed
- [ ] No console.log() in production code
- [ ] All imports used
- [ ] No syntax errors
- [ ] README updated if needed
- [ ] Comments added for complex code

## 🔒 Security Reminders

- Never commit `.env` files
- Use strong JWT_SECRET
- Change default passwords
- Validate all inputs
- Keep dependencies updated

## 🎨 Style Guide

**Colors:**

- Sky Blue: #A3D5FF
- Mint: #B2F0E8
- Yellow: #FFE69A

**Fonts:**

- Body: Comic Neue, Poppins
- Headings: Fredoka One

## 🧪 Quick Tests

**Backend:**

```powershell
Invoke-RestMethod http://localhost:5000
# Should return: "Welcome to the backend!"
```

**Database:**

```powershell
mongo mongodb://localhost:27017/childrens-portal
# Should connect to database
```

## 📊 Project Status

- ✅ Authentication (FR-1)
- ✅ Profile page (FR-2 partial)
- ⚠️ Age groups (FR-4 partial)
- ⚠️ Games (FR-7 partial)
- ❌ Calendar/Medicines (FR-3)
- ❌ Explainers (FR-5)
- ❌ Guidance (FR-6)

**Phase 1 (Prototype): ~45% Complete**

---

**Quick Help:** Check SETUP.md for troubleshooting
