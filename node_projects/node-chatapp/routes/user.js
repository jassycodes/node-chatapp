const express = require('express');
const user = express.Router();
const UserDB = require('../models/User');
const cheerio = require('cheerio');
const request = require('request');

user.get('/', function(req, res, next) {	

// console.log("req.cookies.currentUser: ", req.cookies.currentUser);
	// res.render('user', {currentUser: req.cookies.currentUser});

	var messagesObj = null;
	var rand;
	console.log("rand0: ", rand);
	var size = 0;

  UserDB.loadAllMessages()
  .then((messages) => {

  	console.log("user.js -> loadAllMessages")
  	messagesObj = JSON.parse(JSON.stringify(messages));

	res.render('user', {currentUser: req.cookies.currentUser, messagesInfo: messagesObj});
 
  })
  .catch((err) => {
	console.log("found an error", err);
	res.send(500, err);
  });
  
});

user.get('/successget', function(req, res, next) {	
	console.log('/successget');

	res.send(200, "it works - src: server");
});

user.get('/getchats', function(req, res, next) {	
	
	var messagesObj = null;
	var rand;
	console.log("rand0: ", rand);
	var size = 0;

  UserDB.loadAllMessages()
  .then((messages) => {

  	console.log("user.js -> loadAllMessages");
  	messagesObj = JSON.parse(JSON.stringify(messages));

	res.send(200, messagesObj);
 
  })
  .catch((err) => {
	console.log("found an error", err);
	res.send(500, err);
  });

  console.log('getting messages', messagesObj);

 });

user.get('/clearchats', function(req, res, next) {	
	console.log("user.js -> deletechats");

	res.send(200, "clear chats");
});

user.get('/welcome', function(req, res){ 
  res.render('welcome',{user:"John Smith"});
}); 

var counter = 0;
user.get('/login', function(req, res, next) {

  res.cookie('counter', ++counter);

    if (!req.cookies.counter) {
        console.log('This is your first visit!');
    } else {
        console.log('This is visit number '+ req.cookies.counter +'!');
    }

    res.render('login',{loginError: ''});
});

// var currentUser = "null";

user.post('/login', function (req, res, next) {
	console.log("/login post")
  //expect username password
  UserDB.findOne(req.body)
  .then((user) => {

	if (user) {
	  if (req.body.pword === user.password) {
		// res.send(200, user);
		console.log("req.cookies.currentUser: ", req.cookies.currentUser);
		res.cookie('currentUser', user.username);
		console.log("req.cookies.currentUser: ", req.cookies.currentUser);
		res.redirect('/user');
		// res.render('user', {currentUser: user.username});
		// res.render('login',{loginError: "success"});
	  } 
	  else {
		// res.send(400, {err: 'Incorrect password'});
		var loginErr = "Incorrect password";
		console.log(loginErr)
		// return 
		// res.json({loginError: "Incorrect password"});
		res.render('login',{loginError: "Incorrect password"});
	  }
	}
  })
  .catch((err) => {
	console.log("found an error", err);
	res.send(500, err);
  });
});

user.get('/logout', function(req, res, next) {
	console.log("/logout");
	// res.clearCookie("currentUser");
	// console.log("req.cookies.currentUser: ", req.cookies.currentUser);
  res.redirect('/user/login');
});

user.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register Page', registerError: '' });
});

user.post('/register', function(req, res, next) {
	console.log("/register post")

  UserDB.findOne(req.body)
  .then((user) => {
 
	if (user === false) {
		UserDB.registerNewUser(req.body).then((user) => {
			console.log("user.js -> registerNewUser ");
  		});
	}
	else{
		console.log("user already exists");
		var regStats = "user already exists";
		res.render('register',{registerError: regStats});
	}
  })
  .catch((err) => {
	console.log("found an error", err);
	res.send(500, err);
  });

});

user.post('/sendtochatbox', function(req, res, next) {
  console.log("/sendtochatbox");
  console.log("req.cookies.currentUser " + req.cookies.currentUser);
  console.log("req:" + req);
  console.log("req body:" + req.body);
  console.log("req body message:" + req.body.message);
  // UserDB.sendMessage(req.body);
    UserDB.sendMessage(req.body, req.cookies.currentUser).then((message, user) => {
 
	if (user) {
		console.log("Message sent!");
	}
	else{
		console.log("ERROR");
	}
  })
  .catch((err) => {
	console.log("found an error", err);
	res.send(500, err);
  });

});

user.get('/getuserlist', function(req, res, next) {	
	console.log('/getuserlist');

	var usersInfo = null;

  UserDB.getUserList()
  .then((userList) => {

  	console.log("user.js -> getUserList");
  	usersInfo = JSON.parse(JSON.stringify(userList));

	res.send(200, usersInfo);
 
  })
  .catch((err) => {
	console.log("found an error", err);
	res.send(500, err);
  });

  console.log('getting users', usersInfo);

 });

module.exports = user;

