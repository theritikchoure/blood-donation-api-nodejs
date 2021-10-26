const apiUser = require('../../models/apiUser');

module.exports = async (req, res, next) => {
    const apiUser = await apiUser.find().sort({_id: 'desc'})
    return res.status(200).json({
        apiUser: apiUser
    })
}