const mongoose = require('mongoose');

const donatedSchema = new mongoose.Schema({
    donorId: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Donated', donatedSchema);