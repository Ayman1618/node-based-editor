# Deployment Guide

This guide will help you deploy both the frontend (Vercel) and backend (Railway) of the Pipeline Builder application.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Railway account (free tier available)
- Git repository with your code

---

## Part 1: Deploy Backend to Railway

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"

### Step 2: Deploy Backend
1. Select "Deploy from GitHub repo"
2. Choose your repository
3. Select the `backend` folder as the root directory
4. Railway will automatically detect Python and install dependencies

### Step 3: Configure Environment Variables
1. Go to your project settings → Variables
2. Add the following variable:
   ```
   ALLOWED_ORIGINS = https://your-frontend-url.vercel.app,http://localhost:3000
   ```
   (Replace `your-frontend-url.vercel.app` with your actual Vercel URL after deployment)

### Step 4: Get Backend URL
1. Railway will provide a URL like: `https://your-app-name.up.railway.app`
2. Copy this URL - you'll need it for the frontend

### Step 5: Update Start Command (if needed)
Railway should auto-detect, but if not:
- Go to Settings → Deploy
- Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### Step 2: Deploy Frontend
1. Click "Add New Project"
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 3: Add Environment Variable
1. Go to Project Settings → Environment Variables
2. Add:
   ```
   REACT_APP_API_URL = https://your-backend-url.up.railway.app
   ```
   (Replace with your Railway backend URL)

### Step 4: Redeploy
1. After adding the environment variable, go to Deployments
2. Click the three dots on the latest deployment
3. Select "Redeploy"

---

## Part 3: Update Backend CORS (After Frontend Deployment)

Once you have your Vercel frontend URL:

1. Go back to Railway → Your Project → Variables
2. Update `ALLOWED_ORIGINS`:
   ```
   ALLOWED_ORIGINS = https://your-frontend.vercel.app,http://localhost:3000
   ```
3. Railway will automatically redeploy

---

## Verification

1. **Backend Health Check**: Visit `https://your-backend-url.up.railway.app/`
   - Should return: `{"Ping":"Pong"}`

2. **Frontend**: Visit your Vercel URL
   - Should load the Pipeline Builder interface
   - Try submitting a pipeline to verify backend connection

---

## Troubleshooting

### Backend Issues
- **Port Error**: Make sure start command uses `$PORT` environment variable
- **CORS Errors**: Verify `ALLOWED_ORIGINS` includes your Vercel URL
- **Dependencies**: Check Railway logs for missing packages

### Frontend Issues
- **API Connection**: Verify `REACT_APP_API_URL` is set correctly
- **Build Errors**: Check Vercel build logs
- **Environment Variables**: Remember to redeploy after adding env vars

### Common Issues
- **CORS Errors**: Make sure backend `ALLOWED_ORIGINS` includes frontend URL
- **404 on Routes**: Vercel should handle React Router automatically with the `vercel.json` config
- **Environment Variables**: Both platforms need a redeploy after adding env vars

---

## Quick Reference

### Backend (Railway)
- **URL Format**: `https://your-app-name.up.railway.app`
- **Health Check**: `GET /`
- **API Endpoint**: `POST /pipelines/parse`

### Frontend (Vercel)
- **URL Format**: `https://your-project-name.vercel.app`
- **Environment Variable**: `REACT_APP_API_URL`

---

## Notes

- Railway free tier includes 500 hours/month
- Vercel free tier is generous for personal projects
- Both platforms auto-deploy on git push (if connected)
- Environment variables are case-sensitive
