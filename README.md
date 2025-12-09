# PassCheck

A secure password checking and generation tool with breach detection capabilities.

## Features

- 🔒 **Password Strength Analysis** - Comprehensive password strength checking using zxcvbn algorithm
- 🛡️ **Breach Detection** - Check if passwords have been exposed in data breaches (Have I Been Pwned API)
- 🔑 **Password Generator** - Generate secure random passwords, memorable passwords, and passphrases
- 📊 **Visitor Statistics** - Track and display visitor statistics (optional MongoDB integration)

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- MongoDB (optional, for visitor stats)
- Security features:
  - Input validation and sanitization
  - Strict CORS configuration
  - Multi-tier rate limiting
  - Abuse detection and IP tracking
  - Cryptographically secure random generation

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (optional, for visitor statistics)

### Backend Setup

1. Install dependencies:
```bash
cd passcheck-backend
npm install
```

2. Create `.env` file:
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/passcheck
```

3. Start development server:
```bash
npm run dev
```

### Frontend Setup

1. Install dependencies:
```bash
cd passcheck-frontend
npm install
```

2. Update API endpoint in `src/services/api.ts` if needed

3. Start development server:
```bash
npm run dev
```

## Environment Variables

### Backend

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - **REQUIRED** - Frontend domain(s), comma-separated (no wildcards allowed)
- `MONGODB_URI` - MongoDB connection string (optional)

## Security Features

- ✅ Input validation and sanitization
- ✅ Strict CORS (no wildcards)
- ✅ Enhanced rate limiting (30 req/15min general, 20 req/15min password checks)
- ✅ Cryptographically secure random generation
- ✅ IP-based abuse detection
- ✅ Secure error handling (no information leakage)

## License

MIT

