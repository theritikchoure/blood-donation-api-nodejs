module.exports = (req, res, next) => {
    if(req.session.loggedinpatient)
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