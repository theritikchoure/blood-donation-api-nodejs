const apiUser = require('../../models/apiUser');

module.exports = (req, res, next) => {
    const id = req.params.id;
    const deleted = apiUser.deleteOne({_id:id})
                           .exec()
                           .then(result => {
                               console.log(result);
                               res.status(200).json(result);
                           })
                           .catch(err => {
                               console.log(err);
                               res.status(500).json({error: err});
                           });
}