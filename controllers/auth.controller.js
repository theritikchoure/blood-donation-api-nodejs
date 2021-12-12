const jwt = require('jsonwebtoken');
const config = require('../config/config');
const crypto = require('crypto');
const Donor = require('../models/donor.model');
const Patient = require('../models/patient.model');
const LoginActivityModel = require('../models/loginActivity.model');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const sendMail = require('../utils/sendMail');
const { generateotp, fast2sms } = require('../utils/sendOTP');

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginOtpSchema = Joi.object({
  mobile: Joi.string().required().regex(/^[1-9][0-9]{9}$/),
});

const verifyOtpSchema = Joi.object({
  mobile: Joi.string().required().regex(/^[1-9][0-9]{9}$/),
  otp: Joi.number().required(),
});

const forgetPasswordSchema = Joi.object({
  email: Joi.string().required(),
});

const updateMeSchema = Joi.object({
  name: Joi.string().required(),
  bloodgroup: Joi.string().required(),
  email: Joi.string().email(),
  mobile: Joi.string().required().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeat_password: Joi.string().required().valid(Joi.ref('password')),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipcode: Joi.string().required().regex(/^[1-9][0-9]{5}$/),
});

module.exports = {
  emailLogin, generateOtp, verifyOTP, updateMe, logout
}

async function emailLogin(req) {
  const { email, password } = req.body;
  let userDetails = { email: req.body.email, password: req.body.password }
  userDetails = await Joi.validate(userDetails, userLoginSchema, { abortEarly: true });

  var user = await Donor.findOne({ email }).select('+password');
  if(!user) 
  var user = await Patient.findOne({email}).select('+password'); var type = "patient"

  if(!user) return false;

  
  const isPasswordMatched = await user.comparePassword(req.body.password);
  console.log(isPasswordMatched)
  if(!isPasswordMatched) return false;
  
  if(user.donatedAt === null || user.donatedAt != null)
    {
      if(user.donatedAt != null ) await user.checkAvailabilityStatus(user);
      loginActivityDetails = { user_id: user._id, user_type: "donor", body: req.body, status: 'success', };
      loginActivityDetails = await loginActivity(loginActivityDetails);
    }else{
      loginActivityDetails = { user_id: user._id, user_type: "patient", body: req.body, status: 'success', };
      loginActivityDetails = await loginActivity(loginActivityDetails);
    }

  token = await generateToken(donor);

  return { donor, token };

}

async function generateOtp(req) {
  const validation = await Joi.validate(req.body, loginOtpSchema, { abortEarly: true });
  const { mobile } = req.body;

  var user = await Donor.findOne({ mobile });
  if(!user) 
    var user = await Patient.findOne({ mobile });

  if(!user) return false;

  const otp = generateotp(6); // generating otp
  user.mobileOtp = otp;
  user.mobileOtpExpire = Date.now() + 10 * 60 * 1000;
  console.log(user);
  await user.save();

  // await fast2sms(
  //   {
  //     message: `Your OTP is ${otp}`,
  //     contactNumber: user.mobile,
  //   },
  // );

  return true;
}

async function verifyOTP(req) {
  let userDetails = { mobile: req.body.mobile, otp: req.body.otp }
  userDetails = await Joi.validate(userDetails, verifyOtpSchema, { abortEarly: true });

  var user = await Donor.findOne({ mobile: userDetails.mobile });
  if(!user) 
  var user = await Patient.findOne({ mobile: userDetails.mobile }); var type = "patient"

  if(!user) return false;

  if(user.mobileOtpExpire > Date.now() && user.mobileOtp == userDetails.otp){
    console.log(user)
    
    if(user.donatedAt === null || user.donatedAt != null)
    {
      if(user.donatedAt != null ) await user.checkAvailabilityStatus(user);
      loginActivityDetails = { user_id: user._id, user_type: "donor", body: req.body, status: 'success', };
      loginActivityDetails = await loginActivity(loginActivityDetails);
    }else{
      loginActivityDetails = { user_id: user._id, user_type: "patient", body: req.body, status: 'success', };
      loginActivityDetails = await loginActivity(loginActivityDetails);
    }
    
    user.mobileOtp = "";
    user.mobileOtpExpire = "";
    await user.save();
    token = await generateToken(user);
    
    return { user, token };
  } else
  {
    if(user.donatedAt === null || user.donatedAt != null)
    {
      if(user.donatedAt != null ) await user.checkAvailabilityStatus(user);
      loginActivityDetails = { user_id: user._id, user_type: "donor", body: req.body, status: 'failed', };
      loginActivityDetails = await loginActivity(loginActivityDetails);
    }else{
      loginActivityDetails = { user_id: user._id, user_type: "patient", body: req.body, status: 'failed', };
      loginActivityDetails = await loginActivity(loginActivityDetails);
    }

    return false;
  }
}

function generateToken(user) {
  return jwt.sign({user}, config.jwtSecret, { expiresIn: "30s"});
}

async function loginActivity(req) {
  const { user_id, user_type } = req;
  const { agent, ip, latitude, longitude } = req.body;
  const login_status = req.status;
  const details = { user_id, user_type, agent, ip, latitude, longitude, login_status }
  const act = await new LoginActivityModel(details).save();
  console.log(act);
}

async function updateMe(user) {
  const validation = await Joi.validate(user.body, updateMeSchema, { abortEarly: true });
  const updateMe = await User.findByIdAndUpdate(user.id, user.body, {new: true, runValidators: true, useFindAndModify:false});
  return updateMe;
}

// Logout API Function
async function logout(req) {
  if(req.user)
  {
    const query = {user: req.user._id, login_status: "success"};

    let loggedIn = await LoginActivityModel.findOne(query).sort({_id:-1}).limit(1);
    
    loggedIn.logout_time = new Date;
    await loggedIn.save();
    
    return true;
  } else
    return false;
}

//-------------------------------------------------------------------------------------------------------------------------

// Generating Password Reset Token -- ritik
// async function sendResetPasswordToken(user) {
//   const userEmail = await Joi.validate(user, forgetPasswordSchema, { abortEarly: true });
//   const getUser = await User.findOne({email: userEmail.email});
//   if(!getUser) { return false; }

//   //Generating Token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   //Hashing & Adding resetPasswordToken to userSchema
//   getUser.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//   getUser.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//   await getUser.save({validateBeforeSave:false});

//   const resetPasswordUrl = `http://localhost:3000/api/auth/password/reset/${resetToken}`;
//   const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;

//   // Sending Mail
//   try
//   {
//       await sendMail({
//           email: getUser.email,
//           subject: `RabiesLMS Password Reset`,
//           message,
//       })
//       return true;
//   }
//   catch(err)
//   {
//       getUser.resetPasswordToken = undefined;
//       getUser.resetPasswordExpire = undefined;

//       await getUser.save({validateBeforeSave:false});

//       return false;
//   }
// }

// Reset Password After Getting Forget Password URL -- ritik
// async function resetPassword(data) {
//   const resettoken = crypto.createHash("sha256").update(data.token).digest("hex");
//   const user = await User.findOne({resetPasswordToken: resettoken});

//   if(!user) { return null; }
//   if(user.resetPasswordExpire < Date.now()) { return false; }

//   user.hashedPassword = await bcrypt.hashSync(data.password, 10);
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;

//   await user.save();
//   return user;
// }