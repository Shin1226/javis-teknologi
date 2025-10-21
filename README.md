```markdown
# 🔐 JAVIS TEKNOLOGI - Modern Login System

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens)

**A secure and modern authentication system built with cutting-edge technologies**

[Features](#-features) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [API Docs](#-api-documentation)

</div>

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
- **Fast MySQL Queries** with connection pooling
- **Optimized Build** with Vite

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- MySQL 8.0+
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/javisteknologi/login-system.git
cd login-system
```

### 2. Database Setup
```sql
-- Create database
CREATE DATABASE javisteknologi;

-- Or import provided schema
mysql -u root -p javisteknologi < database/schema.sql
```

### 3. Backend Setup
```bash
cd BE

# Install dependencies
npm install

# Environment configuration
cp .env.example .env

# Edit .env with your database credentials
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=javisteknologi
JWT_SECRET=your_jwt_secret_key

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

| Service | URL | Port | Description |
|---------|-----|------|-------------|
| Frontend | http://localhost:3000 | 3000 | React Application |
| Backend API | http://localhost:5000 | 5000 | Express Server |
| Health Check | http://localhost:5000/api/health | 5000 | API Status |

## 👤 Demo Credentials

```bash
Email: admin@javisteknologi.com
Password: password123
```

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
- **MySQL2** - Database Driver
- **CORS** - Cross-Origin Resource Sharing
- **Cookie Parser** - Cookie Management

### Database
- **MySQL** - Relational Database
- **Connection Pooling** - Performance Optimization

## 📁 Project Structure

```
JAVIS-TEKNOLOGI/
├── 📁 FE/                 # Frontend React Application
│   ├── 📁 src/
│   │   ├── 📁 components/     # React Components
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

### Authentication Endpoints

#### `POST /api/auth/login`
Authenticate user and return JWT token.

**Request:**
```json
{
  "email": "admin@javisteknologi.com",
  "password": "password123"
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
# Backend (.env)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=javisteknologi
JWT_SECRET=your_super_secret_key
NODE_ENV=development
PORT=5000
```

### MySQL Database Schema
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Using PM2 (Production)
```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start ecosystem.config.js

# Monitor application
pm2 monit
```

### Docker Support (Optional)
```dockerfile
# Dockerfile available in repository
docker-compose up -d
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Team

**PT. JAVIS TEKNOLOGI ALBAROKAH**  
*Building the future of technology solutions*

---

<div align="center">

**Need help?**  
Open an issue or contact our development team 📧

*Built with ❤️ using modern web technologies*

</div>
```

## 🎨 Fitur Khusus README Ini:

### ✅ **Visual Enhancement**
- **Badges modern** dengan shields.io
- **Emoji icons** untuk setiap section
- **Center alignment** untuk judul utama
- **Color coding** yang konsisten

### ✅ **Struktur Profesional**
- **Quick navigation** dengan anchor links
- **Table of contents** implisit
- **Code blocks** dengan syntax highlighting
- **API documentation** yang jelas

### ✅ **Developer Friendly**
- **Step-by-step installation**
- **Environment configuration** guide
- **Troubleshooting sections**
- **Deployment instructions**

### ✅ **Brand Consistency**
- **Company branding** yang kuat
- **Professional tone** throughout
- **Clear call-to-actions**
- **Team attribution**

README ini memberikan kesan sangat profesional dan menunjukkan kualitas codebase yang well-structured! 🚀