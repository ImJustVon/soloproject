const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const aws = require('aws');
const favicon = require('serve-favicon');

//routes
const teams = require('./routes/teams');
const login = require('./routes/login');
const register = require('./routes/register');
const card = require('./routes/card');
const logout = require('./routes/logout');
const admin = require('./routes/admin');
const email = require('./routes/email');

//setup
const user = require('./models/user');
const auth = require('./auth/setup');
const connection = require('./db/connection');

const sessionConfig = {
  secret: 'super secret key goes here', // TODO this should be read from ENV
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000,
    secure: false,
  },
};

auth.setup();
const app = express();

//middleware for checking group
var needsGroup = function (group) {
  return [
    function (req, res, next) {
      if (req.user && req.user.group === group)
        next();
      else
        res.send(401, 'Unauthorized');
    },
  ];
};

//middleware
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/login', login);
app.use('/register', register);
app.use('/teams', teams);
app.use('/card', card);
app.use('/logout', logout);
app.use('/admin', needsGroup('admin'), admin);
app.use('/email', email);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

// everything beyond this point must be authenticated
app.use(ensureAuthenticated);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
}

var server = app.listen(3000, function () {
  console.log('Listening on port', server.address().port);
});
