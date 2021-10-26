const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bloodgroup:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        min : 1000000000,
        max : 9999999999
    },
    age: {
        type: Number,
        min: 18,
        max: 65
    },
    city: {
        type: String,
        required: true
    }    
})

module.exports = mongoose.model('Donor', donorSchema);