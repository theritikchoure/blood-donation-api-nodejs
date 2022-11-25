
const Joi = require('joi');

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
    userLoginSchema, loginOtpSchema, verifyOtpSchema, forgetPasswordSchema, updateMeSchema
}
  