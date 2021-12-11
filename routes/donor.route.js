const express = require('express');
const asyncHandler = require('express-async-handler')
const donorCtrl = require('../controllers/donor.controller');
const customResponse = require('../middleware/response-handler');
const {resMsgType, resMsg} = require('../config/constant');
const router = express.Router();

module.exports = router;

// Donor CRUD Operation Routes
router.post('/', asyncHandler(register)); // Create A Donor
router.get('/', asyncHandler(getAllDonor)); // Retrieve All Donor
router.get('/:donorId', asyncHandler(getSingleDonor)); // Retrieve Single Donor
router.put('/:donorId', asyncHandler(updateSingleDonor)); // Update Single Donor
router.delete('/:donorId', asyncHandler(deleteSingleDonor)); // Delete Single Donor

// Create A Donor
async function register(req, res, next) {
    try{
        let donor = await donorCtrl.insert(req);
        donor = donor.toObject();
        customResponse(res,201, resMsgType.SUCCESS,resMsg.CREATED, donor);
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}

// Get All Donors 
async function getAllDonor(req, res, next) {
    try{
        let donors = await donorCtrl.getAllDonor();
        if(donors.length) 
        customResponse(res,200, resMsgType.SUCCESS,resMsg.SUCCESS_FETCH, donors);  
        else
            customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null); 
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}

// Get Single Donors 
async function getSingleDonor(req, res, next) {
    try{
        let donor = await donorCtrl.getSingleDonor(req);
        if(donor) 
        customResponse(res,200, resMsgType.SUCCESS,resMsg.SUCCESS_FETCH, donor);  
        else
            customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null);
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    } 
}

// Update Single Donors 
async function updateSingleDonor(req, res, next) {
    try{
        let updatedDonor = await donorCtrl.updateDonor(req);
        if(updatedDonor) 
        customResponse(res,200, resMsgType.SUCCESS,resMsg.UPDATED, updatedDonor);  
        else
            customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null);
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}

// Delete Single Donors 
async function deleteSingleDonor(req, res, next) {
    try{
        const donor = await donorCtrl.deleteSingleDonor(req);
        if(donor) 
        customResponse(res,200, resMsgType.SUCCESS,resMsg.DELETED, null);  
        else
            customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null);
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}

//--------------------------------------------------------------------------------------------------------------------------

// Import Donor for Pre-Registration 

const csvtojson = require('csvtojson'); // 
var mime = require('mime-types');
var multer = require('multer');  
var path = require('path');  

var storage = multer.diskStorage({destination:(req,file,cb)=>{  
        cb(null,'./uploads');  
    },  
    filename:(req,file,cb)=>{  
        cb(null,file.originalname);  
    }  
});  

var uploads = multer({storage:storage});  

router.post('/import', uploads.single("uploadfile"), asyncHandler(importDonors)); // Import Donors

async function importDonors(req, res, next) {
    const cmime = mime.contentType(path.extname(__dirname + '/uploads/' + req.file.filename));
    if(cmime !== 'text/csv; charset=utf-8'){ 
        return customResponse(res,401, resMsgType.ERROR,"File Type Should Be CSV", null);
    }

    const dirName = path.join(__dirname, "../");
    // console.log(dirName + '/uploads/' + req.file.filename)
    const result = await donorCtrl.importDonors(dirName + '/uploads/' + req.file.filename);

    if(result) return customResponse(res,201, resMsgType.SUCCESS,"Data Imported Successfully", null);    
}