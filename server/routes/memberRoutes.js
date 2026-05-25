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

// POST: Add new member (
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

// PUT: Update an existing member
router.put('/update/:id', async (req, res) => {
  try {
    console.log(`--- UPDATE REQUEST FOR MEMBER ID: ${req.params.id} ---`);
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Returns the updated document
    );
    console.log("Status: Successfully updated in MongoDB!");
    res.status(200).json({ message: "Member updated successfully!", member: updatedMember });
  } catch (error) {
    console.log("Status: FAILED to update database.");
    console.error(error);
    res.status(500).json({ message: "Error updating member", error: error.message });
  }
});

module.exports = router;