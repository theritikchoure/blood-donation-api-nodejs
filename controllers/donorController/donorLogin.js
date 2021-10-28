const Donor = require('../../models/donor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const session = require("express-session");
const MongoDBSession = require('connect-mongodb-session')(session);

module.exports = async (req, res, next) => {
    await Donor.findOne({email: req.body.email})
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
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(result)
                    {
                        req.session.loggedindonor = true;
                        req.session.donorid = user._id;
                        console.log(req.session.id);
                        return res.status(200).json({
                            message: "Donor Login Successfully",
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