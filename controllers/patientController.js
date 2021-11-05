const Patient = require("../models/patient");
const Donor = require("../models/donor");
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
    
    const patient = await Patient.findById(req.patient.id); 

    patient.token = null;

    await patient.save({validateBeforeSave: false});

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

// Confirm A Donor
exports.confirmDonor = catchAsyncError(async (req, res, next) => {
    const donorId = req.params.id;

    const confirm = {
        patient: req.patient.id,
        name: req.patient.name,
        disease: req.patient.disease,
    };

    const donor = await Donor.findById(donorId);

    if (!donor) {
        return next(new ErrorHandler("Donor Not Found", 404));
    }

    donor.confirmedBy.push(confirm);

    await donor.save({
        validateBeforeSave: false
    });

    res.status(200).json({
        success: true,
    });
    
});

// Patient Blood Requisition History
exports.donatedHistory = catchAsyncError(async (req, res, next) => {

    patientId = req.patient.id;
    
    const donors = await Donor.find({ "donatedTo.patient" : patientId}, {name:1,email: 1, city: 1});
    
    res.status(200).json({
        success: true,
        donors: donors
    });

});

// Patient Review Donor
exports.reviewDonor = catchAsyncError(async (req, res, next) => {
    const donorId = req.params.id;

    const review = {
        patient: req.patient.id,
        name: req.patient.name,
        comment: req.body.comment,
    };
    
    // const donors = await Donor.find({ "donatedTo.patient" : patientId});

    const donor = await Donor.findById(donorId);

    if (!donor) {
        return next(new ErrorHandler("Donor Not Found", 404));
    }

    const isDonated = donor.donatedTo.find(
        (don) => don.patient.toString() === req.patient.id.toString()
    );

    if (!isDonated) {
        return next(new ErrorHandler("You can not make review", 404));
    }

    const isReviewed = donor.reviews.find(
        (don) => don.patient.toString() === req.patient.id.toString()
    );

    if (isReviewed) {
        donor.reviews.forEach((rev) => {
          if (rev.patient.toString() === req.patient.id.toString())
            (rev.name = req.patient.name), (rev.comment = req.body.comment);
        });
      } else {
        donor.reviews.push(review);
      }

    donor.reviews.push(review);

    await donor.save({
        validateBeforeSave: false
    });

    res.status(200).json({
        success: true,
        review,
        numOfReviews: donor.reviews.length
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

// Export Patients -- Admin
exports.exportPatients = catchAsyncError(async (req, res, next) => {
    var filename   = "patients.csv";
    const patient = await Patient.find({}, {__v: 0}).lean().exec({}, function(err, patients) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(patients, true);
    });
});