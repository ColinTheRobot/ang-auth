// MODULES
// ==================================
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// MODELS
// ==================================
var User = require('./models/user')

var app = express();

// MIDDLEWARE / CONFIGURATION
// ==================================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTING MIDDLEWARE
// ==================================
app.use('/todos', require('./controllers/todos.js'));
app.use('/users', require('./controllers/users.js'))

// DATABASE CONNECTION
// ==================================
var mongoURI = 'mongodb://localhost/todos'
mongoose.connect(mongoURI);


app.listen(3000, function() {
  console.log('listening');
});
