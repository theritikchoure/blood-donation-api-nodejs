const Admin = require("../models/admin");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require('../utils/jwtToken');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');


// Register a Admin
exports.registerAdmin = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const admin = await Admin.create({
        name, email, password
    });
    
    sendToken(admin, 201, res);
});

// Login Admin
exports.loginAdmin = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    //If admin has not given email or password 
    if(!email || !password)
    {
        return next(new ErrorHandler("Please Enter Email and Password", 400))
    }

    const admin = await Admin.findOne({email}).select("+password");

    if(!admin)
    {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    const isPasswordMatched = await admin.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(admin, 200, res);
});

// Logout Admin
exports.loggedOutAdmin = catchAsyncError(async (req, res, next) => {
    
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
});

// Admin Forget Password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
    const admin = await Admin.findOne({email: req.body.email});
    if(!admin)
    {
        return next(new ErrorHandler("Admin Not Found", 404));
    }
    
    // Get ResetPasswordToken 
    const resetToken = admin.getResetPasswordToken();

    await admin.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/admins/password/reset/${resetToken}`;

    const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;

    try
    {
        await sendMail({
            email: admin.email,
            subject: `Blood Buddies Password Reset`,
            message,
        })

        res.status(200).json({
            success: true,
            message: `Email send to ${admin.email} successfully`,
        })
    }
    catch(err)
    {
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpire = undefined;

        await admin.save({validateBeforeSave:false});

        return next(new ErrorHandler(err.message, 500))
    }
})


// Admin Reset Password -- Admin
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    
    //Creating Token Hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const admin = await Admin.findOne({resetPasswordToken, resetPasswordExpire:{ $gt: Date.now()}});

    if(!admin)
    {
        return next(new ErrorHandler("Reset Password Token Invalid or Has Been Expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password Does Not Matched", 400));
    }

    admin.password = req.body.password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    await admin.save();

    sendToken(admin, 200, res);

});

// Get Admin Details -- Admin
exports.adminDashboard = catchAsyncError(async (req, res, next) => {
    const admin = await Admin.findById(req.admin.id);

    res.status(200).json({
        success: true,
        admin
    });
});

// Update Admin Password -- Admin
exports.updateAdminPassword = catchAsyncError(async (req, res, next) => {
    const admin = await Admin.findById(req.admin.id).select("+password");

    const isPasswordMatched = await admin.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Old Password is Incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password Does not Matched", 400));
    }

    admin.password = req.body.newPassword;

    await admin.save();

    sendToken(admin, 200, res);
});

// Update Admin Profile -- Admin
exports.updateAdminProfile = catchAsyncError(async (req, res, next) => {

    const newAdminData = {
        name: req.body.name,
        email: req.body.email,
    }

    const admin = await Admin.findByIdAndUpdate(req.admin.id, newAdminData, {new: true, runValidators: true, useFindAndModify:false});

    res.status(200).json({
        success: true
    });

});

