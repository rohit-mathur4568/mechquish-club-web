const Activity = require('../models/Activity');

exports.createActivity = async (req, res) => {
    try {
        const { title, planDetails, type } = req.body;
        
        // Unique QR String generation (Timestamp + Title)
        const qrCodeString = `MECH-${Date.now()}-${title.replace(/\s+/g, '-').toUpperCase()}`;

        const newActivity = new Activity({
            title,
            planDetails,
            type,
            qrCodeString
        });

        await newActivity.save();
        res.status(201).json({ msg: "Activity Deployed Successfully!", activity: newActivity });
    } catch (err) {
        res.status(500).send("Server Error in Activity Creation");
    }
};

exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find().sort({ date: -1 });
        res.json(activities);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};