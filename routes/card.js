const express = require('express');
const router = require('express').Router();
const AWS = require('aws-sdk');
require('dotenv').config({ path: './aws.env' });
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var multerS3 = require('multer-s3');
var path = require('path');
const pool = require('../db/connection');

var accessKeyId =  process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY;

//updates the config object of aws to have the correct access key's
AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: 'us-west-2',
  });
var s3 = new AWS.S3();

//sets the destination for multer to upload the file as s3
var uploads3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'soloproject',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },

    key: function (req, file, cb) {
      //creates a name for the file with the file extention
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
  }),
});

/**
 * Create's database entry for the card information and uploads image to s3
 */
router.post('/', uploads3.single('file'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        res.sendStatus(500);
      }

      client.query('INSERT INTO cards (name, image_name, team, color1, color2, catagory, question1, question2, question3, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [req.body.name, req.file.key, req.body.team, req.body.color1, req.body.color2, req.body.catagory, req.body.question1, req.body.question2, req.body.question3, req.user.id],
    function (err) {
        if (err) {
          console.log('Error inserting into db', err);
          return res.sendStatus(500);
        }

        res.sendStatus(200);
      });
    } finally {
      done();
    }
  });
});

module.exports = router;
