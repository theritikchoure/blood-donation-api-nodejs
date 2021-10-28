const Donor = require('../../models/donor');
const Patient = require('../../models/patient');

module.exports = async (req, res, next) => {
    try
    {
        const donorid = req.session.donorid;
        const patientid = req.params.patientid;

        const date = Date.now();

        await Donor.updateMany({_id:donorid}, {$set: {donated: date}}, { $push: { donatedTo: patientid } });
        await Patient.updateMany({_id:patientid}, { $push: { donatedBy: donorid } });

        res.status(200).json({
            success: "Congrats You have Donated Blood",
        })
    }
    catch(err)
    {
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    }
}