const Donor = require('../../models/donor');
const Patient = require('../../models/patient');
var session = require("express-session");


module.exports = async (req, res, next) => {
    try
    {
        console.log(req.session.donorid);
        const patient = await Patient.find({"donatedBy": req.session.donorid});
        res.status(200).json({
            patients: patient
        });
    }
    catch(err)
    {
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    }
}