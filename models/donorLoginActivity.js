const mongoose = require('mongoose');

const donorLoginActivitySchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Donor',
        required: [true, "Please Enter Your Name"]
    },
    
    login_time: {
        type: String,
        required:true
    },

    logout_time: {
        type: String,
        required:false,
        default: null,
    },

    latitude: {
        type: String,
        required:true
    },
    
    longitude: {
        type: String,
        required:true
    },
})

module.exports = mongoose.model('DonorLoginActivity', donorLoginActivitySchema);
