const router = require('express').Router();
const passport = require('passport');

router.get('/', function (req, res) {
  console.log('trying to logout');
  req.logout();
});

module.exports = router;
