const Donor = require("../models/donor");
const Patient = require("../models/patient");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require('../utils/jwtToken');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');

// List of Donors
exports.listOfDonor = catchAsyncError(async (req, res, next) => {
    city = req.query.city;
    bloodgroup = req.query.bloodgroup;

    if(city)
    {
        const donors = await Donor.find({city}, {name:1, mobile: 1});
        res.status(200).json({
            success: true,
            donors
        })
    }
    else if(bloodgroup)
    {
        const donors = await Donor.find({bloodgroup}, {name:1, mobile: 1});
        res.status(200).json({
            success: true,
            donors
        })
    }
    else if(city && bloodgroup)
    {
        const donors = await Donor.find({city, bloodgroup}, {name:1, mobile: 1});
        res.status(200).json({
            success: true,
            donors
        })
    }
    else
    {
        // console.log(req.patient.name)
        const donors = await Donor.find({}, {name:1, mobile: 1});
        res.status(200).json({
            success: true,
            donors
        })
    }

    
});

// Donor Profile
exports.donorProfile = catchAsyncError(async (req, res, next) => {

    id = req.params.id;

    const donor = await Donor.findById(id);
    res.status(200).json({
        success: true,
        donor
    })
});

// Register a Donor
exports.registerDonor = catchAsyncError(async (req, res, next) => {
    const {name, bloodgroup, email, password, mobile, age, address, city } = req.body;

    const donor = await Donor.create({
        name, bloodgroup, email, password, mobile, age, address, city
    });
    
    sendToken(donor, 201, res);
});

// Login Donor
exports.loginDonor = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    //If donor has not given email or password 
    if(!email || !password)
    {
        return next(new ErrorHandler("Please Enter Email and Password", 400))
    }

    const donor = await Donor.findOne({email}).select("+password");

    if(!donor)
    {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    const isPasswordMatched = await donor.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(donor, 200, res);
});

// Logout Donor
exports.loggedOutDonor = catchAsyncError(async (req, res, next) => {
    
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
});

// Donor Forget Password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
    const donor = await Donor.findOne({email: req.body.email});
    if(!donor)
    {
        return next(new ErrorHandler("Donor Not Found", 404));
    }
    
    // Get ResetPasswordToken 
    const resetToken = donor.getResetPasswordToken();
    await donor.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/donors/password/reset/${resetToken}`;

    const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;

    try
    {
        await sendMail({
            email: donor.email,
            subject: `Blood Buddies Password Reset`,
            message,
        })

        res.status(200).json({
            success: true,
            message: `Email send to ${donor.email} successfully`,
        })
    }
    catch(err)
    {
        donor.resetPasswordToken = undefined;
        donor.resetPasswordExpire = undefined;

        await donor.save({validateBeforeSave:false});

        return next(new ErrorHandler(err.message, 500))
    }
})


// Donor Reset Password -- Donor
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    
    //Creating Token Hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const donor = await Donor.findOne({resetPasswordToken, resetPasswordExpire:{ $gt: Date.now()}});

    if(!donor)
    {
        return next(new ErrorHandler("Reset Password Token Invalid or Has Been Expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password Does Not Matched", 400));
    }

    donor.password = req.body.password;
    donor.resetPasswordToken = undefined;
    donor.resetPasswordExpire = undefined;

    await donor.save();

    sendToken(donor, 200, res);

});

// Get Donor Details -- Donor
exports.getDonorDetails = catchAsyncError(async (req, res, next) => {
    const donor = await Donor.findById(req.donor.id);

    res.status(200).json({
        success: true,
        donor
    })
})

// Update Donor Password -- Donor
exports.updateDonorPassword = catchAsyncError(async (req, res, next) => {
    const donor = await Donor.findById(req.donor.id).select("+password");

    const isPasswordMatched = await donor.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Old Password is Incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password Does not Matched", 400));
    }

    donor.password = req.body.newPassword;

    await donor.save();

    sendToken(donor, 200, res);
});

// Update Donor Profile -- Donor
exports.updateDonorProfile = catchAsyncError(async (req, res, next) => {

    const newDonorData = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        age: req.body.age,
        address: req.body.address,
        city: req.body.city,
    }

    const donor = await Donor.findByIdAndUpdate(req.donor.id, newDonorData, {new: true, runValidators: true, useFindAndModify:false});

    res.status(200).json({
        success: true
    });

});

// Donor Donated 
exports.donorDonated = catchAsyncError(async (req, res, next) => {
    const patientId = req.params.id;

    console.log(patientId);

    const patient = await Patient.findById(patientId);

    if (!patient) {
        return next(new ErrorHandler("Patient Not Found", 404));
    }

    const donated = {
        patient: patientId,
        name: patient.name,
        disease: patient.disease,
    };

    const donor = await Donor.findById(req.donor.id);

    if (!donor) {
        return next(new ErrorHandler("Donor Not Found", 404));
    }

    donor.donatedTo.push(donated);

    donor.donatedAt = Date.now();

    await donor.save({
        validateBeforeSave: false
      });

    res.status(200).json({
        success: true,
    });
});

// Donor Donation History
exports.donatedHistory = catchAsyncError(async (req, res, next) => {

    const donor = await Donor.findById(req.donor.id);

    if (!donor) {
        return next(new ErrorHandler("donor Not Found", 404));
    }

    res.status(200).json({
        success: true,
        patients: donor.donatedTo,
        numberOfDonation: donor.donatedTo.length,
        lastDonation: donor.donatedAt
    });
});


// Get All Registered Donors -- Admin
exports.getAllRegisteredDonors = catchAsyncError(async (req, res, next) => {
    
    const donors = await Donor.find();

    res.status(200).json({
        success: true,
        donors
    });
});

// Get Single Registered Donor -- Admin
exports.getSingleRegisteredDonor = catchAsyncError(async (req, res, next) => {
    const donor = await Donor.findById(req.params.id);

    if(!donor)
    {
        return next(new ErrorHandler("Donor Not Found", 404));
    }

    res.status(200).json({
        success: true,
        donor
    })
});

// Delete Donor -- Admin
exports.deleteDonor = catchAsyncError(async (req, res, next) => {

    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return next(new ErrorHandler("Donor Not Found", 404));
    }
  
    await donor.remove();
    
    res.status(200).json({
      success: true,
      message: "Donor Deleted Successfully",
    });
});