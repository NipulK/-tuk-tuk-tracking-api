import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only logged-in users
router.get('/private', protect, (req, res) => {
  res.json({
    message: 'You accessed a protected route',
    user: req.user
  });
});

// Only admin users
router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
  res.json({
    message: 'Admin access granted'
  });
});

export default router;