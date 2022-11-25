const express = require('express');
const asyncHandler = require('express-async-handler')
const patientCtrl = require('../controllers/patient.controller');
const customResponse = require('../middleware/response-handler');
const {resMsgType, resMsg} = require('../config/constant');
const router = express.Router();
const { stockBhopalData, stockIndoreData } = require('../utils/data/stock');
module.exports = router;

// Patient CRUD Operation Routes
router.get('/:city', asyncHandler(stock)); 

// Get All Patients 
async function stock(req, res, next) {

    try{
        let response;
        if(req.params.city === 'bhopal') {
            response = stockBhopalData;
        } else if(req.params.city === 'indore') {
            response = stockIndoreData;
        } else {
            response = []
        }
        customResponse(res,200, resMsgType.SUCCESS,resMsg.SUCCESS_FETCH, response);
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}
