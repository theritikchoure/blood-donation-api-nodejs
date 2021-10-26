const Donor = require('../../models/donor');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    await Donor.find({email: req.body.email})
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
                        const donor = new Donor({
                            name: req.body.name,
                            bloodgroup: req.body.bloodgroup,
                            email: req.body.email,
                            password: hash,
                            mobile: req.body.mobile,
                            age: req.body.age,
                            city: req.body.city,
                        });
                        donor
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "Donor has registered successfully",
                                    donor: result
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