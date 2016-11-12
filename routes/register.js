const router = require('express').Router();
const User = require('../models/user');
const pool = require('../db/connection');

var checkToken = function (token) {
  return new Promise(function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        done();
        return reject(err);
      }

      client.query('SELECT * FROM email WHERE token=$1',
      [token],
      function (err, result) {
        console.log('finished with query');
        done();
        if (err) {
          reject(err);
        }

        resolve(result.rows[0].id);
      });
    });
  });
};

router.post('/', function (req, res) {
    console.log('registering new user');
    console.log();
    console.log('about to check token');
    checkToken(req.body.token).then(function (id) {
      console.log('token was checked ', id);
      User.create(req.body.username, req.body.password, id).then(function () {
        res.sendStatus(201);
      }).catch(function (err) {
        console.log('Error in /register', err);
        res.sendStatus(500);
      });
    }).catch(function (err) {
      console.log('Error in /register token not valid', err);
      res.sendStatus(500);
    });
  });

module.exports = router;
