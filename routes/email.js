const router = require('express').Router();
const passport = require('passport');
const pool = require('../db/connection');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: './aws.env' });

var password = process.env.email_pass;

var transporter = nodemailer.createTransport('smtps://vaughnprosser%40gmail.com:' + password + '@smtp.gmail.com');

router.get('/', function (req, res) {
    console.log('Got a request');
    pool.connect(function (err, client, done) {
      try {
        if (err) {
          res.sendStatus(500);
        }

        client.query('SELECT * FROM email;', function (err, result) {
            if (err) {
              res.send(500);
            }

            var mailOptions = {
                from: '"Vaughn" <vaughnprosser@gamil.com>', // sender address
                to: result.rows[0].emailaddress, // list of receivers
                subject: 'Register', // Subject line
                text: 'Go to Crank Sisters Tradding Card and make an account your registration code is ' + result.rows[0].token + ' and the link is here', // plaintext body
                html: '<div><p>Go to Crank Sisters Tradding Card and make an account your registration code is' + result.rows[0].token + 'and the link is <a href="http://localhost:3000">here</a></p></div>', // html body
              };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  return console.log(error);
                }

                console.log('Message sent: ' + info.response);
              });

            res.send(result.rows);
          });
      } finally {
        done();
      }
    });

  });

module.exports = router;
