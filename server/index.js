const express = require('express');
const mongoose =require('mongoose');
const cors = ('dotenv').config();

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//MongoDB Connection 
maggoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mechquish database connected!"))
    .catch((err) => console.log("DB connection error"));
    
    //Test Route
    app.get('/',(req, res) => {
        res.send("Mechqiush API is running...");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
    