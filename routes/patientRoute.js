const { registerPatient, loginPatient, loggedOutPatient, forgetPassword, resetPassword, getPatientDetails, updatePatientPassword, updatePatientProfile, getAllRegisteredPatients, getSingleRegisteredPatient, updatePatientRole, deletePatient } = require('../controllers/patientController');
const { isPatientAuth } = require('../middleware/patientAuth');
const express = require('express');
const router = express.Router();

router.route('/patients/register').post(registerPatient);
router.route('/patients/login').post(loginPatient);
router.route('/patients/password/forget').post(forgetPassword);
router.route('/patients/password/reset/:token').put(resetPassword);
router.route('/patients/logout').post(isPatientAuth, loggedOutPatient);

router.route('/patients/me').get(isPatientAuth, getPatientDetails);
router.route('/patients/profile/update').put(isPatientAuth, updatePatientProfile);
router.route('/patients/password/update').put(isPatientAuth, updatePatientPassword);

router.route('/admin/patients').get(getAllRegisteredPatients);
router.route('/admin/patients/:id').get(getSingleRegisteredPatient)
                                .put(updatePatientRole)
                                .delete(deletePatient);

module.exports = router;