# LexGuard Frontend - Quick Setup & Run Guide

## 📋 Pre-Flight Checklist

- [x] All npm dependencies installed
- [ ] Google Client ID obtained
- [ ] Google Client ID added to src/App.jsx
- [ ] Backend running on localhost:8000
- [ ] Frontend can connect to backend

## 🚀 Getting Started

### 1️⃣ Setup Google OAuth (One-time)

Follow these steps **once**:

```
1. Open: https://console.cloud.google.com
2. Create new project or use existing
3. Go to: APIs & Services > Credentials
4. Click: Create Credentials > OAuth 2.0 Client ID
5. Choose: Web application
6. Add URLs:
   - JavaScript origins: http://localhost:5173
   - Redirect URIs: http://localhost:5173
7. Copy the Client ID
8. Go to: frontend/src/App.jsx
9. Replace: YOUR_GOOGLE_CLIENT_ID with your actual ID
10. Save and you're done!
```

### 2️⃣ Start Backend

```bash
cd backend
python main.py
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 3️⃣ Start Frontend

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v8.0.12 ready in 456 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### 4️⃣ Test the Application

1. Open: http://localhost:5173
2. Click "Start Free Trial"
3. Try "Continue with Google" button
4. Or signup with email: test@example.com / password123
5. You should see the dashboard
6. Upload a test PDF file to test backend connection

## 🔧 Troubleshooting

### Google Login Not Working?
```
❌ "CORS error" or "Failed to initialize"
✅ Solution:
   - Copy your actual Client ID from Google Console
   - Paste it in src/App.jsx line ~8
   - Check that http://localhost:5173 is in authorized origins
   - Restart the app (npm run dev)
```

### File Upload Not Working?
```
❌ "Failed to upload file"
✅ Solution:
   - Make sure backend is running: python main.py
   - Check backend is on http://localhost:8000
   - Try uploading a small PDF file first
```

### Backend Not Starting?
```
❌ "ModuleNotFoundError" or port already in use
✅ Solution:
   - Install dependencies: pip install -r requirements.txt
   - Kill previous process: lsof -ti:8000 | xargs kill -9
   - Restart: python main.py
```

## 📱 What You Can Do Now

✅ **Landing Page**
- Browse professional homepage
- See feature showcase
- Learn about AI agents

✅ **Authentication**
- Sign up with Google (one-click)
- Sign up with email
- Password validation

✅ **Dashboard**
- Clean, modern interface
- Collapsible sidebar navigation
- Professional header with user profile

✅ **File Upload**
- Drag-and-drop PDF/DOCX/TXT
- Click to browse files
- See upload progress
- View analysis results

✅ **Analysis Results**
- Risk score display
- AI debate panel
- Document viewer with highlights
- View detailed findings

## 🎯 Next Steps

1. **Test all features**
   - Landing page navigation
   - Google login flow
   - File upload
   - Backend connection

2. **Customize**
   - Add your company logo
   - Update colors/branding
   - Modify agent descriptions

3. **Deploy**
   - Build: `npm run build`
   - Deploy frontend to Vercel/Netlify
   - Deploy backend to Heroku/AWS

## 📞 Common Questions

**Q: Where's my Google Client ID?**
A: In Google Console > APIs & Services > Credentials > Your OAuth 2.0 Client (Web application)

**Q: How do I get another Google Client ID?**
A: Go to Google Console > Credentials > Create Credentials > OAuth 2.0 Client ID

**Q: Can I test without Google OAuth?**
A: Yes! Use the email signup form with any email and password

**Q: How do I change the UI colors?**
A: Edit the CSS variables in src/index.css (--primary-orange, colors, etc.)

**Q: Is the file upload secure?**
A: Files are sent directly to your backend. Add authentication tokens in production.

## 📚 File Structure

```
frontend/
├── src/
│   ├── App.jsx              ← Add Google Client ID here
│   ├── index.css            ← Styling
│   ├── main.jsx
│   └── pages/
│       ├── Dashboard.jsx    ← Main dashboard
│       ├── LandingPage.jsx  ← Homepage
│       └── SignupPage.jsx   ← Auth page
├── package.json
└── GOOGLE_OAUTH_SETUP.md    ← Detailed setup guide
```

## 🎨 Customization Quick Tips

**Change Primary Color:**
```css
/* src/index.css */
--primary-orange: #FF8F1C;  /* Change this hex code */
```

**Change Company Name:**
```jsx
/* All files have "LexGuard X" - find and replace */
```

**Change Button Text:**
```jsx
/* src/pages/LandingPage.jsx */
"Start Free Trial" → "Your text here"
```

## ✨ That's It!

You now have a fully functional, beautiful legal AI analysis platform!

Questions? Check GOOGLE_OAUTH_SETUP.md for more details. Happy coding! 🚀
