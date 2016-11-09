const router = require('express').Router();
const passport = require('passport');
const pool = require('../db/connection');

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
