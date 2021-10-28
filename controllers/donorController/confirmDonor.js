const Confirm = require('../../models/confirm');

module.exports = async (req, res, next) => {
    const donorid = req.body.donorid;
    const patientid = req.session.patientid;
    const confirm = new Confirm({
        donorId: donorid,
        patientId: patientid,
    });
    confirm
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Donor Confirmed",
                confirm: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}