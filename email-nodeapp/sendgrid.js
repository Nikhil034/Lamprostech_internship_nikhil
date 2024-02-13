const sendgrid = require('@sendgrid/mail');

const SENDGRID_API_KEY = "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"

sendgrid.setApiKey(SENDGRID_API_KEY)

const msg = {
    to: 'nikhilsondarava@lampros.tech',
    // Change to your recipient
    from: 'nikhilsondarava342@gmail.com',
    // Change to your verified sender
    subject: 'Sending with SendGrid Is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sendgrid
    .send(msg)
    .then((resp) => {
        console.log('Email sent\n', resp)
    })
    .catch((error) => {
        console.error(error)
    })
