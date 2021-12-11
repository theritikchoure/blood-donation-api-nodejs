const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const customResponse = require('../middleware/response-handler');
const router = express.Router();
const Joi = require('joi');
const Donor = require('../models/donor.model');
const {resMsgType, resMsg} = require('../config/constant');
module.exports = router;

// ------------------ Validation Schemas (Start) ------------------
const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  repeat_password: Joi.string().required().valid(Joi.ref('password')),
});

const verifyOtpSchema = Joi.object({
  mobile: Joi.string().required().regex(/^[1-9][0-9]{9}$/),
  otp: Joi.number().required(),
  agent: Joi.string(),
  ip: Joi.string(),
  latitude: Joi.string().allow(null,''),
  longitude: Joi.string().allow(null,''),
});
// ------------------ Validation Schemas (End) ------------------

// ------------------ Auth Related Routes (Start) ------------------
router.post('/login', asyncHandler(donorLogin));

router.post('/generateotp', asyncHandler(generateOTP)); 
router.post('/verifyotp', asyncHandler(verifyOTP)); 

router.get('/me', passport.authenticate('jwt', { session: false }), donorLogin);

router.post('/logout', passport.authenticate('jwt', { session: false }), asyncHandler(logout)); 

router.post('/forgetpassword', asyncHandler(forgetPassword)); 
router.put('/password/reset/:token', asyncHandler(resetPassword), donorLogin); 

router.get('/updateprofile', passport.authenticate('jwt', { session: false }), updateProfile);
// ------------------ Auth Related Routes (End) ------------------


async function donorLogin(req, res, next) {
  try{

    // Details for LoginActivity
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    let agent = req.headers['user-agent'];
  
    if(!ip && !agent){ return customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null); }
  
    req.body.agent = agent;
    req.body.ip = ip;

    let donorLogin = await authCtrl.donorLogin(req);
    if(!donorLogin) return customResponse(res,201, resMsgType.SUCCESS,resMsg.LOGIN_FAILED, null);
    return customResponse(res,201, resMsgType.SUCCESS,resMsg.LOGIN, donorLogin);
  }catch(e){
    return customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
  }
}

// Route for Generate OTP for Login
async function generateOTP(req, res, next) {
  try{
    let generateOtp = await authCtrl.generateOtp(req);
    if(!generateOtp) return customResponse(res,500, resMsgType.ERROR,resMsg.SWR, "Try Again");
    return customResponse(res,201,resMsgType.SUCCESS,resMsg.OTP, null);
  }catch(e){
    return customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
  }
}


// Route for verify OTP for Login
async function verifyOTP(req, res, next) {
  
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  let agent = req.headers['user-agent'];

  if(!ip && !agent){customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null); }

  req.body.agent = agent;
  req.body.ip = ip;

  await Joi.validate(req.body, verifyOtpSchema, { abortEarly: true });
  const { otp, mobile } = req.body;

  //Checking User if Exist
  const user = await User.findOne({ mobile });
  if(!user){customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null); }

  console.log(user);
  if(user.mobileOtpExpire > Date.now() && user.mobileOtp == otp){
    const token = await authCtrl.generateToken(user);
    user.mobileOtp = "";
    user.mobileOtpExpire = "";
    await user.save();
    const loginActivityDetails = { user: user._id, body: req.body, status: 'success', };
    const loginActivity = await authCtrl.loginActivity(loginActivityDetails);

    res.status(200).json({
      status: 200,
      messageType: resMsgType.SUCCESS,
      message: resMsg.LOGIN,
      user, 
      token
    })
  }
  else
  {
    //saving login activity even after login failed.
    const loginActivityDetails = { user: user._id, body: req.body, status: 'fail', };
    const loginActivity = await authCtrl.loginActivity(loginActivityDetails);
    return customResponse(res,400, resMsgType.ERROR,resMsg.OTP_FAILED, null);
  }
}

async function updateProfile(req, res, next) {
  me = req.user;
  // console.log(users._id);
  let user = { id: me._id, body: req.body}
  let updatedMe = await authCtrl.updateMe(user);
  if(!updatedMe) { customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null); }
  return customResponse(res,200, resMsgType.SUCCESS,resMsg.UPDATED, updatedMe);
}

async function forgetPassword(req, res, next){
  // Get ResetPasswordToken 
  const success = await authCtrl.sendResetPasswordToken(req.body);
  if(!success) { customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null); }
  else { return customResponse(res,200, resMsgType.SUCCESS,`Email Send to ${req.body.email} Successfully`, null); }  

}

async function resetPassword(req, res, next) {
  const validation = await Joi.validate(req.body, resetPasswordSchema, { abortEarly: true });
  const data = { token: req.params.token, password: req.body.password };
  let user = await authCtrl.resetPassword(data);
  if(user === null) { customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null);}
  if(user === false) { return customResponse(res,500, resMsgType.ERROR,resMsg.TOKEN_EXPIRED, null); }

  req.user = user;
  next()
}

async function logout(req, res, next) {
  try{
      // console.log(req.user)
      let logout = await authCtrl.logout(req);
      if(!logout) { customResponse(res,400, resMsgType.WARNING,resMsg.SWR, null); }
      return customResponse(res,200, resMsgType.SUCCESS,resMsg.LOGOUT, null);
  }catch(e){
      customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
  }
}