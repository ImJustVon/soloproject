const router = require('express').Router();
const passport = require('passport');
const pool = require('../db/connection');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

router.get('/', function (req, res) {
    console.log('Got a request');
    pool.connect(function (err, client, done) {
      try {
        if (err) {
          res.sendStatus(500);
        }

        client.query('SELECT * FROM email;', function (err, result) {
            if (err) {
              request.send(500);
            }

            var mailOptions = {
                from: '"Vaughn" <vaughnprosser@gamil.com>', // sender address
                to: result.rows[0].emailaddress, // list of receivers
                subject: 'Register', // Subject line
                text: 'Register', // plaintext body
                html: '<a href="localhost:3000/register?token=' + result.rows[0].token + '">register</a>', // html body
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
