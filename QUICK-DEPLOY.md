# 🚀 Quick Deployment Guide for PassCheck

Domain: **passcheck.carterfill.me**

## Step 1: Deploy Backend to Railway 🚂

1. Go to [Railway.app](https://railway.app/) and login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select repository: `ntdovn/PassCheck`
4. **Important**: Set Root Directory to `/backend`
5. Add Environment Variables (copy from `backend/.env.production`):
   ```
   PORT=3001
   NODE_ENV=production
   CORS_ORIGIN=https://passcheck.carterfill.me
   WORDLIST_PATH=./data/wordlists
   ```
6. Wait for deployment to complete
7. **SAVE YOUR RAILWAY URL**: `https://passcheck-backend-xxx.up.railway.app`

### Test Backend:
```bash
curl https://YOUR-RAILWAY-URL/api/health
```

---

## Step 2: Deploy Frontend to Vercel ▲

1. Go to [Vercel.com](https://vercel.com/) and login
2. Click "Add New Project" → Import from GitHub
3. Select repository: `ntdovn/PassCheck`
4. **Important**: Set Root Directory to `/frontend`
5. Framework Preset: **Vite**
6. Build Command: `npm run build` (auto-detected)
7. Output Directory: `dist` (auto-detected)
8. Add Environment Variable:
   ```
   VITE_API_URL=https://YOUR-RAILWAY-URL/api
   ```
   ⚠️ Replace `YOUR-RAILWAY-URL` with the actual Railway URL from Step 1
9. Click "Deploy"

---

## Step 3: Add Custom Domain 🌐

1. In Vercel Dashboard → Go to your project
2. Click "Settings" → "Domains"
3. Add domain: `passcheck.carterfill.me`
4. Vercel will show DNS records to add
5. Go to your DNS provider (Cloudflare, etc.) and add:
   ```
   Type: A
   Name: passcheck
   Value: 76.76.21.21
   
   OR
   
   Type: CNAME
   Name: passcheck
   Value: cname.vercel-dns.com
   ```
6. Wait 5-30 minutes for DNS propagation
7. Vercel will auto-issue SSL certificate

---

## Step 4: Final Testing ✅

### Test Website
Visit: **https://passcheck.carterfill.me**

### Test All Features:
1. ✅ Password Strength Checker
   - Try: `password123` (should be weak)
   - Try: `Tr0ub4dor&3` (should be strong)

2. ✅ Password Generator
   - Random Password
   - Memorable Password
   - Passphrase

3. ✅ Data Breach Checker
   - Try: `password` (should be breached)
   - Try a unique strong password (should be safe)

### Check Console (F12)
- No CORS errors
- No 404 errors
- API calls successful

---

## 🔧 If Something Goes Wrong

### Backend Issues:
- Check Railway logs
- Verify environment variables
- Test health endpoint: `/api/health`

### Frontend Issues:
- Check Vercel deployment logs
- Verify `VITE_API_URL` is correct
- Redeploy after changing env vars

### CORS Issues:
- Verify `CORS_ORIGIN=https://passcheck.carterfill.me` on Railway
- No trailing slash in URLs
- Must use `https://` not `http://`

---

## 📝 Quick Reference

| Service | Purpose | URL |
|---------|---------|-----|
| Railway | Backend API | `https://YOUR-PROJECT.up.railway.app` |
| Vercel | Frontend | `https://passcheck.carterfill.me` |
| GitHub | Source Code | `https://github.com/ntdovn/PassCheck` |

---

## 🎉 Done!

Your PassCheck is now live at:
### 🔗 https://passcheck.carterfill.me

---

**Made with ❤️ by Carter Fill**
