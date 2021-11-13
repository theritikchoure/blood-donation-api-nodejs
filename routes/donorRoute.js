const { registerDonor, loginDonor, loggedOutDonor, forgetPassword, resetPassword, getDonorDetails, updateDonorPassword, updateDonorProfile, getAllRegisteredDonors, getSingleRegisteredDonor, updateDonorRole, deleteDonor, donorDonated, donatedHistory, listOfDonor, donorProfile, exportDonors, importDonors } = require('../controllers/donorController');
const { isDonorAuth } = require('../middleware/donorAuth');
const { isPatientAuth } = require('../middleware/patientAuth');
const { adminAuth } = require('../middleware/adminAuth');
const express = require('express');
const router = express.Router();

router.route('/donors').get(isPatientAuth, listOfDonor);

router.route('/donors/register').post(registerDonor);
router.route('/donors/login').post(loginDonor);
router.route('/donors/password/forget').post(forgetPassword);
router.route('/donors/password/reset/:token').put(resetPassword);
router.route('/donors/logout').post(isDonorAuth, loggedOutDonor);

router.route('/donors/me').get(isDonorAuth, getDonorDetails);
router.route('/donors/profile/update').put(isDonorAuth, updateDonorProfile);
router.route('/donors/password/update').put(isDonorAuth, updateDonorPassword);

router.route('/donors/profile/donated/:id').put(isDonorAuth, donorDonated);
router.route('/donors/profile/history').get(isDonorAuth, donatedHistory);

router.route('/donors/:id').get(isPatientAuth, donorProfile);

router.route('/admin/donors/import').post(importDonors);
router.route('/admin/donors').get(adminAuth, getAllRegisteredDonors);
router.route('/admin/donors/:id').get(adminAuth, getSingleRegisteredDonor)
                                .delete(adminAuth, deleteDonor);

router.route('/admin/export/donors').get(adminAuth, exportDonors);

module.exports = router;