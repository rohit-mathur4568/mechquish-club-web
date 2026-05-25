const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true //e.g., "President", "Chief Faculty Advisor"
    },
    category: {
        type: String,
        enum: ['Faculty', 'CoreTeam'], // This will tell whether it is a teacher or a student.
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    image: {
    type: String, 
    default: "T" 
  }
   
}, { timestamps: true}
);
module.exports = mongoose.model('Member', memberSchema);