const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.get('/',(req,res) => {
    const msg = {
        to: 'ahanda205@gmail.com',
        from: 'ahanda206@hotmail.com', // Use the email address or domain you verified above
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      //ES6
      sgMail
        .send(msg)
        .then(() => {
            res.send('Email Send')
        }, error => {
        
          console.error(error);
          if (error.response) {
            console.error(error.response.body)
          }
        });
})