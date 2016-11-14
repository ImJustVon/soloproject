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

// var deleteToken = function (token) {
//   return new Promise(function (resolve, reject) {
//     pool.connect(function (err, client, done) {
//       if (err) {
//         done();
//         return reject(err);
//       }
//
//       client.query('UPDATE email SET emailaddress=$1, token=NULL WHERE token=$2',
//       [token],
//       function (err, result) {
//         console.log('finished with query');
//         done();
//         if (err) {
//           reject(err);
//         }
//
//         resolve(result.rows[0].id);
//       });
//     });
//   });
// };

router.post('/', function (req, res) {
    checkToken(req.body.token).then(function (id) {
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
