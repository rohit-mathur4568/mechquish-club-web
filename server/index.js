const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

//  Load Environment Variables
dotenv.config();

console.log("Checking Mongo URI:", process.env.MONGO_URI);
//  Initialize Express
const app = express();

//  Connect to Database
connectDB();

//  Middlewares
app.use(cors()); 
app.use(express.json()); 

//  API Routes (Auth and more)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

// Home Route 
app.get('/', (req, res) => {
    res.send("MechQuish API is running... ");
});

//  Listen on Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Ready to handle MechQuish Roles! `);
});