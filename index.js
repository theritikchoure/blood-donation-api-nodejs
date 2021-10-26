const express = require('express'); // import express
const mongoose = require('mongoose'); // import mongoose
const dotenv = require('dotenv').config();
const db = require('./db');  // import database
const donorRouter = require('./routes/donor');  // import donorRoutes
const apiUserRouter = require('./routes/apiUser');  // import donorRoutes
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");
const MongoDBSession = require('connect-mongodb-session')(session);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const store = new MongoDBSession({
    uri: process.env.DB_STRING,
    collection: "mySessions"
});

app.use(
    session({
      secret: "123456cat",
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: { maxAge: 60000 },
    })
);

// Base URL Route
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Welcome to Blood Donation Created by Ritik and Adarsh"
    })
})

// Donor Related Routes
app.use('/donors', donorRouter);
app.use('/api/user', apiUserRouter);

// Start Server
app.listen(process.env.PORT || 3000);