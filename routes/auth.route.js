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


// ------------------ Validation Schemas (End) ------------------

// ------------------ Auth Related Routes (Start) ------------------
router.post('/login', asyncHandler(emailLogin)); // Done - ( FIX ME Later)
router.post('/generateotp', asyncHandler(generateOTP)); // Done
router.post('/verifyotp', asyncHandler(verifyOTP)); // Done
router.post('/logout', passport.authenticate('jwt', { session: false }), asyncHandler(logout)); 

// router.get('/updateprofile', passport.authenticate('jwt', { session: false }), updateProfile);
// ------------------ Auth Related Routes (End) ------------------


async function emailLogin(req, res, next) {
  try{

    // Details for LoginActivity
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    let agent = req.headers['user-agent'];
  
    if(!ip && !agent){ return customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null); }
  
    req.body.agent = agent;
    req.body.ip = ip;

    let donorLogin = await authCtrl.emailLogin(req);
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
    if(!generateOtp) return customResponse(res,500, resMsgType.ERROR,resMsg.NO_DATA_FOUND, "Try Again");
    return customResponse(res,201,resMsgType.SUCCESS,resMsg.OTP, null);
  }catch(e){
    return customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
  }
}


// Route for verify OTP for Login
async function verifyOTP(req, res, next) {
  try{

    // Details for LoginActivity
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    let agent = req.headers['user-agent'];
  
    if(!ip && !agent){ return customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null); }
  
    req.body.agent = agent;
    req.body.ip = ip;

    let isOtpVerified = await authCtrl.verifyOTP(req);
    if(!isOtpVerified) return customResponse(res,403, resMsgType.SUCCESS,resMsg.LOGIN_FAILED, null);
    return customResponse(res,201, resMsgType.SUCCESS,resMsg.LOGIN, isOtpVerified);
  }catch(e){
    return customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
  }
}

async function logout(req, res, next) {
  try{
      // console.log(req.user)
      let logout = await authCtrl.logout(req);
      if(!logout) { customResponse(res,400, resMsgType.WARNING,resMsg.BAD_REQUEST, null); }
      return customResponse(res,200, resMsgType.SUCCESS,resMsg.LOGOUT, null);
  }catch(e){
      customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
  }
}


//----------------------------------------------------------------------------------------------------------------------------
// router.post('/forgetpassword', asyncHandler(forgetPassword)); 
// router.put('/password/reset/:token', asyncHandler(resetPassword), donorLogin); 

// async function resetPassword(req, res, next) {
//   const validation = await Joi.validate(req.body, resetPasswordSchema, { abortEarly: true });
//   const data = { token: req.params.token, password: req.body.password };
//   let user = await authCtrl.resetPassword(data);
//   if(user === null) { customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null);}
//   if(user === false) { return customResponse(res,500, resMsgType.ERROR,resMsg.TOKEN_EXPIRED, null); }

//   req.user = user;
//   next()
// }