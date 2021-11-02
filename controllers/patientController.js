const Patient = require("../models/patient");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require('../utils/jwtToken');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');

// Register a Patient
exports.registerPatient = catchAsyncError(async (req, res, next) => {
    const {name, bloodgroup, email, password, mobile, age, city, disease, hospital } = req.body;

    const patient = await Patient.create({
        name, bloodgroup, email, password, mobile, age, city, disease, hospital
    });
    
    sendToken(patient, 201, res);
});

// Login Patient
exports.loginPatient = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    //If patient has not given email or password 
    if(!email || !password)
    {
        return next(new ErrorHandler("Please Enter Email and Password", 400))
    }

    const patient = await Patient.findOne({email}).select("+password");

    if(!patient)
    {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    const isPasswordMatched = await patient.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(patient, 200, res);
});

// Logout Patient
exports.loggedOutPatient = catchAsyncError(async (req, res, next) => {
    
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
});

// Patient Forget Password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
    const patient = await Patient.findOne({email: req.body.email});
    if(!patient)
    {
        return next(new ErrorHandler("Patient Not Found", 404));
    }
    
    // Get ResetPasswordToken 
    const resetToken = patient.getResetPasswordToken();
    await patient.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/patients/password/reset/${resetToken}`;

    const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;

    try
    {
        await sendMail({
            email: patient.email,
            subject: `Blood Buddies Password Reset`,
            message,
        })

        res.status(200).json({
            success: true,
            message: `Email send to ${patient.email} successfully`,
        })
    }
    catch(err)
    {
        patient.resetPasswordToken = undefined;
        patient.resetPasswordExpire = undefined;

        await patient.save({validateBeforeSave:false});

        return next(new ErrorHandler(err.message, 500))
    }
})


// Patient Reset Password -- Patient
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    
    //Creating Token Hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const patient = await Patient.findOne({resetPasswordToken, resetPasswordExpire:{ $gt: Date.now()}});

    if(!patient)
    {
        return next(new ErrorHandler("Reset Password Token Invalid or Has Been Expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password Does Not Matched", 400));
    }

    patient.password = req.body.password;
    patient.resetPasswordToken = undefined;
    patient.resetPasswordExpire = undefined;

    await patient.save();

    sendToken(patient, 200, res);

});

// Get Patient Details -- Patient
exports.getPatientDetails = catchAsyncError(async (req, res, next) => {
    const patient = await Patient.findById(req.patient.id);

    res.status(200).json({
        success: true,
        patient
    })
})

// Update Patient Password -- Patient
exports.updatePatientPassword = catchAsyncError(async (req, res, next) => {
    const patient = await Patient.findById(req.patient.id).select("+password");

    const isPasswordMatched = await patient.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Old Password is Incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password Does not Matched", 400));
    }

    patient.password = req.body.newPassword;

    await patient.save();

    sendToken(patient, 200, res);
});

// Update Patient Profile -- Patient
exports.updatePatientProfile = catchAsyncError(async (req, res, next) => {

    const newPatientData = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        age: req.body.age,
        address: req.body.address,
        city: req.body.city,
        disease: req.body.disease,
        hospital: req.body.hospital,
    }

    const patient = await Patient.findByIdAndUpdate(req.patient.id, newPatientData, {new: true, runValidators: true, useFindAndModify:false});

    res.status(200).json({
        success: true
    });

});


// Get All Registered Patients -- Admin
exports.getAllRegisteredPatients = catchAsyncError(async (req, res, next) => {
    const patients = await Patient.find();

    res.status(200).json({
        success: true,
        patients
    })
});

// Get Single Registered Patient -- Admin
exports.getSingleRegisteredPatient = catchAsyncError(async (req, res, next) => {
    const patient = await Patient.findById(req.params.id);

    if(!patient)
    {
        return next(new ErrorHandler("Patient Not Found", 404));
    }

    res.status(200).json({
        success: true,
        patient
    })
});

// Update Patient Role -- Admin
exports.updatePatientRole = catchAsyncError(async (req, res, next) => {

    const newPatientRole = {
        role: req.body.role,
    }

    const patient = await Patient.findByIdAndUpdate(req.params.id, newPatientRole, {new: true, runValidators: true, useFindAndModify:false});

    if (!patient) {
        return next(new ErrorHandler("Patient Not Found", 404));
    }

    res.status(200).json({
        success: true
    });
});

// Delete Patient -- Admin
exports.deletePatient = catchAsyncError(async (req, res, next) => {

    // we will remove cloudinary later

    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return next(new ErrorHandler("Patient Not Found", 404));
    }
  
    await patient.remove();
    res.status(200).json({
      success: true,
      message: "Patient Deleted Successfully",
    });
  });