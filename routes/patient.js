const express = require('express');
const router = express.Router();
const patientAuth = require('./../middleware/patientAuth'); // import patient authentication middleware
const apiUserAuth = require('./../middleware/apiUserAuth'); // import api user jwt token authentication middleware

// Import Different patient Controllers (Start)  
  const patientList = require('./../controllers/patientController/patientList');
  const patientRegister = require('./../controllers/patientController/patientRegister');
  const patientLogin = require('./../controllers/patientController/patientLogin');
  const patientProfile = require('./../controllers/patientController/patientProfile');
  const patientProfileUpdate = require('./../controllers/patientController/patientProfileUpdate');
  const patientChangePassword = require('./../controllers/patientController/patientChangePassword');
  const patientSearch = require('./../controllers/patientController/patientSearch');
  const patientDelete = require('./../controllers/patientController/patientDelete'); 
  const patientHistory = require('./../controllers/patientController/patientHistory'); 
// Import Different patient Controllers (End) 

// patient Routes (End) 
  router.get('/', apiUserAuth, patientList);
  router.post('/register', apiUserAuth, patientRegister);
  router.post('/login', apiUserAuth, patientLogin);
  router.get('/profile', apiUserAuth, patientAuth, patientProfile);
  router.put('/profile/update', apiUserAuth, patientAuth, patientProfileUpdate);
  router.put('/profile/change-password', apiUserAuth, patientAuth, patientChangePassword);
  router.post('/history', apiUserAuth, patientAuth, patientHistory);
  router.get('/search', apiUserAuth, patientSearch);
  router.delete('/delete/:id', apiUserAuth, patientDelete);
// patient Routes (End) 

module.exports = router