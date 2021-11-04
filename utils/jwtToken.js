
// Creating Token and Saving in Cookie

const sendToken = async (user, statusCode, res) => {

    const token = user.getJWTToken();

    res.status(statusCode).json({
        success: true,
        user,
        token
    });
}

module.exports = sendToken;