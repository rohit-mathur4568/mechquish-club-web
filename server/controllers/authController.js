const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register Logic
exports.register = async (req, res) => {
    try {
        const {name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashPassword, role });
        await newUser.save();
        res.status(201).json({message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

//Login Logic
exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({message: "User not found" });

        const isMatch= await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {expiresIn: 'id' });
        res.json({ token, user: {id: user.user_id, name: user.name, role: user.role}});
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};