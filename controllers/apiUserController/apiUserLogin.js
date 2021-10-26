const apiUser = require('../../models/apiUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
var session = require("express-session");

module.exports = async (req, res, next) => {
    await apiUser.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(user < 1)
            {
                return res.status(409).json({
                    message: "Auth Failed",
                })
            }
            else
            {
                console.log(user)
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(result)
                    {
                        const token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        }, process.env.JWT_KEY);
                        return res.status(201).json({
                            message: "Login Success, now you can use all the api using below token",
                            token: token,
                        })
                    }
                    else
                    {
                        return res.status(401).json({
                            message: "Auth Failed"
                        })
                    }
                })
            }
        })
}