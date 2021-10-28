const Donor = require('../../models/donor');
const Patient = require('../../models/patient');
var session = require("express-session");


module.exports = async (req, res, next) => {
    try
    {
        console.log(req.session.patientid);
        const donor = await Donor.find({"donatedTo": req.session.patientid});
        res.status(200).json({
            donors: donor
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