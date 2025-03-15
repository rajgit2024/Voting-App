// Import required packages
const express = require('express');
const session = require("express-session");
const userRoute = require('./routes/userRoutes.js');
const candiRoute=require("./routes/candidatesRoutes");
const voteRoutes=require("./routes/voteRoute")
const cookieParser = require("cookie-parser");
const morgan = require('morgan'); // Optional for logging
const path = require('path');
const cors = require('cors');
const multer = require('multer');

// Initialize the Express app
const app = express();
require("dotenv").config();

// Middleware for logging requests
app.use(morgan('dev')); // Logs requests to the console

// Middleware to parse incoming JSON requests
app.use(express.json());  // Parse JSON bodies

// Middleware to parse URL-encoded bodies (like form data)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(cors({
  origin: process.env.REACT_APP_API_URL, // Your frontend URL
  credentials: true, // Allows credentials (cookies, Authorization header)
}));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Use Users and Candidates routes
app.use("/api/user", userRoute);
app.use("/api/candidates",candiRoute);
app.use("/api/votes", voteRoutes);


// Define a POST route to handle incoming data
app.post('/data', (req, res) => {
  const data = req.body;
  res.json({
    message: 'Data received successfully!',
    receivedData: data
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server and listen on port 3000
const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is not set
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});