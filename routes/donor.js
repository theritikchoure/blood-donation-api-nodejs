const express = require('express');
const router = express.Router();
const donorAuth = require('./../middleware/donorAuth'); // import donor authentication middleware
const patientAuth = require('./../middleware/patientAuth'); // import donor authentication middleware
const apiUserAuth = require('./../middleware/apiUserAuth'); // import donor authentication middleware

// Import Different Donor Controllers (Start)  
  const donorDelete = require('./../controllers/donorController/donorDelete');
  const donorSearch = require('./../controllers/donorController/donorSearch');
  const donorDonated = require('./../controllers/donorController/donorDonated');
  const donorProfile = require('./../controllers/donorController/donorProfile');
  const donorHomeProfile = require('./../controllers/donorController/donorHomeProfile');
  const donorProfileUpdate = require('./../controllers/donorController/donorProfileUpdate');
  const donorChangePassword = require('./../controllers/donorController/donorChangePassword');
  const donorRegister = require('./../controllers/donorController/donorRegister');
  const donorLogin = require('./../controllers/donorController/donorLogin');
  const donorList = require('./../controllers/donorController/donorList');
// Import Different Donor Controllers (End) 

// Donor Routes (End) 
  router.get('/', apiUserAuth, patientAuth, donorList);
  router.post('/register', apiUserAuth, donorRegister);
  router.post('/login', apiUserAuth, donorLogin);
  router.get('/profile', apiUserAuth, donorAuth, donorProfile);
  router.put('/profile/update', apiUserAuth, donorAuth, donorProfileUpdate);
  router.put('/profile/change-password', apiUserAuth, donorAuth, donorChangePassword);
  router.put('/donated', apiUserAuth, donorAuth, donorDonated);
  router.get('/search', apiUserAuth, donorSearch);
  router.delete('/delete/:id', apiUserAuth, donorDelete);

  router.get('/:id', apiUserAuth, patientAuth, donorHomeProfile);
// Donor Routes (End) 

module.exports = router