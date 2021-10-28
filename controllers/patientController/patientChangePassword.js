const Patient = require('../../models/patient');
var cookieParser = require("cookie-parser");
var session = require("express-session");


module.exports = async (req, res, next) => {
    try
    {
        await Donor.findById(req.session.donorid)
        .exec()
        .then(user => {
            if(user < 1)
            {
                return res.status(409).json({
                    message: "Something Went Wrong, Try Again",
                })
            }
            else
            {
                bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
                    if(result)
                    {
                        const updatePassword = Donor.updateOne(req.session.donorid, { $set: {password: req.body.newPassword} }, {new: true});
                        return res.status(200).json({
                            message: "Password Updated Successfully",
                        })
                    }
                    else
                    {
                        return res.status(409).json({
                            message: "Something Went Wrong, Try Again"
                        })
                    }
                })
            }
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