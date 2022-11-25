const bcrypt = require('bcrypt');
const Joi = require('joi');
const Donor = require('../models/donor.model');
const { userData } = require('../utils/data/users');

const csvtojson = require('csvtojson');

const donorSchema = Joi.object({
  name: Joi.string().required(),
  bloodgroup: Joi.string().required(),
  email: Joi.string().email(),
  mobile: Joi.string().required().regex(/^[1-9][0-9]{9}$/),
  age: Joi.string().required().regex(/^[1-9][0-9]{1}$/),
  password: Joi.string().required(),
  repeat_password: Joi.string().required().valid(Joi.ref('password')),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipcode: Joi.string().required().regex(/^[1-9][0-9]{5}$/),
});

module.exports = {
  insert, getAllDonor, getSingleDonor, updateDonor, deleteSingleDonor, importDonors
}

async function insert(req) {
  donor = await Joi.validate(req.body, donorSchema, { abortEarly: true });
  return await new Donor(donor).save();
}

async function getAllDonor() {
  return userData;
  // return await Donor.find();
}

async function getSingleDonor(req) {
  let isDonor = await Donor.findById(req.params.donorId);
  if(!isDonor) return false
  return isDonor
}

async function updateDonor(req) {
  const validation = await Joi.validate(req.body, donorSchema, { abortEarly: true });
  const updateDonor = await Donor.findByIdAndUpdate(req.params.donorId, req.body, {new: true, runValidators: true, useFindAndModify:false});
  if(!updateDonor) return false
  return updateDonor
}

async function deleteSingleDonor(req) {
  isDonor = await Donor.findById(req.params.donorId);
  if(!isDonor) return false
  await isDonor.remove();
  return true;
}

// ----------------------------------------------------------------------------------------------------------------------------
// Function to Import Donor
async function importDonors(filePath) {
  console.log(filePath)
  var arrayToInsert = [];
  csvtojson().fromFile(filePath).then(async source => {
      // Fetching the all data from each row
      for (var i = 0; i < source.length; i++) {
          var oneRow = {
              first_name: source[i]['first_name'],
              last_name: source[i]['last_name'],
              email: source[i]['email'],
              mobile: source[i]['mobile'],
              hashedPassword: await bcrypt.hashSync(source[i]['password'],10),
              role: source[i]['role'],
          };
          arrayToInsert.push(oneRow);
      }

      // inserting into the table “employees”
      Donor.insertMany(arrayToInsert, (err, result) => {
          if (err) console.log(err);
          if(result){
              console.log("Import CSV into database successfully.");
          }
      });
  });
  return true;
}







