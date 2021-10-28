const Donor = require('../../models/donor');

module.exports = async (req, res, next) => {
    const qCity = req.query.city;
    const qBloodGroup = req.query.bloodgroup;
    try {
        let donor;

        if (qCity) 
        {
            donor = await Donor.find({donated:null}, {city: qCity}).sort({_id: 'desc'});
            res.status(200).json({
                message: "List of Donors Based On City",
                donors: donor
            })
        } 
        else if (qBloodGroup) 
        {
            donor = await Donor.find({donated:null}, {bloodgroup: qBloodGroup}).sort({_id: 'desc'});
            res.status(200).json({
                message: "List of Donors Based On Blood Group",
                donors: donor
            })
        }
        else if (qCity && qBloodGroup) 
        {
            donor = await Donor.find({donated:null}, {city: qBloodGroup}, {bloodgroup: qBloodGroup}).sort({_id: 'desc'});
            res.status(200).json({
                message: "List of Donors Based On City and Blood Group",
                donors: donor
            })
        } 
        else 
        {
            donor = await Donor.find().sort({_id: 'desc'});
            res.status(200).json({
                message: "List of All the Donors",
                donors: donor
            })
        }
    } catch (err) {
        res.status(500).json(err);
    }
}