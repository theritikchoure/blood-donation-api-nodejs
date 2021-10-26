const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

module.exports = (req, res, next) => {
    // try{
    //     const token = req.headers.authorization.split(" ")[1];
    //     console.log(token)
    //     const decoded = jwt.verify(token, process.env.JWT_KEY)
    //     req.userData = decoded;
    //     next();
    // }catch(error){
    //     return res.status(401).json({
    //         message: "Auth Failed"
    //     })
    // }

    if(req.session.loggedin)
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