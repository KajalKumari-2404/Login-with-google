import express from 'express';
import { googleLogin, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/google', googleLogin);
router.get('/profile', protect, getProfile);

export default router;