// BE/routes/auth.js
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

    // Check if user exists
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    const user = users[0];
    console.log('✅ User found:', user.email);

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('🔑 Password validation:', isPasswordValid);
    
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

    // Return token in response body (for frontend to store in localStorage)
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

// Logout endpoint
router.post('/logout', (req, res) => {
  res.json({ 
    success: true,
    message: 'Logout successful' 
  });
});

// Check auth status
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
    
    const [users] = await db.query(
      'SELECT id, email, name FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    res.json({ 
      success: true,
      user: users[0] 
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    });
  }
});

// Get current user (alternative to /verify)
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
    
    const [users] = await db.query(
      'SELECT id, email, name FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    res.json({ 
      success: true,
      user: users[0] 
    });
  } catch (error) {
    console.error('Me endpoint error:', error);
    res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    });
  }
});

export default router;