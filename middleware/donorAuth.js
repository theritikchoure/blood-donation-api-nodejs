module.exports = (req, res, next) => {
    if(req.session.loggedindonor)
    {
        next()
    }
    else
    {
        return res.status(200).json({
            error: "Login First"
        });
    }
}