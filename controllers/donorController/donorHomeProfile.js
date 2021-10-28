const Donor = require('../../models/donor');
var cookieParser = require("cookie-parser");
var session = require("express-session");


module.exports = async (req, res, next) => {
    const donors = await Donor.findById(req.params.id);
    res.status(200).json({
        donor: donors
    })
}