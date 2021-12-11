const express = require('express');
const asyncHandler = require('express-async-handler')
const patientCtrl = require('../controllers/patient.controller');
const customResponse = require('../middleware/response-handler');
const {resMsgType, resMsg} = require('../config/constant');
const router = express.Router();

module.exports = router;

// Patient CRUD Operation Routes
router.post('/', asyncHandler(register)); // Create A Patient
router.get('/', asyncHandler(getAllPatient)); // Retrieve All Patient
router.get('/:patientId', asyncHandler(getSinglePatient)); // Retrieve Single Patient
router.put('/:patientId', asyncHandler(updateSinglePatient)); // Update Single Patient
router.delete('/:patientId', asyncHandler(deleteSinglePatient)); // Delete Single Patient

// Create A Patient
async function register(req, res, next) {
    try{
        let patient = await patientCtrl.insert(req);
        patient = patient.toObject();
        delete patient.hashedPassword;
        customResponse(res,201, resMsgType.SUCCESS,resMsg.CREATED, patient);
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}

// Get All Patients 
async function getAllPatient(req, res, next) {
    try{
        let patients = await patientCtrl.getAllPatient();
        if(patients.length) 
        customResponse(res,200, resMsgType.SUCCESS,resMsg.SUCCESS_FETCH, patients);  
        else
            customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null); 
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}

// Get Single Patients 
async function getSinglePatient(req, res, next) {
    try{
        let patient = await patientCtrl.getSinglePatient(req);
        if(patient) 
        customResponse(res,200, resMsgType.SUCCESS,resMsg.SUCCESS_FETCH, patient);  
        else
            customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null);
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    } 
}

// Update Single Patients 
async function updateSinglePatient(req, res, next) {
    try{
        let updatedPatient = await patientCtrl.updatePatient(req);
        if(!updatedPatient) { customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null); }
        return customResponse(res,200, resMsgType.SUCCESS,resMsg.UPDATED, updatedPatient);
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}

// Delete Single Patients 
async function deleteSinglePatient(req, res, next) {
    try{
        const patient = await patientCtrl.deleteSinglePatient(req);
        if (!patient) customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null);
        return customResponse(res,200, resMsgType.SUCCESS,resMsg.DELETED, null);
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}