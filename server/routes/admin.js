const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authMiddleware');
const { createActivity, getAllActivities } = require('../controllers/activityController');

//  IMPORT  DATABASE MODEL (Taaki hum members gin sakein)
// Dhyan dena: Agar tere model ka naam kuch aur hai (jaise Member.js), toh isko change kar lena
const User = require('../models/User'); 

// @route   POST api/admin/activities
// @desc    Create a new activity (Admin Only)
router.post('/activities', authAdmin, createActivity);

// @route   GET api/admin/activities
// @desc    Get all activities
router.get('/activities', authAdmin, getAllActivities);

// ------ API:FOR  DASHBOARD STATS -------

// @route   GET api/admin/stats
// @desc    Get total counts for admin dashboard cards
router.get('/stats', async (req, res) => {
    try {
        // Fetching the actual member count from MongoDB
        const totalMembers = await User.countDocuments(); 
        res.json({
            totalMembers: totalMembers,
            ongoingEvents: 2,
            newRequests: 12
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;