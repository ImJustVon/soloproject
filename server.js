
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const aws = require('aws');

//routes
const teams = require('./routes/teams');
const login = require('./routes/login');
const register = require('./routes/register');
const card = require('./routes/card');

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

//middleware
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/login', login);
app.use('/register', register);
app.use('/teams', teams);
app.use('/card', card);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

// everything beyond this point must be authenticated
app.use(ensureAuthenticated);

app.get('/supersecret', function (req, res) {
  res.send('the password is banana');
});

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
