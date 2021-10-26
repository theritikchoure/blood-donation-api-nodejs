const express = require('express');
const router = express.Router();
const donorAuth = require('./../middleware/donorAuth'); // import donor authentication middleware
const apiUserAuth = require('./../middleware/apiUserAuth'); // import donor authentication middleware

// Import Different Donor Controllers (Start)  
    const donorDelete = require('./../controllers/donorController/donorDelete');
    const donorSearch = require('./../controllers/donorController/donorSearch');
    const donorDonated = require('./../controllers/donorController/donorDonated');
    const donorProfile = require('./../controllers/donorController/donorProfile');
    const donorRegister = require('./../controllers/donorController/donorRegister');
    const donorLogin = require('./../controllers/donorController/donorLogin');
    const donorList = require('./../controllers/donorController/donorList');
// Import Different Donor Controllers (End) 

// Donor Routes (Start) 
router.get('/', apiUserAuth, donorAuth, donorList);

router.post('/register', apiUserAuth, donorRegister);

router.post('/login', apiUserAuth, donorLogin);

router.get('/profile', apiUserAuth, donorAuth, donorProfile);

router.get('/donated', apiUserAuth, donorAuth, donorDonated);

router.get('/search', apiUserAuth, donorAuth, donorSearch);

router.delete('/delete/:id', apiUserAuth, donorDelete)
// Donor Routes (End) 

module.exports = router