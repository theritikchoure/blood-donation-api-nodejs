const Donor = require('../../models/donor');
const Donated = require('../../models/donated');

module.exports = (req, res, next) => {
    const donorid = req.session.donorid;
    const patientid = req.params.patientid;

    const date = Date.now();

    Donor.updateOne({_id:donorid}, {$set: {donated: date}})
           .exec()
           .then(result => {
               console.log(result);
               const donated = new Donated({
                    donorId: donorid,
                    patientId: patientid,
                });
                donated
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "Congrats You have Donated Blood",
                            cofirm: result
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
           })
           .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
           });
}