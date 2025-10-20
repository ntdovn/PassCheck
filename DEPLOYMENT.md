# 🚀 Hướng dẫn Deploy PassCheck

## Deploy Frontend lên Vercel

### Bước 1: Chuẩn bị
1. Đăng nhập vào [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import repository `PassCheck` từ GitHub

### Bước 2: Cấu hình Project
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Bước 3: Environment Variables
Thêm biến môi trường:
```
VITE_API_URL=https://your-backend-url.railway.app/api
```
(Sau khi deploy backend, cập nhật URL này)

### Bước 4: Deploy
- Click "Deploy"
- Đợi build hoàn tất
- Lưu lại URL frontend (vd: `https://passcheck.vercel.app`)

---

## Deploy Backend lên Railway

### Bước 1: Cài đặt Railway CLI (Nếu chưa có)
```bash
npm install -g @railway/cli
```

### Bước 2: Login Railway
```bash
railway login
```

### Bước 3: Deploy Backend
```bash
cd backend
railway init
railway up
```

### Bước 4: Cấu hình Environment Variables trên Railway Dashboard
Vào Railway Dashboard và thêm:
```
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://passcheck.vercel.app
WORDLIST_PATH=../data/wordlists
```
(Thay `https://passcheck.vercel.app` bằng URL frontend thực tế)

### Bước 5: Lấy URL Backend
- Vào Railway Dashboard
- Click vào service backend
- Copy URL public (vd: `https://passcheck-backend.railway.app`)

---

## Cập nhật Cross-Origin

### Cập nhật Frontend
Quay lại Vercel, cập nhật biến môi trường:
```
VITE_API_URL=https://your-backend-url.railway.app/api
```
Redeploy frontend.

### Cập nhật Backend
Trên Railway Dashboard, cập nhật:
```
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

---

## Deploy bằng GitHub Actions (Tự động)

### Deploy Frontend
Vercel tự động deploy khi push lên branch `main`.

### Deploy Backend  
Railway tự động deploy khi push lên branch `main`.

---

## Kiểm tra Deploy

### Frontend
```bash
curl https://your-frontend-url.vercel.app
```

### Backend
```bash
curl https://your-backend-url.railway.app/health
```

### Test API
```bash
curl -X POST https://your-backend-url.railway.app/api/password/check \
  -H "Content-Type: application/json" \
  -d '{"password":"Test123!@#"}'
```

---

## Troubleshooting

### Frontend build failed
- Kiểm tra `VITE_API_URL` đã set đúng
- Chạy local: `cd frontend && npm run build`

### Backend deploy failed
- Kiểm tra `package.json` có đúng scripts
- Kiểm tra `PORT` environment variable
- Chạy local: `cd backend && npm run build && npm start`

### CORS Error
- Kiểm tra `CORS_ORIGIN` trên backend khớp với URL frontend
- Restart service trên Railway

---

## Monitoring

### Vercel
- Logs: https://vercel.com/dashboard
- Analytics: Tích hợp sẵn

### Railway
- Logs: https://railway.app/dashboard
- Metrics: CPU, Memory, Network usage

---

Made with ❤️ by Carter Fill
