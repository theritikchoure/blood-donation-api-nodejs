const Patient = require('../../models/patient');
const bcrypt = require('bcrypt');
const session = require("express-session");
const MongoDBSession = require('connect-mongodb-session')(session);

module.exports = async (req, res, next) => {
    await Patient.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length > 1)
            {
                return res.status(409).json({
                    message: "mail exists",
                })
            }
            else
            {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err)
                    {
                        return res.status(500).json({
                            error: err
                        })
                    }
                    else
                    {
                        const patient = new Patient({
                            name: req.body.name,
                            bloodgroup: req.body.bloodgroup,
                            email: req.body.email,
                            password: hash,
                            mobile: req.body.mobile,
                            age: req.body.age,
                            city: req.body.city,
                            disease: req.body.disease,
                            hospital: req.body.hospital,
                        });
                        patient
                            .save()
                            .then(result => {
                                req.session.loggedinpatient = true;
                                req.session.patientid = result._id;
                                console.log(result);
                                res.status(201).json({
                                    message: "Patient Registered Successfully",
                                    patient: result
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
}