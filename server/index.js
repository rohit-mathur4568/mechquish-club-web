const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use('/api/auth' , authRoutes);

//MongoDB Connection 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mechquish database connected!"))
    .catch((err) => console.log("DB connection error:", err));
    
    //Test Route
    app.get('/',(req, res) => {
        res.send("Mechqiush API is running...");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
