# PassCheck - Password Security Tool

🔐 Công cụ toàn diện để kiểm tra độ an toàn và tạo mật khẩu mạnh mẽ

> **Tác giả:** Carter Fill  
> **Bản quyền:** © 2025 Carter Fill. All rights reserved.

## ✨ Tính năng

### 🛡️ Kiểm tra độ mạnh mật khẩu
- Đánh giá chi tiết độ mạnh của mật khẩu
- Tính toán entropy và độ đa dạng ký tự
- Ước tính thời gian crack với nhiều phương pháp
- Phân tích đặc điểm mật khẩu (chữ hoa, chữ thường, số, ký tự đặc biệt)
- Đưa ra đề xuất cải thiện cụ thể

### 🚨 Kiểm tra rò rỉ
- Tích hợp API Have I Been Pwned
- Kiểm tra mật khẩu với hơn 11 tỷ tài khoản bị rò rỉ
- So sánh với database mật khẩu phổ biến
- Bảo mật tuyệt đối: chỉ gửi hash của mật khẩu

### 🔑 Tạo mật khẩu
- **Ngẫu nhiên**: Mật khẩu hoàn toàn random với tùy chỉnh chi tiết
- **Dễ nhớ**: Tạo từ các từ khóa của bạn
- **Passphrase**: Chuỗi từ ngẫu nhiên dễ nhớ, khó đoán

## 🏗️ Công nghệ sử dụng

### Backend
- **Node.js** + **Express** - Web framework
- **TypeScript** - Type safety
- **zxcvbn** - Password strength estimation
- **Axios** - HTTP client
- **Helmet** - Security headers
- **Express Rate Limit** - API protection

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 🚀 Deployment

### Deploy Production (Khuyến nghị)
- **Frontend**: Deploy lên Vercel
- **Backend**: Deploy lên Railway

📖 **Xem hướng dẫn chi tiết tại [DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## 💻 Local Development

### Yêu cầu
- Node.js >= 18.x
- npm hoặc yarn

### 1. Clone repository

```bash
cd passcheck
```

### 2. Cài đặt Backend

```bash
cd backend
npm install

# Copy file env
cp .env.example .env

# Chỉnh sửa .env nếu cần
```

### 3. Cài đặt Frontend

```bash
cd ../frontend
npm install

# Copy file env
cp .env.example .env.local

# Update VITE_API_URL nếu cần
```

### 4. Chạy ứng dụng

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server chạy tại: http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Web chạy tại: http://localhost:5173

## 📁 Cấu trúc thư mục

```
passcheck/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── routes/           # API routes
│   │   ├── types/            # TypeScript types
│   │   └── server.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── data/
    ├── wordlists/           # Password wordlists
    └── statistical-lists/   # Statistical data
```

## 🔌 API Endpoints

### Password Check
```
POST /api/password/check
Body: { password: string }
```

### Password Analysis
```
POST /api/password/analyze
Body: { password: string }
```

### Generate Random Password
```
POST /api/generator/random
Body: { length, includeUppercase, includeLowercase, ... }
```

### Generate Memorable Password
```
POST /api/generator/memorable
Body: { keywords, separator, addNumbers, ... }
```

### Generate Passphrase
```
POST /api/generator/passphrase
Body: { wordCount, separator, addNumbers, ... }
```

### Check Breach
```
POST /api/breach/check
Body: { password: string }
```

### Check Common Password
```
POST /api/breach/common
Body: { password: string }
```

## 🔒 Bảo mật

- Mật khẩu không bao giờ được lưu trữ
- Khi kiểm tra rò rỉ, chỉ 5 ký tự đầu của SHA-1 hash được gửi đi
- Rate limiting để tránh abuse
- Helmet.js cho security headers
- CORS được cấu hình đúng

## 🛠️ Build cho Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=3001
NODE_ENV=production
CORS_ORIGIN=http://localhost:5173
WORDLIST_PATH=../data/wordlists
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📜 Bản quyền và License

**Copyright © 2025 Carter Fill. All rights reserved.**

Dự án này thuộc bản quyền của Carter Fill. Mọi quyền sử dụng, sao chép, phân phối và chỉnh sửa đều do Carter Fill quản lý và chịu trách nhiệm.

MIT License - xem file LICENSE để biết thêm chi tiết

## 👨‍💻 Tác giả

**Carter Fill**  
- Thiết kế và phát triển toàn bộ hệ thống
- Email: [carterfill.vn@gmail.com]
- Website: [https://carterfill.me] 

## 🙏 Credits

- [zxcvbn](https://github.com/dropbox/zxcvbn) - Password strength estimation
- [Have I Been Pwned](https://haveibeenpwned.com/) - Breach database
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS

## ⚠️ Lưu ý

Đây là công cụ giáo dục và hỗ trợ. Luôn sử dụng mật khẩu mạnh, độc đáo cho mỗi tài khoản và bật xác thực hai yếu tố (2FA) khi có thể.

---

**Made with ❤️ and ☕ by Carter Fill**

© 2025 Carter Fill. All Rights Reserved.
