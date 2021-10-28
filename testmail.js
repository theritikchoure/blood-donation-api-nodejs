var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

var mailOptions={
    from: process.env.MAIL_USERNAME,
    to: 'iasritikchourasiya@gmail.com',
    subject: 'Test Mail',
    path: ''
}

transport.sendMail(mailOptions, function(error, info){
    if(error)
    {
        console.warn(error)
    }
    else
    {
        console.log('email has been send')
    }
})