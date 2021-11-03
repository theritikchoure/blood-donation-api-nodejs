const { registerAdmin, loginAdmin, loggedOutAdmin, forgetPassword, resetPassword, updateAdminPassword, updateAdminProfile, adminDashboard } = require('../controllers/adminController');
const { adminAuth } = require('../middleware/adminAuth');
const express = require('express');
const router = express.Router();

router.route('/admin/register').post(registerAdmin);
router.route('/admin/login').post(loginAdmin);
router.route('/admin/password/forget').post(forgetPassword);
router.route('/admin/password/reset/:token').put(resetPassword);
router.route('/admin/logout').post(adminAuth, loggedOutAdmin);

router.route('/admin/dashboard').get(adminAuth, adminDashboard);
router.route('/admin/profile/update').put(adminAuth, updateAdminProfile);
router.route('/admin/password/update').put(adminAuth, updateAdminPassword);

module.exports = router;