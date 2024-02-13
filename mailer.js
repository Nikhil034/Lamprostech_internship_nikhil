var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nikhilsondarava342@gmail.com',
        pass: '******'
    }
});

var mailOptions = {
    from: 'nikhilsondarava342@gmail.com',
    to: 'nikhilsondarava@lampros.tech',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});