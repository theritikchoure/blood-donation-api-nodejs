const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const axios = require('axios');

// List of Blood Bank
exports.bloodStock = catchAsyncError(async (req, res, next) => {
    
    const finalLink = 'https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYSTOCKDETAILS&stateCode=-1&districtCode=-1&bloodGroup=all&bloodComponent=11&lang=0&_=1636539811899';
    // const data = await axios.get(finalLink);

    try{

        const limitValue = req.query.limit || 2;
        const skipValue = req.query.skip || 0;

        const { data } = await axios.get(finalLink);

        res.status(200).json({
            success: true,
            data
        })
    }
    catch(err)
    {
        console.warn(err)
    }
});



