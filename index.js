const express = require('express'); // import express
const mongoose = require('mongoose'); // import mongoose
const dotenv = require('dotenv').config();
const db = require('./db');  // import database
var cookieParser = require("cookie-parser"); // import cookieParser
var bodyParser = require("body-parser"); 

// Middleware Imports
const errorMiddleware = require('./middleware/error');

// Hadnling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting Down the Server due to Uncaught Exception');

    process.exit(1);
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

// Base URL Route
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Welcome to Blood Donation Created by Ritik and Adarsh"
    })
})

// // Routes Imports
const donorRoute = require('./routes/donorRoute');
const patientRoute = require('./routes/patientRoute');
const adminRoute = require('./routes/adminRoute');

app.use('/api/v1', donorRoute);
app.use('/api/v1', patientRoute);
app.use('/api/v1', adminRoute);

app.use(errorMiddleware);

// Start Server
app.listen(process.env.PORT || 3000, function(err, result){
    if (err) console.log("Error in server setup");

    console.log("Server listening on Port");
});

// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting Down Server due to Unhandled Promise Rejection');

    server.close(() => {
        process.exit(1);
    });
});