import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';

const app = express();

app.use(cors({
  origin: [
    'https://javis-teknologi.vercel.app', 
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
  console.log('   Origin:', req.headers.origin || 'No origin');
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 5000,
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/test-cors', (req, res) => {
  res.json({
    success: true,
    message: 'CORS is working!',
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'JAVIS TEKNOLOGI ALBAROKAH Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      testCors: '/api/test-cors',
      login: '/api/auth/login',
      verify: '/api/auth/verify'
    }
  });
});

app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('========================================');
  console.log('JAVIS TEKNOLOGI ALBAROKAH Backend Started');
  console.log('========================================');
  console.log(`Server running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('Test credentials: admin@javisteknologi.com / admin123');
  console.log('==========================================');
});