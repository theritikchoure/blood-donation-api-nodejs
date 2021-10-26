const Donor = require('../../models/donor');

module.exports = async (req, res, next) => {
    const bg = req.query.bloodgroup;
    const city = req.query.city;
    const donor = await Donor.find({"$or":[{city:city}]}).sort({_id: 'desc'})

    return res.status(200).json({
        donor: donor
    })
}