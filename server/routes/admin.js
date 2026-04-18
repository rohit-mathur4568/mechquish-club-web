const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authMiddleware');
const { createActivity, getAllActivities } = require('../controllers/activityController');
// @route   POST api/admin/activities
// @desc    Create a new activity (Admin Only)
router.post('/activities', authAdmin, createActivity);

// @route   GET api/admin/activities
// @desc    Get all activities
router.get('/activities', authAdmin, getAllActivities);

module.exports = router;