const apiUser = require('../../models/apiUser');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    await apiUser.find({email: req.body.email})
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
                        const apiUser = new apiUser({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                        });
                        apiUser
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "API USER has registered successfully",
                                    apiUser: result
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