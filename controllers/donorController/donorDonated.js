const Donor = require('../../models/donor');

module.exports = (req, res, next) => {
    res.status(201).json({
        success: "Congrats "+ req.session.loggedin +" you have donated blood",
    })
}