const mongoose = require('mongoose');

const confirmSchema = new mongoose.Schema({
    donorId: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Confirm', confirmSchema);