const { registerDonor, loginDonor, loggedOutDonor, forgetPassword, resetPassword, getDonorDetails, updateDonorPassword, updateDonorProfile, getAllRegisteredDonors, getSingleRegisteredDonor, updateDonorRole, deleteDonor } = require('../controllers/donorController');
const { isDonorAuth } = require('../middleware/donorAuth');
const express = require('express');
const router = express.Router();

router.route('/donors/register').post(registerDonor);
router.route('/donors/login').post(loginDonor);
router.route('/donors/password/forget').post(forgetPassword);
router.route('/donors/password/reset/:token').put(resetPassword);
router.route('/donors/logout').post(isDonorAuth, loggedOutDonor);

router.route('/donors/me').get(isDonorAuth, getDonorDetails);
router.route('/donors/profile/update').put(isDonorAuth, updateDonorProfile);
router.route('/donors/password/update').put(isDonorAuth, updateDonorPassword);

router.route('/admin/donors').get(getAllRegisteredDonors);
router.route('/admin/donors/:id').get(getSingleRegisteredDonor)
                                .put(updateDonorRole)
                                .delete(deleteDonor);

module.exports = router;