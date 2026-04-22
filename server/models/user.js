const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: String, required: true },
    studentClass: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Superadmin', 'Admin', 'Organiser', 'Student', 'Faculty Coordinator', 'Judge'],
        default: 'Student'
    },
    branch: { type: String },
    year: { type: Number },
    
    // Admin approval check
    isApproved: { type: Boolean, default: false }, 

    //  Email Verification Fields
    isEmailVerified: { type: Boolean, default: false },
    verificationToken: { type: String },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);