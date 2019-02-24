const express = require('express');
const user = express.Router();

user.get('/', function(req, res, next) {
  res.render('user');
});

user.get('/login', function(req, res, next) {
  res.render('login');
});

user.get('/logout', function(req, res, next) {
  res.render('login');
});

user.get('/register', function(req, res, next) {
  res.render('register');
});

module.exports = user;