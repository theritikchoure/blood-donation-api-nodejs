const Donor = require('../../models/donor');
var cookieParser = require("cookie-parser");
var session = require("express-session");


module.exports = async (req, res, next) => {
    try
    {
        console.log(req.session.donorid);
        const updateUser = await Donor.findByIdAndUpdate(req.session.donorid,{ $set: req.body }, {new: true});
        res.status(200).json({
            success: "Profile Updated Successfully",
            profileUpdate: updateUser
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