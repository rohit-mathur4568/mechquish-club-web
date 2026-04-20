const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Register Logic
exports.register = async (req, res) => {
    try {
        const { fullName, email, mobile, studentClass, branch, year, password, role } = req.body;
        
        // Check if user already exists in the database
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user with all the new fields included
        user = new User({ 
            fullName, 
            email, 
            mobile, 
            studentClass, 
            branch, 
            year, 
            password: hashedPassword, 
            role 
        });
        
        await user.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        console.error("Registration Error:", err.message);
        res.status(500).send("Server Error");
    }
};

// 2. Login Logic
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        // Verify the provided password against the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        //  Security Check: Ensure the user is approved by an Admin before granting access
        //  if (!user.isApproved) {
        //     return res.status(403).json({ 
        //         msg: "Your account is pending approval from the Admin. Please wait for authorization." 
        //     });
        // }

        // Generate JWT Token valid for 1 hour
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // Return the token and user details (Updated to return fullName instead of name)
        res.json({ 
            token, 
            user: { id: user._id, fullName: user.fullName, role: user.role } 
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).send("Server Error");
    }
};