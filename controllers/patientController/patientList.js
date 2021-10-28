const Patient = require('../../models/patient');

module.exports = async (req, res, next) => {
    const patient = await Patient.find().sort({_id: 'desc'})
    return res.status(200).json({
        patient: patient
    })
}