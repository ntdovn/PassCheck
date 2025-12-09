# Hướng dẫn Setup MongoDB Atlas (MIỄN PHÍ)

## Tại sao dùng MongoDB?
- ✅ **Miễn phí**: MongoDB Atlas có free tier 512MB (đủ cho hàng triệu visitor records)
- ✅ **Persistent**: Dữ liệu không bị mất khi deploy
- ✅ **Dễ scale**: Có thể nâng cấp khi cần
- ✅ **Hoạt động với mọi platform**: Fly.io, Railway, Vercel, Render, etc.

## Các bước setup MongoDB Atlas

### 1. Tạo tài khoản MongoDB Atlas

1. Truy cập: https://www.mongodb.com/cloud/atlas/register
2. Đăng ký tài khoản miễn phí (có thể dùng Google/GitHub)
3. Chọn plan **M0 (FREE)**

### 2. Tạo Database Cluster

1. Sau khi đăng nhập, click **"Build a Database"**
2. Chọn **"M0 FREE"** tier
3. Chọn region gần server của bạn:
   - **Singapore** (ap-southeast-1) nếu dùng Fly.io Singapore
   - Hoặc region gần nhất với users
4. Click **"Create Cluster"** (mất 1-3 phút)

### 3. Tạo Database User

1. Trong tab **"Security"** → **"Database Access"**
2. Click **"Add New Database User"**
3. Chọn **"Password"** authentication
4. Nhập username và password (LƯU LẠI!)
   - Ví dụ: username: `passcheck_user`, password: `YourStrongPassword123`
5. Set privileges: **"Read and write to any database"**
6. Click **"Add User"**

### 4. Whitelist IP Address

1. Trong tab **"Security"** → **"Network Access"**
2. Click **"Add IP Address"**
3. Chọn **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Điều này cần thiết vì cloud platforms có dynamic IPs
4. Click **"Confirm"**

### 5. Lấy Connection String

1. Trong tab **"Database"**, click **"Connect"** ở cluster của bạn
2. Chọn **"Connect your application"**
3. Chọn **Driver**: Node.js, **Version**: 5.5 or later
4. Copy connection string, nó sẽ như thế này:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Thay thế:
   - `<username>` → username bạn đã tạo
   - `<password>` → password bạn đã tạo
   - Thêm database name: `/passcheck` sau `.net`

**Ví dụ connection string hoàn chỉnh:**
```
mongodb+srv://passcheck_user:YourStrongPassword123@cluster0.abc123.mongodb.net/passcheck?retryWrites=true&w=majority
```

### 6. Cấu hình Backend

#### Cách 1: Local Development

1. Tạo file `.env` trong thư mục `passcheck-backend`:
   ```bash
   cp .env.example .env
   ```

2. Mở file `.env` và cập nhật `MONGODB_URI`:
   ```env
   MONGODB_URI=mongodb+srv://passcheck_user:YourStrongPassword123@cluster0.abc123.mongodb.net/passcheck?retryWrites=true&w=majority
   ```

#### Cách 2: Deploy trên Fly.io

1. Set environment variable:
   ```bash
   fly secrets set MONGODB_URI="mongodb+srv://passcheck_user:YourStrongPassword123@cluster0.abc123.mongodb.net/passcheck?retryWrites=true&w=majority"
   ```

2. Deploy:
   ```bash
   fly deploy
   ```

#### Cách 3: Deploy trên Railway

1. Vào Dashboard → Your Project → Variables
2. Add new variable:
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://...` (connection string của bạn)
3. Save và redeploy

#### Cách 4: Deploy trên Vercel/Render

1. Vào Settings → Environment Variables
2. Add `MONGODB_URI` với connection string
3. Redeploy

### 7. Khôi phục dữ liệu 200 người dùng

Sau khi deploy với MongoDB, chạy lệnh này để khôi phục 200 users:

```bash
# Method 1: Sử dụng API endpoint
curl -X POST https://your-api.fly.dev/api/visitor/track \
  -H "Content-Type: application/json" \
  -d '{"visitorId": "restore-200-users"}'

# Method 2: Kết nối MongoDB và insert trực tiếp
```

Hoặc sử dụng MongoDB Compass/Atlas UI để insert document:

```json
{
  "totalVisits": 200,
  "todayVisits": 4,
  "lastVisitDate": "Sun Dec 01 2025",
  "uniqueVisitors": []
}
```

### 8. Kiểm tra kết nối

Test API của bạn:

```bash
# Kiểm tra stats
curl https://your-api.fly.dev/api/visitor/stats

# Nên trả về:
# {
#   "totalVisits": 200,
#   "todayVisits": 4,
#   "uniqueVisitors": 0,
#   "lastVisitDate": "Sun Dec 01 2025",
#   "usingDatabase": true  // ✅ Đang dùng MongoDB
# }
```

## Quản lý Database

### Xem dữ liệu trong MongoDB Atlas

1. Vào tab **"Database"** → **"Browse Collections"**
2. Chọn database `passcheck` → collection `visitorstats`
3. Bạn sẽ thấy document với số liệu visitor

### Sử dụng MongoDB Compass (GUI Tool)

1. Download: https://www.mongodb.com/try/download/compass
2. Connect với connection string của bạn
3. Browse và edit data dễ dàng hơn

### Backup dữ liệu

MongoDB Atlas tự động backup mỗi ngày (free tier giữ 2 ngày).

Để manual backup:
```bash
# Export collection
mongoexport --uri="mongodb+srv://..." --collection=visitorstats --out=backup.json

# Import collection
mongoimport --uri="mongodb+srv://..." --collection=visitorstats --file=backup.json
```

## Troubleshooting

### Lỗi: "MongoServerError: bad auth"
- ✅ Kiểm tra username/password có đúng không
- ✅ Password có ký tự đặc biệt? Encode nó: https://meyerweb.com/eric/tools/dencoder/

### Lỗi: "Connection timeout"
- ✅ Kiểm tra IP có được whitelist không (0.0.0.0/0)
- ✅ Cluster đã online chưa? (mất vài phút lúc đầu)

### App chạy nhưng không lưu database
- ✅ Check logs: `fly logs` hoặc console của platform
- ✅ Verify `MONGODB_URI` đã được set đúng
- ✅ Response API có `"usingDatabase": true` không?

### Muốn đổi sang database khác?

App có fallback mechanism:
- Nếu không có MongoDB → dùng in-memory (sẽ mất khi restart)
- Có thể dễ dàng đổi sang PostgreSQL, MySQL, Redis sau

## Chi phí

- **Free tier**: 512MB storage, đủ cho ~500,000 visitor records
- **Paid tier** (nếu cần): $9/tháng cho 2GB, unlimited reads/writes

## Lợi ích so với File Storage

| Feature | File Storage | MongoDB |
|---------|--------------|---------|
| Persistent khi deploy | ❌ | ✅ |
| Scale multiple servers | ❌ | ✅ |
| Automatic backup | ❌ | ✅ |
| Query performance | Chậm | Nhanh |
| Free tier | ✅ | ✅ |
| Setup complexity | Dễ | Trung bình |

---

**Tóm lại:** Dùng MongoDB Atlas free tier là giải pháp tốt nhất để lưu visitor stats, không lo bị mất dữ liệu khi deploy trên bất kỳ platform nào! 🚀
