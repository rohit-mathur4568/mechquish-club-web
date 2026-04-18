const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    planDetails: { type: String }, 
    status: { 
        type: String, 
        enum: ['Planned', 'Current', 'Completed'], 
        default: 'Planned' 
    },
    type: { type: String, enum: ['Event', 'Social'] }, 
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    qrCodeString: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);