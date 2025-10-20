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
CORS_ORIGIN=https://passcheck.carterfill.me
WORDLIST_PATH=./data/wordlists
```

**Hoặc copy từ file `.env.production` trong thư mục backend**

**⚠️ Lưu ý về Data Folder:**
- Thư mục `backend/data/` (~110MB) chứa wordlists cho breach checking
- Railway tự động deploy cùng với backend
- Không cần upload riêng

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
VITE_API_URL=https://YOUR-RAILWAY-PROJECT.up.railway.app/api
```
**⚠️ QUAN TRỌNG**: Thay `YOUR-RAILWAY-PROJECT` bằng URL Railway thực tế từ Bước 4 phía trên (Backend deployment)

### Bước 4: Redeploy
- Sau khi thêm environment variables, click "Redeploy"

---

## 🔄 Cấu Hình Custom Domain trên Vercel

### Thêm Custom Domain `passcheck.carterfill.me`
1. Vào Vercel Dashboard → Project Settings → Domains
2. Add Domain: `passcheck.carterfill.me`
3. Vercel sẽ cung cấp DNS records
4. Thêm DNS records vào domain registrar của bạn:
   ```
   Type: A
   Name: passcheck (hoặc subdomain bạn muốn)
   Value: 76.76.21.21 (Vercel IP)
   
   Type: CNAME
   Name: passcheck
   Value: cname.vercel-dns.com
   ```
5. Đợi DNS propagate (5-30 phút)
6. Vercel sẽ tự động issue SSL certificate

### Xác Nhận CORS trên Railway
Backend đã được cấu hình với:
```
CORS_ORIGIN=https://passcheck.carterfill.me
```
Nếu cần thay đổi, vào Railway → Settings → Environment Variables

---

## 📝 Checklist Deploy

### Backend (Railway)
- [ ] Deploy backend lên Railway
- [ ] Thêm environment variables:
  - `PORT=3001`
  - `NODE_ENV=production`
  - `CORS_ORIGIN=https://passcheck.carterfill.me`
  - `WORDLIST_PATH=./data/wordlists`
- [ ] Copy Backend URL (ví dụ: `https://passcheck-backend-xxx.up.railway.app`)
- [ ] Kiểm tra health check: `https://YOUR-RAILWAY-URL/api/health`

### Frontend (Vercel)
- [ ] Deploy frontend lên Vercel
- [ ] Thêm environment variable:
  - `VITE_API_URL=https://YOUR-RAILWAY-URL/api`
- [ ] Thêm custom domain: `passcheck.carterfill.me`
- [ ] Cấu hình DNS records
- [ ] Đợi SSL certificate được issue
- [ ] Redeploy nếu cần

### Final Testing
- [ ] Test website tại `https://passcheck.carterfill.me`
- [ ] Test Password Strength Checker
- [ ] Test Password Generator (Random, Memorable, Passphrase)
- [ ] Test Data Breach Checker
- [ ] Kiểm tra CORS không có lỗi (F12 Console)
- [ ] Test responsive design trên mobile

---

## 🧪 Testing

### Test Backend API
```bash
# Replace YOUR-RAILWAY-URL with actual Railway URL
curl https://YOUR-RAILWAY-URL/api/health
```

Kết quả mong đợi:
```json
{
  "status": "ok",
  "timestamp": "2025-10-20T..."
}
```

### Test Frontend
1. Mở `https://passcheck.carterfill.me`
2. Kiểm tra Console (F12) - không có CORS errors
3. Test tất cả chức năng:
   - ✅ Password Strength Checker
   - ✅ Password Generator (Random, Memorable, Passphrase)
   - ✅ Data Breach Checker
4. Test trên mobile devices

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
