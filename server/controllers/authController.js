const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // Built-in Node.js module to generate secure tokens

// Email Transporter Setup (Configure with your Gmail credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address (set in .env)
        pass: process.env.EMAIL_PASS  // Your Gmail App Password (set in .env)
    }
});

// 1. Register Logic
exports.register = async (req, res) => {
    try {
        const { fullName, email, mobile, studentClass, branch, year, password, role } = req.body;
        
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists with this email" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate a random 32-character string for the email verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        user = new User({ 
            fullName, 
            email, 
            mobile, 
            studentClass, 
            branch, 
            year, 
            password: hashedPassword, 
            role,
            verificationToken // Save the token to the database
        });
        
        await user.save();

        // Send Verification Email
        const verificationUrl = `http://localhost:5000/api/auth/verify-email/${verificationToken}`;
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'MechQuish Club - Verify Your Email Address',
            html: `
                <h2>Welcome to MechQuish, ${user.fullName}!</h2>
                <p>Please verify your email address to activate your account.</p>
                <a href="${verificationUrl}" style="background-color: #0284c7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
                <p>If the button doesn't work, click this link: <br> ${verificationUrl}</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending email:", error);
            } else {
                console.log("Verification email sent:", info.response);
            }
        });

        res.status(201).json({ msg: "Registration successful! Please check your email to verify your account." });
    } catch (err) {
        console.error("Registration Error:", err.message);
        res.status(500).send("Server Error");
    }
};

// 2. Email Verification Logic.
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        
        // Find user with the matching token
        const user = await User.findOne({ verificationToken: token });
        
        if (!user) {
            return res.status(400).send("<h1>Invalid or Expired Verification Link</h1>");
        }

        // Mark email as verified and clear the token
        user.isEmailVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.send("<h1>Email Verified Successfully!</h1><p>You can now close this tab and log in to the MechQuish portal.</p>");
    } catch (err) {
        console.error("Verification Error:", err.message);
        res.status(500).send("Server Error");
    }
};

// 3. Login Logic
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        //  Ensure email is verified
        if (!user.isEmailVerified) {
            return res.status(403).json({ 
                msg: "ACCESS DENIED: Please verify your email address first. Check your inbox." 
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ 
            token, 
            user: { 
                id: user._id, 
                fullName: user.fullName, 
                email: user.email,
                branch: user.branch,
                year: user.year,
                studentClass: user.studentClass,
                role: user.role 
            } 
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).send("Server Error");
    }
};