var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TodoSchema = require('../models/todo.js');
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({
  username: String,
  password: String,
  // todos: [TodoSchema]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
