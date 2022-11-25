const bcrypt = require('bcryptjs');
const Joi = require('joi');
const Patient = require('../models/patient.model');
const { userData } = require('../utils/data/users');

const patientSchema = Joi.object({
  name: Joi.string().required(),
  bloodgroup: Joi.string().required(),
  mobile: Joi.string().required().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeat_password: Joi.string().required().valid(Joi.ref('password')),
  age: Joi.string().required().regex(/^[1-9][0-9]{1}$/),
  city: Joi.string().required(),
  state: Joi.string().required(),
  disease: Joi.string().required(),
  hospital: Joi.string().required(),
});

module.exports = {
  insert, getAllPatient, getSinglePatient, updatePatient, deleteSinglePatient
}

async function insert(req) {
  let patient = await Joi.validate(req.body, patientSchema, { abortEarly: true });
  patient.password = bcrypt.hashSync(req.body.password, 10);
  return await new Patient(patient).save();
}

async function getAllPatient() {
  return userData;
  // return await Patient.find();
}

async function getSinglePatient(req) {
  let isPatient = await Patient.findById(req.params.patientId);
  if(!isPatient) return false
  return isPatient
}

async function updatePatient(req) {
  const validation = await Joi.validate(req.body, patientSchema, { abortEarly: true });
  const updatePatient = await Patient.findByIdAndUpdate(req.params.patientId, req.body, {new: true, runValidators: true, useFindAndModify:false});
  if(!updatePatient) return false
  return updatePatient
}

async function deleteSinglePatient(req) {
  isPatient = await Patient.findById(req.params.patientId);
  if(!isPatient) return false
  await isPatient.remove();
  return true;
}