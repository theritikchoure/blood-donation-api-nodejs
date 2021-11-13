const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const Admin = require("../models/admin");

exports.adminAuth = catchAsyncError( async(req, res, next) => {

    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token;

    if(!token)
    {
        return next(new ErrorHandler("Please Login First", 400))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = await Admin.findById(decodedData.id);

    if(!req.admin)
    {
        return next(new ErrorHandler("Please Login First", 400))
    }

    next();
});