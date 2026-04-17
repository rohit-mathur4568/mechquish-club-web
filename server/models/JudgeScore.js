// server/models/JudgeScore.js
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    marks: { type: Number },
    isLocked: { type: Boolean, default: false } // Once locked, no more changes
});

module.exports = mongoose.model('JudgeScore', scoreSchema);