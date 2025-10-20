# 🔧 Fix Vercel Deployment Error

## Error: Environment Variable "VITE_API_URL" references Secret "vite_api_url" which does not exist.

### Solution:

Bạn cần **thêm Environment Variable trực tiếp trên Vercel Dashboard**, không phải qua secret.

### Bước 1: Vào Vercel Dashboard
1. Go to: https://vercel.com/
2. Click vào project của bạn
3. Go to: **Settings** → **Environment Variables**

### Bước 2: Thêm Environment Variable
```
Key: VITE_API_URL
Value: https://passcheck-production.up.railway.app/api
Environment: Production, Preview, Development (chọn tất cả)
```

### Bước 3: Redeploy
1. Go to **Deployments** tab
2. Click vào deployment gần nhất
3. Click **⋯** (3 dots) → **Redeploy**
4. Check "Use existing Build Cache" = OFF
5. Click **Redeploy**

---

## Alternative: Deploy từ CLI

Nếu muốn deploy từ terminal:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel --prod

# Khi được hỏi về env vars, nhập:
# VITE_API_URL=https://passcheck-production.up.railway.app/api
```

---

## Verify Environment Variable

Sau khi deploy xong, check:
1. Mở website: https://passcheck.carterfill.me
2. Mở Console (F12)
3. Run: `console.log(import.meta.env.VITE_API_URL)`
4. Should see: `https://passcheck-production.up.railway.app/api`

---

✅ Done! Your frontend should now connect to backend successfully.
