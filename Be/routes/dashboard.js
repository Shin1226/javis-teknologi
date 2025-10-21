import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../config/database.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, email, name, created_at FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Welcome to dashboard!',
      user: result.rows[0],
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