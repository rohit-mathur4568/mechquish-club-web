const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Superadmin', 'Admin', 'Organiser', 'Student', 'Faculty Coordinator', 'Judge'],
        default: 'Student'
    },
    branch: { type: String },
    year: { type: Number },
    
    // This ensures a user cannot log in until an admin verifies them
    isApproved: { 
        type: Boolean, 
        default: false 
    }, 

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);