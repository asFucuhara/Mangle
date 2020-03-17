const nodemailer = require('nodemailer');

const {
  mail: { user, pass, receiver }
} = require('../config');

const mail = path => {
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

  const mailPromise = new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  })

  return mailPromise;
};

module.exports = mail;
