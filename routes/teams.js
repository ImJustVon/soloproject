const router = require('express').Router();
const pool = require('../db/connection');

router.get('/', function (req, res) {
    console.log('Got a request');
    pool.connect(function (err, client, done) {
      try {
        if (err) {
          res.sendStatus(500);
        }

        client.query('SELECT team FROM teams;', function (err, result) {
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

module.exports = router;
