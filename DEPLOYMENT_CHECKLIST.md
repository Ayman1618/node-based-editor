# 🚀 Deployment Checklist - Step by Step

## ✅ Pre-Deployment (Already Done)
- [x] Vercel configuration (`frontend/vercel.json`)
- [x] Railway configuration (`backend/railway.json` & `Procfile`)
- [x] Backend CORS updated for environment variables
- [x] Frontend API URL uses environment variable
- [x] All deployment files created

---

## 📋 What YOU Need to Do:

### Step 1: Push to GitHub (if not already done)
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

---

### Step 2: Deploy Backend to Railway

1. **Go to Railway**: https://railway.app
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Configure**:
   - **Root Directory**: `backend` (IMPORTANT!)
   - Railway will auto-detect Python
7. **Go to Settings → Variables**
8. **Add Environment Variable**:
   - **Key**: `ALLOWED_ORIGINS`
   - **Value**: `http://localhost:3000`
   - (We'll update this after frontend deploys)
9. **Wait for deployment** (takes 2-3 minutes)
10. **Copy your Railway URL** (e.g., `https://your-app.up.railway.app`)
   - Find it in: Settings → Domains → or in the deployment logs

**Test Backend**: Visit `https://your-railway-url/` → Should see `{"Ping":"Pong"}`

---

### Step 3: Deploy Frontend to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Configure Project**:
   - **Framework Preset**: Create React App (auto-detected)
   - **Root Directory**: `frontend` (IMPORTANT!)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `build` (auto-filled)
6. **Go to Environment Variables**
7. **Add Environment Variable**:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-railway-url.up.railway.app` (from Step 2)
8. **Click "Deploy"**
9. **Wait for deployment** (takes 2-3 minutes)
10. **Copy your Vercel URL** (e.g., `https://your-project.vercel.app`)

**Test Frontend**: Visit your Vercel URL → Should load the Pipeline Builder

---

### Step 4: Update Backend CORS

1. **Go back to Railway** → Your Project → Variables
2. **Update `ALLOWED_ORIGINS`**:
   - **New Value**: `https://your-vercel-url.vercel.app,http://localhost:3000`
   - Replace `your-vercel-url` with your actual Vercel URL
3. **Save** → Railway will auto-redeploy (takes 1-2 minutes)

---

### Step 5: Final Testing

1. **Backend Health Check**:
   - Visit: `https://your-railway-url/`
   - Expected: `{"Ping":"Pong"}` ✅

2. **Frontend Load**:
   - Visit: `https://your-vercel-url.vercel.app`
   - Expected: Pipeline Builder interface loads ✅

3. **Full Integration Test**:
   - Create a pipeline with nodes
   - Connect them
   - Click "Submit Pipeline"
   - Expected: Alert shows results ✅

---

## 🐛 Troubleshooting

### Backend Issues:
- **"Port already in use"**: Railway handles this automatically
- **"Module not found"**: Check `requirements.txt` is in `backend/` folder
- **CORS errors**: Make sure `ALLOWED_ORIGINS` includes your Vercel URL

### Frontend Issues:
- **"API connection failed"**: Check `REACT_APP_API_URL` is set correctly
- **"Build failed"**: Check Railway logs for errors
- **"404 on routes"**: Vercel should handle this with `vercel.json`

### Common Fixes:
- **Redeploy after env vars**: Both platforms need redeploy after adding env vars
- **Check URLs**: Make sure no trailing slashes in URLs
- **Check CORS**: Backend must include frontend URL in `ALLOWED_ORIGINS`

---

## 📝 Quick Reference

| Platform | URL Format | Config File |
|----------|-----------|-------------|
| **Railway** | `https://your-app.up.railway.app` | `backend/railway.json` |
| **Vercel** | `https://your-project.vercel.app` | `frontend/vercel.json` |

**Backend Endpoints**:
- Health: `GET /`
- API: `POST /pipelines/parse`

---

## ✅ Success Criteria

- [ ] Backend responds at Railway URL
- [ ] Frontend loads at Vercel URL
- [ ] Can create nodes on canvas
- [ ] Can connect nodes
- [ ] Submit button works
- [ ] Alert shows pipeline analysis results

**If all checked → Deployment successful! 🎉**

---

## 💡 Pro Tips

1. **Auto-deploy**: Both platforms auto-deploy on git push (if connected)
2. **Free tiers**: Both have generous free tiers for personal projects
3. **Custom domains**: You can add custom domains later if needed
4. **Logs**: Check deployment logs if something fails
5. **Environment variables**: Case-sensitive, no spaces around `=`

---

**Estimated Total Time**: 15-20 minutes

**Need Help?** Check `DEPLOYMENT.md` for detailed explanations.
