var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0ab1e2bef1b54d",
        pass: "e606ca68fa0bcc"
    }
});

var mailOptions = {
    from: 'nikhilsondarava342@gmail.com',
    to: 'nikhilsondarava@lampros.tech',
    subject: 'Sending Email using Node.js',
    html: "<b style='color:red'>Thanks you for work!</b>"
};

transport.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
