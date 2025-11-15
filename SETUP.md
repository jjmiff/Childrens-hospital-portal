# Setup Guide - Children's Hospital Portal

## Prerequisites Checklist

Before you begin, ensure you have the following installed:

- [ ] Node.js (v16 or higher) - [Download](https://nodejs.org/)
- [ ] npm (comes with Node.js)
- [ ] MongoDB (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- [ ] Git - [Download](https://git-scm.com/)
- [ ] A code editor (VS Code recommended)

## Step-by-Step Installation

### 1. Verify Prerequisites

Open PowerShell and verify installations:

```powershell
node --version  # Should show v16.x.x or higher
npm --version   # Should show 8.x.x or higher
mongod --version # Should show MongoDB version
```

### 2. Clone and Navigate

```powershell
git clone https://github.com/jjmiff/Childrens-hospital-portal.git
cd Childrens-hospital-portal
```

### 3. Backend Configuration

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
Copy-Item .env.example .env

# Edit the .env file with your settings
notepad .env
```

**Required .env Configuration:**

```env
DATABASE_URL=mongodb://localhost:27017/childrens-portal
JWT_SECRET=change-this-to-a-long-random-string-for-security
PORT=5000
NODE_ENV=development
```

**Generate a secure JWT_SECRET:**

```powershell
# Run this in PowerShell to generate a random secret
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

### 4. Start MongoDB

**Windows:**

- Open Services (Win + R, type `services.msc`)
- Find "MongoDB Server"
- Right-click → Start

**Or via command line:**

```powershell
net start MongoDB
```

**Verify MongoDB is running:**

```powershell
# Try connecting
mongo
# If you see a MongoDB shell prompt (>), it's working
# Type 'exit' to quit
```

### 5. Start Backend Server

```powershell
# From the backend directory
npm run dev

# You should see:
# Server running on port 5000
# Connected to MongoDB!
```

Leave this terminal window open.

### 6. Frontend Configuration

Open a **new** PowerShell window:

```powershell
# Navigate to project root (not backend folder)
cd path\to\childrens-portal

# Install dependencies
npm install

# (Optional) Create .env for frontend
Copy-Item .env.example .env
```

### 7. Start Frontend Server

```powershell
# From project root
npm start

# Browser should automatically open to http://localhost:3000
```

## First Time Use

### Create Your First User

1. Go to `http://localhost:3000`
2. Click "Register"
3. Fill in:
   - Age Group: Select your age range
   - Username: Choose a username
   - Password: At least 6 characters
4. Click "Register"
5. Login with your new credentials

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solution:**

1. Ensure MongoDB is running (check Services)
2. Verify DATABASE_URL in `.env` is correct
3. Try connecting directly: `mongo mongodb://localhost:27017`

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**

```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change PORT in backend/.env to a different number
```

### Frontend Won't Start

**Error:** `npm ERR! missing script: start`

**Solution:**

- Ensure you're in the project root directory (not `/backend`)
- Verify `package.json` exists in current directory
- Run `npm install` again

### Cannot Register User

**Error:** "Username and password are required"

**Solution:**

- Ensure backend server is running
- Check browser console for errors
- Verify backend is accessible at `http://localhost:5000`

### Missing Dependencies

**Error:** `Cannot find module 'express'` or similar

**Solution:**

```powershell
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ..
npm install
```

## Development Workflow

### Daily Development Routine

1. **Start MongoDB** (if not already running)

   ```powershell
   net start MongoDB
   ```

2. **Start Backend** (Terminal 1)

   ```powershell
   cd path\to\childrens-portal\backend
   npm run dev
   ```

3. **Start Frontend** (Terminal 2)
   ```powershell
   cd path\to\childrens-portal
   npm start
   ```

### Stopping the Servers

- Frontend: Press `Ctrl + C` in the terminal
- Backend: Press `Ctrl + C` in the terminal
- MongoDB: Can leave running, or:
  ```powershell
  net stop MongoDB
  ```

## Testing Your Setup

### Backend Health Check

Visit `http://localhost:5000` in your browser.  
You should see: **"Welcome to the backend!"**

### API Test

Test user registration:

```powershell
# Use PowerShell's Invoke-RestMethod
$body = @{
    username = "testuser"
    password = "testpass123"
    ageGroup = "9-14"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/users/register" -Method POST -Body $body -ContentType "application/json"
```

Expected response: `{"message":"User registered successfully"}`

### Frontend Test

1. Visit `http://localhost:3000`
2. Should see the home page with "Children's Hospital Portal"
3. Click "Register" - form should appear
4. Click "Games" - should show game tiles
5. Try "Hospital Quiz" - should start the quiz

## Next Steps

Once setup is complete:

1. ✅ Explore the application features
2. ✅ Review the code structure in VS Code
3. ✅ Check `README.md` for feature documentation
4. ✅ Try implementing new features
5. ✅ Run tests: `npm test`

## Production Deployment Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a strong random string
- [ ] Update DATABASE_URL to production MongoDB
- [ ] Set NODE_ENV=production
- [ ] Run `npm run build` for optimized frontend
- [ ] Enable CORS restrictions (not allow all origins)
- [ ] Add rate limiting middleware
- [ ] Set up HTTPS
- [ ] Configure proper logging
- [ ] Set up database backups
- [ ] Add monitoring (e.g., PM2 for backend)

## Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/) - JWT debugger

## Getting Help

If you encounter issues not covered here:

1. Check the main `README.md`
2. Review the code comments
3. Search GitHub issues
4. Contact the development team

---

**Happy Coding! 🚀**
