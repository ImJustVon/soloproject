// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const pool = require('../db/connection');

// find by username
function findByUsername(username) {
  return new Promise(function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        done();
        return reject(err);
      }

      client.query('SELECT * FROM users WHERE username=$1',
      [username],
      function (err, result) {
        done();
        if (err) {
          reject(err);
        }

        resolve(result.rows[0]);
      });
    });
  });
}

// //checks to see if the token is valid
// function checkToken(token) {
//   return new Promise(function (resolve, reject) {
//     pool.connect(function (err, client, done) {
//       if (err) {
//         done();
//         return reject(err);
//       }
//
//       client.query('SELECT id FROM email WHERE token=$1',
//       [token],
//       function (err, result) {
//         done();
//         if (err) {
//           reject(err);
//         }
//
//         resolve(result.rows[0]);
//       });
//     });
//   });
// }

// find by id
function findById(id) {
  return new Promise(function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) {
        done();
        return reject(err);
      }

      client.query('SELECT * FROM users WHERE id=$1',
      [id],
      function (err, result) {
        done();
        if (err) {
          reject(err);
        }

        resolve(result.rows[0]);
      });
    });
  });
}

// create
function create(username, password, id) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, SALT_ROUNDS, function (err, hash) {
      if (err) {
        console.log('Error hashing password', err);
        return reject(err);
      }

      pool.connect(function (err, client, done) {
        if (err) {
          done();
          return reject(err);
        }

        client.query('INSERT INTO users (username, password, email_id) VALUES ($1, $2, $3) RETURNING *',
                     [username, hash, id],
                     function (err, result) {
                      done();
                      if (err) {
                        return reject(err);
                      }

                      resolve(result.rows[0]);
                    });
      });
    });
  });
}

// compare password
function comparePassword(user, passwordToCompare) {
  return new Promise(function (resolve) {
    bcrypt.compare(passwordToCompare, user.password, function (err, match) {
      if (err) {
        console.log('Error comparing password', err);
        return resolve(false);
      }

      resolve(match);
    });
  });
}

module.exports = {
  findByUsername: findByUsername,
  findById: findById,
  create: create,
  comparePassword: comparePassword,
};
