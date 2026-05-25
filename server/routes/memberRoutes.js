const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// GET: Fetch members
router.get('/all', async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error });
  }
});

// POST: Add new member (WITH ENGLISH LOGS 🕵️‍♂️)
router.post('/add', async (req, res) => {
  try {
    console.log("--- NEW MEMBER POST REQUEST ---");
    console.log("Data Received:", req.body); 

    const newMember = new Member(req.body);
    await newMember.save();
    
    console.log("Status: Successfully saved to MongoDB!");
    res.status(201).json({ message: "Member added successfully!", member: newMember });
  } catch (error) {
    console.log("Status: FAILED. Database rejection reason:");
    console.error(error); 
    res.status(500).json({ message: "Error adding member", error: error.message });
  }
});

// DELETE: Remove member
router.delete('/:id', async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Member deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting member", error });
  }
});

module.exports = router;