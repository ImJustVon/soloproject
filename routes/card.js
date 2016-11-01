const express = require('express');
const router = require('express').Router();
const AWS = require('aws-sdk');
const multer = require('multer');
require('dotenv').config({ path: './aws.env' });

var s3 = new AWS.S3();

router.post('/', function (req, res) {
    console.log(req.body); // form fields
    console.log(req.files); // form files
    res.status(204).end();
  });

// var params = {
//   Bucket: 'soloproject',
//   Key: process.env.KEY_ID,
//   Body: req.file,
// };
// s3.putObject(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log(data);
// });

module.exports = router;
