var https = require('https'),
 http = require('http'),
 config = require('./config')(),
 sgMail = require('@sendgrid/mail'),
 Mailgen = require('mailgen');

 sgMail.setApiKey(config.SENDGRID_API_KEY);

 var actions = {};
 // Configure mailgen by setting a theme and your product info
 var mailGenerator = new Mailgen({
     theme: 'salted',
     product: {
         // Appears in header & footer of e-mails
         name: 'Price Fix',
         link: 'http://pricefix.com'
         // Optional logo
         // logo: 'https://mailgen.js/img/logo.png'
     }
 });

 actions.forgotPassword = function(data) {
     var email = {
         body: {
             greeting: 'Dear',
             name: data.name,
             intro: `We received a request to generate a new password. ${data.msg}`,
             // action: {
             //     instructions: 'To reset your password, please click on the following link',
             //     button: {
             //         color: '#3698d1', // Optional action button color
             //         text: 'Reset Password',
             //         link: data.link
             //     }
             // },
             outro: 'This is a system generated email. Please do not reply to this mail id.',
             signature: 'Regards'
         }
     };
     return mailGenerator.generate(email);
 }

 module.exports = {
     sendMail: function(email, subject, body) {
         console.log('email----', email)
         const mailOption = {
             from: 'no-reply@pricefix.com',
             to: email,
             subject: subject,
             generateTextFromHTML: true,
             text: body,
             html: body
         }
         sgMail.send(mailOption, function(err, res) {
             if (err) {
                 console.log('err---', err);
             } else {
                 // console.log('res---', res);
             }
         });
     },
     createMail: function(message, action) {
         if (actions[action]) {
             this.sendMail(message.email, message.subject, actions[action](message), function(err, resp) {
                 console.log('error in email sending ', err);
             });
         }
     }
 }