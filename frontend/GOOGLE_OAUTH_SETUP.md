# Google OAuth Setup Guide

## Step 1: Get Your Google Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Go to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add authorized JavaScript origins:
   - `http://localhost:5173` (Vite dev server)
   - `http://localhost:3000` (if using different port)
7. Add authorized redirect URIs:
   - `http://localhost:5173`
   - Your production domain
8. Copy your **Client ID**

## Step 2: Update Your App

Replace `YOUR_GOOGLE_CLIENT_ID` in `src/App.jsx`:

```jsx
<GoogleOAuthProvider clientId="YOUR_ACTUAL_CLIENT_ID">
```

Example:
```jsx
<GoogleOAuthProvider clientId="123456789-abc.apps.googleusercontent.com">
```

## Step 3: Install Dependencies

```bash
npm install
```

The `@react-oauth/google` package is already in package.json.

## Step 4: Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` and test the Google login button!

## Testing Google Login

1. Click "Continue with Google" button
2. You'll be redirected to Google login
3. Sign in with your Google account
4. You'll be redirected back to the dashboard

## Environment Variables (Optional)

Create a `.env` file for better security:

```
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

Then update `src/App.jsx`:
```jsx
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
```

## Troubleshooting

**Error: "Failed to initialize Google login"**
- Make sure Client ID is correct
- Check that localhost is in authorized origins
- Clear browser cache and cookies

**Error: "CORS error"**
- Add `http://localhost:5173` to authorized origins in Google Console
- Wait a few minutes for changes to propagate

**Button not appearing**
- Check browser console for errors
- Verify `@react-oauth/google` is installed: `npm list @react-oauth/google`

## Backend Integration

To verify tokens on your backend (Python):

```python
from google.oauth2 import id_token
from google.auth.transport import requests

def verify_google_token(token):
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        return idinfo
    except ValueError:
        return None
```

Install: `pip install google-auth-oauthlib`
