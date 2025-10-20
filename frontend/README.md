# PassCheck Frontend

React + TypeScript + Vite frontend cho PassCheck

## 🚀 Deploy lên Vercel

### Quick Deploy
1. Import project từ GitHub trên [Vercel.com](https://vercel.com/)
2. Set Root Directory: `/frontend`
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Thêm Environment Variable:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```
7. Deploy!

### Local Development
```bash
# Install dependencies
npm install

# Copy .env.example to .env.local
cp .env.example .env.local

# Update VITE_API_URL in .env.local
# VITE_API_URL=http://localhost:3001/api

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | https://passcheck-api.railway.app/api |

**⚠️ Important**: 
- Phải có prefix `VITE_` để Vite expose variable cho client
- Phải rebuild sau khi thay đổi environment variables

## 🎨 Features

- ✅ Password Strength Checker
- ✅ Password Generator (Random, Memorable, Passphrase)
- ✅ Data Breach Checker
- ✅ Responsive Design
- ✅ Dark Mode Ready
- ✅ Real-time Analysis

## 📦 Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   └── Layout.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PasswordChecker.tsx
│   │   ├── PasswordGenerator.tsx
│   │   └── BreachChecker.tsx
│   ├── services/
│   │   └── api.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── vercel.json
```

## 🔧 Vercel Configuration

File `vercel.json` đã được cấu hình sẵn với:
- Static build từ Vite
- SPA routing (tất cả routes → index.html)
- Environment variables support

## 📚 Tech Stack
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- Axios
- Lucide React (Icons)
- React Hot Toast
