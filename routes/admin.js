const router = require('express').Router();
const passport = require('passport');
const pool = require('../db/connection');

//gets count of all users
router.get('/users', function (req, res) {
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
router.get('/cards', function (req, res, next) {
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
