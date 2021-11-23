const { listOfDonor, donorProfile} = require('../controllers/botController');
const express = require('express');
const router = express.Router();

router.route('/donors').get(listOfDonor);

router.route('/donors/:id').get(donorProfile);

module.exports = router;