// BE/server.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';

const app = express();

// CORS configuration - allow all origins in development
app.use(cors({
  origin: [
    'https://javis-teknologi.vercel.app', // URL Vercel Anda
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging middleware
app.use((req, res, next) => {
  console.log(`📨 ${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
  console.log('   Origin:', req.headers.origin || 'No origin');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    message: '✅ Server is running',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 5000,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test endpoint untuk CORS
app.get('/api/test-cors', (req, res) => {
  res.json({
    success: true,
    message: 'CORS is working!',
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 JAVIS TEKNOLOGI ALBAROKAH Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      testCors: '/api/test-cors',
      login: '/api/auth/login',
      verify: '/api/auth/verify'
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('🚨 Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('🚀 ========================================');
  console.log('🚀 JAVIS TEKNOLOGI ALBAROKAH Backend Started');
  console.log('🚀 ========================================');
  console.log(`📍 Server running on port ${PORT}`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔄 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('📧 Test credentials: admin@javisteknologi.com / password123');
  console.log('==========================================');
});