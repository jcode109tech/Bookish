const express = require('express');
const { registerUser, loginUser, sendOtp, verifyOtp } = require('../controllers/authController');
const { errorHandler } = require('../middleware/errorMiddleware');

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
