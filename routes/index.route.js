const express = require('express');
const authRoutes = require('./auth.route');
const donorRoutes = require('./donor.route');
const patientRoutes = require('./patient.route');
const contactUsRoutes = require('./contactUs.route');
const stockRoutes = require('./stock.route');
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.status(200).json({
    message: "Welcome to Blood Donation Created by BloodBuddies Group",
  })
);  

router.use('/auth', authRoutes);
router.use('/donors', donorRoutes); 
router.use('/patients', patientRoutes); 
router.use('/contactus', contactUsRoutes); 
router.use('/stock', stockRoutes);

module.exports = router;
