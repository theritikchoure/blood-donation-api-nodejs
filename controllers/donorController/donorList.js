const Donor = require('../../models/donor');

module.exports = async (req, res, next) => {
    const donor = await Donor.find({donated:null}).sort({_id: 'desc'})
    return res.status(200).json({
        donor: donor
    })
}