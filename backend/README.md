# PassCheck Backend

API Backend cho PassCheck - Password Security Tool

## 🚀 Deploy lên Railway

### Quick Deploy
1. Tạo project mới trên [Railway.app](https://railway.app/)
2. Connect với GitHub repository này
3. Set Root Directory: `/backend`
4. Thêm Environment Variables:
   ```
   PORT=3001
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```
5. Deploy!

### Local Development
```bash
# Install dependencies
npm install

# Copy .env.example to .env
cp .env.example .env

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 3001 |
| NODE_ENV | Environment | production |
| CORS_ORIGIN | Allowed frontend origins (comma-separated) | https://app.vercel.app,https://app2.vercel.app |

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```

### Password Routes
```
POST /api/password/check
POST /api/password/analyze
```

### Generator Routes
```
POST /api/generator/random
POST /api/generator/memorable
POST /api/generator/passphrase
```

### Breach Routes
```
POST /api/breach/check
POST /api/breach/common
```

## 📦 Project Structure
```
backend/
├── src/
│   ├── server.ts
│   ├── controllers/
│   ├── routes/
│   └── types/
├── package.json
├── tsconfig.json
├── railway.json
└── Procfile
```

## 🔧 Railway Configuration

File `railway.json` đã được cấu hình sẵn với:
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Auto-restart on failure

## 📚 Tech Stack
- Node.js + Express
- TypeScript
- CORS & Helmet (Security)
- Rate Limiting
- Zxcvbn (Password strength)
