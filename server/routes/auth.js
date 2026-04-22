const express = require('express');
const router = express.Router();
const { register, login , verifyEmail } = require('../controllers/authController');


// @route   POST api/auth/register
router.post('/register', register);

// @route   POST api/auth/login
router.post('/login', login);

// Route for handling the email click
router.get('/verify-email/:token', verifyEmail);

module.exports = router