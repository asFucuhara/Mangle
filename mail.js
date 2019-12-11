const nodemailer = require('nodemailer');

const {
  mail: { user, pass, receiver }
} = require('./config');

const main = async path => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user,
      pass
    },
    tls: { ciphers: 'SSLv3' }
  });

  const mailOptions = {
    from: user,
    to: receiver,
    subject: 'Files',
    text: 'This email was auto-generated',
    attachments: [{ path }]
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Email error: ', error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
};

module.exports = main;
