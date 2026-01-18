# Quick Deployment Checklist

## 🚀 Backend (Railway) - 5 minutes

1. **Sign up**: [railway.app](https://railway.app) → Sign in with GitHub
2. **New Project** → Deploy from GitHub repo
3. **Select repo** → Choose `backend` folder as root
4. **Add Environment Variable**:
   - Key: `ALLOWED_ORIGINS`
   - Value: `http://localhost:3000` (update after frontend deploy)
5. **Copy Backend URL** (e.g., `https://your-app.up.railway.app`)

---

## 🎨 Frontend (Vercel) - 5 minutes

1. **Sign up**: [vercel.com](https://vercel.com) → Sign in with GitHub
2. **New Project** → Import GitHub repo
3. **Configure**:
   - Root Directory: `frontend`
   - Framework: Create React App (auto-detected)
4. **Add Environment Variable**:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.up.railway.app` (from step above)
5. **Deploy** → Copy Frontend URL

---

## 🔄 Update Backend CORS

1. Go back to Railway → Variables
2. Update `ALLOWED_ORIGINS`:
   ```
   https://your-frontend.vercel.app,http://localhost:3000
   ```
3. Railway auto-redeploys

---

## ✅ Test

- Backend: Visit `https://your-backend.up.railway.app/` → Should see `{"Ping":"Pong"}`
- Frontend: Visit your Vercel URL → Should load app
- Test: Create a pipeline and submit → Should work!

---

**That's it!** 🎉
