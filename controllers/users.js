var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');

module.exports = router;

var express = require('express');
var router  = express.Router();

var User = require('../models/user');

router.post('/signup', function(req, res) {
  User.register(new User(
    { username : req.body.username}),
    req.body.password, function(err, user) {
      if (err) return res.json({ user : user });

      res.json({status: 201, message: 'success'});
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  req.session.save(function (err) {
    if (err) return next(err);
    // res.re('/todos')
    res.json({status: 200, message: 'ok', user: req.user});
  });
});

router.get('/', (req, res) => {
  var query = User.find({});

  query.then(function(users) {
    res.json({ users: users, user: req.user})
  })
  .catch(function(err) {
    console.log(err)
  });
});

router.delete('/logout', function(req, res) {
  req.logout();
  res.json({status: 202, message: 'no content'});
});

var authorize = function(req, res, next) {
  if (!req.user || req.user._id != req.params.id) {
    res.json({status: 401, message: 'unauthorized'})
  } else {
    next()
  }
}

router.get('/:id', authorize, function(req, res) {

  var query = User.findById({_id: req.params.id})

  query.then(function(user) {
    res.json(user)
  })
  .catch(function(err) {
    res.json({message: 'nope' + err});
  });
});

module.exports = router;
