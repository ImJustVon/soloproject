// const express = require('express');
// const Router = require('express').Router();
// const AWS = require('aws-sdk');
// const Upload = require('s3-upload');
// const app = express();
// const S3Bucket = {
//   S3_KEY: 'AKIAIIIMXG6WRIJ6YZDQ',
//   S3_SECRET: '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',
// };
//
// var myCredentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: 'us-west-2_7hFIq279K' });
// var myConfig = new AWS.Config({
//   credentials: myCredentials, region: 'us-west-2',
// });
//
//
// Router.post('/toS3', function() {
//   app.get
// })


// Router.post('/toS3', () => {
//   var client = new Upload('soloproject')
// });



// // Set the region where your identity pool exists (us-east-1, eu-west-1)
// AWS.config.region = 'us-west-1';
//
// // Configure the credentials provider to use your identity pool
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-west-2_7hFIq279K',
// });
//
// // Make the call to obtain credentials
// AWS.config.credentials.get(function(){
//
//     // Credentials will be available when this function is called.
//     var accessKeyId = AWS.config.credentials.accessKeyId;
//     var secretAccessKey = AWS.config.credentials.secretAccessKey;
//     var sessionToken = AWS.config.credentials.sessionToken;
//
// });
