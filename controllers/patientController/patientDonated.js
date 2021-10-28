const Donor = require('../../models/donor');

module.exports = (req, res, next) => {
    const id = req.session.donorid;
    const date = Date.now();

    Donor.updateOne({_id:id}, {$set: {donated: date}})
           .exec()
           .then(result => {
               console.log(result);
               res.status(201).json({
                   message: "Congrats You have donated blood",
                   donatedDate: date
               });
           })
           .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
           });
}