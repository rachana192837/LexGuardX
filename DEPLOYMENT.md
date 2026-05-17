# LexGuard X - Google Cloud Deployment Guide

This guide describes how to deploy LexGuard X to Google Cloud Platform for the final submission.

## 1. Backend (Google Cloud Run)
Run these commands from the `backend/` directory:

1. **Build the Image**:
   ```bash
   gcloud builds submit --tag gcr.io/[PROJECT_ID]/lexguard-backend
   ```
2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy lexguard-backend --image gcr.io/[PROJECT_ID]/lexguard-backend --platform managed --allow-unauthenticated --set-env-vars GEMINI_API_KEY=[YOUR_KEY]
   ```

## 2. Frontend (Firebase Hosting)
Run these commands from the `frontend/` directory:

1. **Build the Frontend**:
   ```bash
   npm run build
   ```
2. **Init Firebase**:
   ```bash
   firebase init hosting
   ```
   - Select your project.
   - Use `dist` as the public directory.
   - Configure as a single-page app? **Yes**.
3. **Deploy**:
   ```bash
   firebase deploy --only hosting
   ```

## 3. Important Notes
- **CORS**: After deploying the backend, copy the Cloud Run URL and add it to the `allow_origins` list in `backend/main.py`.
- **API URL**: Update the `fetch` URL in `frontend/src/pages/Dashboard.jsx` to point to your new Cloud Run backend URL.

---
**LexGuard X - Google Cloud Certified** ☁️🚀
