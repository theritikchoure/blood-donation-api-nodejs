const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },
    bloodgroup:{
        type: String,
        required: [true, "Please Enter Your Blood Group"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minlength: [8, "Password Should Be Greater than 8 Characters"],
        select: false,
    },
    mobile: {
        type: Number,
        required: [true, "Please Enter Your Mobile Number"],
        unique: true,
    },
    age: {
        type: Number,
        required: [true, "Please Enter Your Age"],
        min: 18,
        max: 65
    },
    address: {
        type: String,
        required: [true, "Please Enter Your Address"],
    },
    city: {
        type: String,
        required: [true, "Please Enter Your City"],
    },
    state: {
        type: String,
        required: [true, "Please Enter Your State"],
    },
    zipcode: {
        type: String,
        required: [true, "Please Enter Your Zip Code"],
    },
    confirmedBy: [
        {
            patient: {
                default: null,
                type: mongoose.Schema.ObjectId,
                ref: 'Patient'
            },
            name: {
                type: String,
                required: true
            },
            disease: {
                type: String,
                required: true
            },
        }
    ],
    status: {
        type: String,
        default: "available"
    },
    donatedAt: {
        type: Date,
        default: null
    },
    donatedTo: [
        {
            patient: {
                default: null,
                type: mongoose.Schema.ObjectId,
                ref: 'Patient'
            },
            name: {
                type: String,
                required: true
            },
            disease: {
                type: String,
                required: true
            },
        }
    ],
    reviews: [
        {
            patient: {
                type: mongoose.Schema.ObjectId,
                ref: "Patient",
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    
    mobileOtp: String,
    mobileOtpExpire: Date,

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

donorSchema.pre("save", async function(next){
    if(!this.isModified('password'))
    {
        next();
    }

    this.password = await bcrypt.hashSync(this.password,10)
});

// JWT Token
donorSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare Password
donorSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compareSync(password, this.password);
};

// Generating Password Reset Token
donorSchema.methods.getResetPasswordToken = function(){
    
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing & Adding resetPasswordToken to donorSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

// Checking Donor Availability Status
donorSchema.methods.checkAvailabilityStatus = async function(donor){
    const nextDonationDate = new Date(donor.donatedAt.getTime() + 90 * 24 * 60 * 60 * 1000);
    const currentDate = new Date(Date.now());

    if(currentDate > nextDonationDate )
    {
        donor.status = "available";
        await donor.save({validateBeforeSave:false});
    }
}

module.exports = mongoose.model('Donor', donorSchema);
