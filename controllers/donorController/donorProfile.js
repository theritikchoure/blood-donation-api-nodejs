const Donor = require('../../models/donor');
var cookieParser = require("cookie-parser");
var session = require("express-session");


module.exports = (req, res, next) => {
    res.status(200).json({
        hello: "hello from profile",
        session: req.session.loggedin
    })
}