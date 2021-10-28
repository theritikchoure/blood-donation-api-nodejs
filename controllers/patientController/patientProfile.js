const Patient = require('../../models/patient');
var cookieParser = require("cookie-parser");
var session = require("express-session");


module.exports = async (req, res, next) => {
    console.log(req.session.patientid);
    const sessionUser = await Patient.findById(req.session.patientid);
    res.status(200).json({
        hello: "hello from patient profile",
        loggedInPatient: sessionUser
    })
}