import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import db from '../config/database.js';

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login attempt:', { email });

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email and password are required' 
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid email format' 
      });
    }

    // ✅ FIX: PostgreSQL syntax - ganti ? menjadi $1
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    // ✅ FIX: Pakai result.rows bukan [users]
    if (result.rows.length === 0) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    const user = result.rows[0];
    console.log('✅ User found:', user.email);

// Check password - TAMBAH DEBUG INFO
console.log('🔐 Input password:', `"${password}"`, 'Length:', password.length);
console.log('💾 Stored hash:', `"${user.password}"`, 'Length:', user.password.length);
console.log('📧 User email:', `"${user.email}"`);

const isPasswordValid = await bcrypt.compare(password, user.password);
console.log('🔑 Password validation:', isPasswordValid);

// TEST MANUAL - coba bandingkan dengan string literal
const testCompare1 = await bcrypt.compare('admin123', user.password);
console.log('🧪 Test with "admin123":', testCompare1);

const testCompare2 = await bcrypt.compare('password123', user.password);
console.log('🧪 Test with "password123":', testCompare2);
    
    if (!isPasswordValid) {
      console.log('❌ Invalid password for user:', email);
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email 
      },
      process.env.JWT_SECRET || 'fallback-secret-key-for-development',
      { expiresIn: '24h' }
    );

    console.log('✅ Login successful for user:', email);

    // Return response
    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('💥 Login error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
});

// Verify token endpoint
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key-for-development');
    
    // ✅ FIX: PostgreSQL syntax
    const result = await db.query(
      'SELECT id, email, name FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    res.json({ 
      success: true,
      user: result.rows[0] 
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Not authenticated' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key-for-development');
    
    // ✅ FIX: PostgreSQL syntax
    const result = await db.query(
      'SELECT id, email, name FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    res.json({ 
      success: true,
      user: result.rows[0] 
    });
  } catch (error) {
    console.error('Me endpoint error:', error);
    res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.json({ 
    success: true,
    message: 'Logout successful' 
  });
});

export default router;