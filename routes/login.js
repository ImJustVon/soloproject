const router = require('express').Router();
const passport = require('passport');

router.post('/', passport.authenticate('local'), function (req, res) {
  console.log('At login.js');
  res.send({
    group: req.user.group,
  });
});

module.exports = router;
