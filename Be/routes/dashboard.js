// server/routes/dashboard.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../config/database.js';

const router = express.Router();

// Protected dashboard route
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, email, name, created_at FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Welcome to dashboard!',
      user: users[0],
      dashboardData: {
        stats: {
          loginCount: 15,
          lastLogin: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;