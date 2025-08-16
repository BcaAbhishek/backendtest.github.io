# Share Your Feelings - Backend

This is the backend service that sends WhatsApp notifications using Twilio API.

## 🚀 Deploy to Render
1. Push this repo to GitHub (make sure `.env` is ignored).
2. Go to [Render](https://render.com).
3. Create a new Web Service → connect this repo.
4. In Render Dashboard → add **Environment Variables**:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `WHATSAPP_FROM` (Twilio sandbox number, e.g., `whatsapp:+14155238886`)
   - `WHATSAPP_TO` (your number, e.g., `+91XXXXXXXXXX`)
   - `PORT` (Render auto-sets, fallback is 5000)
5. Start Command: `node server.js`

✅ Done! You will get a live URL like:
```
https://your-app.onrender.com
```
