const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    planDetails: { type: String }, // Full Plan
    status: { 
        type: String, 
        enum: ['Planned', 'Current', 'Completed'], 
        default: 'Planned' 
    },
    type: { type: String, enum: ['Event', 'Social'] }, // Organiser split 
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Activity Winner
    qrCodeString: { type: String } // Unique string for attendance QR
});

module.exports = mongoose.model('Activity', activitySchema);