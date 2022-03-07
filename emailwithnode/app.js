var nodemailer = require('nodemailer');
let dotenv = require('dotenv')
dotenv.config()

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'ahanda206@hotmail.com',
    pass: ''
  }
});

var mailOptions = {
  from: 'ahanda206@hotmail.com',
  to: 'ahanda205@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});