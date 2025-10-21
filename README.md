```markdown
# 🔐 JAVIS TEKNOLOGI - Modern Login System

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)
![Railway](https://img.shields.io/badge/Railway-Backend-0B0D0E?style=for-the-badge&logo=railway)

A secure and modern authentication system built with cutting-edge technologies.  
**Live Demo • Features • Tech Stack • API Docs**

</div>
---

# Screenshot Tampilan UI 
https://drive.google.com/drive/folders/1qBpSmfFryTTC3KAoRrsdBxlC_WdqQXyn?usp=sharing

## 🚀 Live Demo

### 🌐 Production Deployment
- **Frontend (Vercel):** [https://javis-teknologi.vercel.app/](https://javis-teknologi.vercel.app/)  
- **Backend (Railway):** [https://javis-teknologi-production.up.railway.app](https://javis-teknologi-production.up.railway.app)  
- **Database (Supabase):** Cloud PostgreSQL
---

## 📱 Access the Application

Visit the live application and use the demo credentials below:

🌐 Website: https://javis-teknologi.vercel.app/
📧 Email: admin@javisteknologi.com
🔑 Password: admin123

---

## 🚀 Features

### 🔒 Security
- **JWT Authentication** with secure token management
- **HttpOnly Cookies** for enhanced security
- **Password Hashing** using bcryptjs
- **Rate Limiting** on login attempts
- **CORS Protection** with proper origin validation

### 🎨 User Experience
- **Modern Glassmorphism UI** with smooth animations
- **Dark/Light Mode** toggle support
- **Responsive Design** for all devices
- **Real-time Form Validation**
- **Loading States & Error Handling**

### ⚡ Performance
- **Optimized React Components** with hooks
- **Efficient API Calls** with error boundaries
- **Supabase PostgreSQL** with connection pooling
- **Optimized Build** with Vite

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- Supabase Account
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/Shin1226/javis-teknologi.git
cd javis-teknologi
```

### 2. Database Setup
- Create account at supabase.com
- Create new project
- Get your project URL and API keys
- Run the SQL schema in Supabase SQL Editor:
```sql
-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert demo user
INSERT INTO users (email, password, name) VALUES (
  'admin@javisteknologi.com',
  '$2a$12$LQv3c1yqBWVHxkd0L6kPOuYvHwqfGRVrktCAcT0iNGrTlYsujp5Rm', -- admin123
  'Administrator'
);
```
### 3. Backend Setup
```bash
cd BE

# Install dependencies
npm install

# Environment configuration
cp .env.example .env

# Edit .env with your database credentials
DB_HOST=db.your-project-ref.supabase.co
DB_USER=postgres
DB_PASSWORD=your_supabase_password
DB_NAME=postgres
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# Start development server
npm run dev
```

### 4. Frontend Setup
```bash
cd FE

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
# Terminal 1 - Backend (Port 5000)
cd BE && npm run dev

# Terminal 2 - Frontend (Port 3000)  
cd FE && npm run dev
```

### Production Build
```bash
# Build frontend
cd FE && npm run build

# Start production server
cd BE && npm start
```

## 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | https://javis-teknologi.vercel.app/ | Live React Application |
| Backend API | https://javis-teknologi-production.up.railway.app | Production API Server |
| Database | Supabase Cloud | PostgreSQL Database |
| Health Check | /api/health| API Status Endpoint |

## 🔧 Development URLs

| Service | URL | Port | Description |
|---------|-----|------|-------------|
| Frontend | http://localhost:3000 | 3000 | React Development Server |
| Backend API |http://localhost:5000 | 5000 | Express Development Server |


## 👤 Demo Credentials

```bash
Email: admin@javisteknologi.com
Password: admin123
```
⚠️ Note: These are demo credentials for testing purposes only.

## 🛠 Tech Stack

### Frontend
- **React 18** - UI Framework
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling & Dark Mode
- **React Router** - Navigation
- **Lucide React** - Icons
- **Context API** - State Management

### Backend  
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **JWT** - Authentication
- **bcryptjs** - Password Hashing
- **Supabase** - PostgreSQL Database
- **CORS** - Cross-Origin Resource Sharing
- **Cookie Parser** - Cookie Management

### Deployment & Database
- **Vercel** - Frontend Hosting
- **Railway** - Backend Hosting
- **Supabase** - PostgreSQL Database Hosting

## 📁 Project Structure

```
JAVIS-TEKNOLOGI/
├── 📁 FE/                 # Frontend React Application
│   ├── 📁 src/
│   │   ├── 📁 components/     # React Components
│   │   │   ├── Login.jsx     # Login Page Component
│   │   │   ├── Dashboard.jsx # Dashboard Component  
│   │   │   └── DarkModeToggle.jsx # Dark Mode Switch
│   │   ├── 📁 contexts/       # Auth Context
│   │   ├── 📁 assets/         # Static Files
│   │   └── App.jsx           # Main App Component
│   ├── vite.config.js       # Vite Configuration
│   └── package.json
│
├── 📁 BE/                 # Backend Express API
│   ├── 📁 routes/           # API Routes
│   ├── 📁 config/           # Database Configuration  
│   ├── 📁 middleware/       # Auth Middleware
│   ├── server.js           # Server Entry Point
│   └── package.json
│
└── 📄 README.md           # Project Documentation
```

## 🔌 API Documentation

### Base URL
Production: https://javis-teknologi-production.up.railway.app
Development: http://localhost:5000

### Authentication Endpoints

#### `POST /api/auth/login`
Authenticate user and return JWT token.

**Request:**
```json
{
  "email": "admin@javisteknologi.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "admin@javisteknologi.com",
    "name": "Administrator"
  }
}
```

#### `GET /api/auth/verify`
Verify JWT token and return user data.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### `POST /api/auth/logout`
Invalidate user session.

---

#### `GET /api/health`
Check API server status.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🎯 Key Features Implementation

### Secure Authentication Flow
```javascript
// JWT Token Generation
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Password Hashing
const hashedPassword = await bcrypt.hash(password, 12);
const isValid = await bcrypt.compare(inputPassword, storedHash);
```

### Modern React Hooks
```jsx
// Custom Auth Hook
const useAuth = () => {
  const { user, login, logout } = useContext(AuthContext);
  return { user, login, logout };
};

// Protected Routes
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

## 🔧 Configuration

### Environment Variables
```env
# Backend (.env) - Supabase Configuration
DB_HOST=db.your-project-ref.supabase.co
DB_USER=postgres
DB_PASSWORD=your_supabase_password
DB_NAME=postgres
DB_PORT=5432
JWT_SECRET=your_super_secret_key
NODE_ENV=production
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# Frontend (Production)
VITE_API_BASE_URL=https://javis-teknologi-production.up.railway.app
```

### Supabase Database Schema
```sql
-- Users table for authentication
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (optional)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Auto-deploy on git push

### Backend (Railway)
1. Connect GitHub repository to Railway
2. Set Supabase environment variables in Railway dashboard
3. Deploy automatically on git push

### Database (Supabase)
1. Create account at supabase.com
2. Create new project
3. Run the provided SQL schema
4. Get connection credentials


## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

<div align="center">
🌐 Live Application: https://javis-teknologi.vercel.app/
🐛 Report Issues: GitHub Issues
📧 Contact: Development Team

Built with ❤️ using modern web technologies

</div>
```

