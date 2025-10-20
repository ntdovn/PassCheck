# 🚀 Hướng Dẫn Deploy PassCheck

## 📋 Tổng Quan

Dự án PassCheck được chia thành 2 phần độc lập:
- **Frontend**: Deploy lên Vercel
- **Backend**: Deploy lên Railway

## 🔧 Deploy Backend lên Railway

### Bước 1: Chuẩn Bị
1. Tạo tài khoản tại [Railway.app](https://railway.app/)
2. Cài đặt Railway CLI (tùy chọn):
   ```bash
   npm install -g @railway/cli
   ```

### Bước 2: Deploy Backend
1. Đăng nhập vào Railway
2. Tạo New Project
3. Chọn "Deploy from GitHub repo"
4. Chọn repository `ntdovn/PassCheck`
5. Chọn **Root Directory**: `/backend`
6. Railway sẽ tự động detect và deploy

### Bước 3: Cấu Hình Environment Variables trên Railway
Vào Settings → Environment Variables và thêm:
```
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### Bước 4: Lấy Backend URL
- Sau khi deploy xong, Railway sẽ cung cấp URL
- URL có dạng: `https://your-backend-name.railway.app`
- **LƯU Ý**: Copy URL này để dùng cho Frontend

---

## 🎨 Deploy Frontend lên Vercel

### Bước 1: Chuẩn Bị
1. Tạo tài khoản tại [Vercel.com](https://vercel.com/)
2. Cài đặt Vercel CLI (tùy chọn):
   ```bash
   npm install -g vercel
   ```

### Bước 2: Deploy Frontend
1. Đăng nhập vào Vercel
2. Import Project từ GitHub
3. Chọn repository `ntdovn/PassCheck`
4. Chọn **Root Directory**: `/frontend`
5. Framework Preset: Vite
6. Build Command: `npm run build`
7. Output Directory: `dist`

### Bước 3: Cấu Hình Environment Variables trên Vercel
Vào Settings → Environment Variables và thêm:
```
VITE_API_URL=https://your-backend-domain.railway.app/api
```
**Thay `your-backend-domain` bằng URL Railway từ Bước 4 ở trên**

### Bước 4: Redeploy
- Sau khi thêm environment variables, click "Redeploy"

---

## 🔄 Cập Nhật CORS trên Backend

Sau khi có Frontend URL từ Vercel:
1. Quay lại Railway
2. Vào Settings → Environment Variables
3. Cập nhật `CORS_ORIGIN` với URL Vercel của bạn:
   ```
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```
4. Railway sẽ tự động redeploy

---

## 📝 Checklist Deploy

### Backend (Railway)
- [ ] Deploy backend lên Railway
- [ ] Thêm environment variables (PORT, NODE_ENV, CORS_ORIGIN)
- [ ] Copy Backend URL
- [ ] Kiểm tra health check: `https://your-backend.railway.app/api/health`

### Frontend (Vercel)
- [ ] Deploy frontend lên Vercel
- [ ] Thêm VITE_API_URL với Railway URL
- [ ] Redeploy sau khi thêm env variables
- [ ] Test website hoạt động

### Final
- [ ] Cập nhật CORS_ORIGIN trên Railway với Vercel URL
- [ ] Test tất cả chức năng: Password Checker, Generator, Breach Checker

---

## 🧪 Testing

### Test Backend
```bash
curl https://your-backend.railway.app/api/health
```

Kết quả mong đợi:
```json
{
  "status": "ok",
  "timestamp": "2025-10-20T..."
}
```

### Test Frontend
1. Mở `https://your-frontend.vercel.app`
2. Thử các chức năng:
   - Password Strength Checker
   - Password Generator
   - Data Breach Checker

---

## 🔍 Troubleshooting

### Lỗi CORS
- Kiểm tra CORS_ORIGIN trên Railway có đúng với Vercel URL không
- Đảm bảo có `https://` và không có trailing slash

### Lỗi API Connection
- Kiểm tra VITE_API_URL trên Vercel
- Đảm bảo có `/api` ở cuối URL
- Kiểm tra Backend có đang chạy không

### Backend không start
- Kiểm tra logs trên Railway
- Đảm bảo có file `railway.json` trong thư mục backend
- Kiểm tra `package.json` có scripts `build` và `start`

---

## 📚 Tài Liệu Tham Khảo

- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## 🆘 Hỗ Trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. Logs trên Railway Dashboard
2. Logs trên Vercel Dashboard
3. Console trên Browser (F12)
