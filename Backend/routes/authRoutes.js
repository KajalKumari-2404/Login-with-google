import express from 'express';
import { googleLogin, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/google', googleLogin);
router.get('/profile', protect, getProfile);

export default router;
















// import express from 'express'
// // import { router } from '../app';
// import { googleLogin } from '../controllers/authController';

// const router = express.Router();
// router.post("/google", googleLogin)

// export default router;


// const express = require('express');

// const { googleLogin, getProfile } = require('../controllers/authController');

// const router = express.Router();

// router.post('/google', googleLogin);

// router.get("/profile", getProfile);

// module.exports = router;