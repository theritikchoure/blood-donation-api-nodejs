const express = require('express');
const asyncHandler = require('express-async-handler')
const contactCtrl = require('../controllers/contactUs.controller');
const customResponse = require('../middleware/response-handler');
const {resMsgType, resMsg} = require('../config/constant');
const router = express.Router();

module.exports = router;

// Contact Us Routes
router.post('/', asyncHandler(submitMessage)); // Submit Contact Us Form 
router.get('/', asyncHandler(getAllMessages)); // Get All Messages
router.get('/:id', asyncHandler(getSingleMessage)); // Get A Message
router.delete('/:id', asyncHandler(deleteSingleMessage)); // Delete A Messages

// Submit Contact Us Form
async function submitMessage(req, res, next) {
    try{
        let message = await contactCtrl.submitMessage(req);
        return customResponse(res,201, resMsgType.SUCCESS,resMsg.CREATED, message);
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}

// Get All Message from Contact Us Form
async function getAllMessages(req, res, next) {
    try{
        let messages = await contactCtrl.getAllMessages();
        if(messages.length) 
        customResponse(res,200, resMsgType.SUCCESS,resMsg.SUCCESS_FETCH, messages);  
        else
            customResponse(res,400, resMsgType.WARNING,resMsg.NO_DATA_FOUND, null); 
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}

// Get Single Message from Contact Us Form 
async function getSingleMessage(req, res, next) {
    try{
        let message = await contactCtrl.getSingleMessage(req);
        return customResponse(res,200, resMsgType.SUCCESS,resMsg.SUCCESS_FETCH, message);    
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}

// Delete Single Message 
async function deleteSingleMessage(req, res, next) {
    try{
        isDeleted = await contactCtrl.deleteSingleMessage(req);
        if(!isDeleted) return customResponse(res,500, resMsgType.ERROR,resMsg.SWR, null);
        return customResponse(res,200, resMsgType.SUCCESS,resMsg.DELETED, null);    
    }catch(e){
        customResponse(res,500, resMsgType.ERROR,resMsg.SWR, e.message);
    }
}