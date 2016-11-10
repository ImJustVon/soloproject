const router = require('express').Router();
const passport = require('passport');
const pool = require('../db/connection');

//middleware for checking group
var needsGroup = function (group) {
  return [
    passport.authenticate('local'),
    function (req, res, next) {
      if (req.user && req.user.group === group)
        next();
      else
        res.send(401, 'Unauthorized');
    },
  ];
};

//gets count of all users
router.get('/users', needsGroup('admin'), function (req, res) {
    console.log('Got a request');
    pool.connect(function (err, client, done) {
      try {
        if (err) {
          res.sendStatus(500);
        }

        client.query('SELECT COUNT(id) FROM users;', function (err, result) {
            if (err) {
              request.send(500);
            }

            res.send(result.rows);
          });
      } finally {
        done();
      }
    });

  });

//gets all cards from the database needs admin privilages
router.get('/cards', needsGroup('admin'), function (req, res, next) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Cant connect: ', err);
        res.sendStatus(500);
      }

      client.query('Select * FROM cards;',
    function (err, result) {
        if (err) {
          console.log('error querying: ', err);
          return res.sendStatus(500);
        }

        console.log(result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

module.exports = router;
