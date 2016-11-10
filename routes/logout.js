const router = require('express').Router();
const passport = require('passport');

router.get('/', function (req, res) {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
