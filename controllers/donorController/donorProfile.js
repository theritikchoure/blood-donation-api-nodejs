const Donor = require('../../models/donor');
var cookieParser = require("cookie-parser");
var session = require("express-session");


module.exports = async (req, res, next) => {
    console.log(req.session.donorid);
    const sessionUser = await Donor.findById(req.session.donorid);
    res.status(200).json({
        hello: "hello from profile",
        loggedInUser: sessionUser
    })
}