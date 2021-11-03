const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const Patient = require("../models/patient");

exports.isPatientAuth = catchAsyncError( async(req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.authorization.split(" ")[1];

    if(!token)
    {
        return next(new ErrorHandler("Please Login First", 400))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.patient = await Patient.findById(decodedData.id);

    if(!req.patient)
    {
        return next(new ErrorHandler("Please Login First", 400))
    }

    next();
});