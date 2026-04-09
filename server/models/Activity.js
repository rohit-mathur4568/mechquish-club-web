const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: String,
    plan: String, //Full plan description
    type: { type: String, enum: ['next', 'previous'] },
    winner: String, // winner name after event
    isLocked: {type: Boolean, default: false }  //lock the marks 

});

module.exports = mongoose.model('Activity', activitySchema);