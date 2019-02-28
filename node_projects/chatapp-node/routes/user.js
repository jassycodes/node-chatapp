const express = require('express');
const user = express.Router();
const UserDB = require('../models/User');

user.get('/', function(req, res, next) {
  res.render('user');
});

user.get('/login', function(req, res, next) {
  res.render('login');
});

user.post('/login', function (req, res, next) {
	console.log("/login post")
  //expect username password
  UserDB.findOne(req.body)
  .then((user) => {
	// console.log("body", req.body)
	// console.log("found a user", user)
	// console.log("found a password", user.password)
	// console.log("html password: ", req.body.pword)

	if (user) {
	  if (req.body.pword === user.password) {
		// res.send(200, user);
		res.redirect('/user');
	  } 
	  else {
		res.send(400, {err: 'Incorrect password'});
		console("Incorrect password")
	  }
	}
  })
  .catch((err) => {
	console.log("found an error", err);
	res.send(500, err);
  });
});

user.get('/logout', function(req, res, next) {
  res.render('login');
});

user.get('/register', function(req, res, next) {
  res.render('register');
});

user.post('/register', function(req, res, next) {
	console.log("/register post")
  //expect username password
 //  UserDB.findOne(req.body)
 //  .then((user) => {
	// // console.log("body", req.body)
	// // console.log("found a user", user)
	// // console.log("found a password", user.password)
	// // console.log("html password: ", req.body.pword)
	// console.log("reg user response: ", user);
	
	// if (user === false) {
	// 	console.log("no user found");
	// 	res.redirect('/user');
	//  //  if (req.body.pword === user.password) {
	// 	// // res.send(200, user);
	// 	// res.redirect('/user');
	//  //  } 
	//  //  else {
	// 	// // res.send(400, {err: 'Incorrect password'});
	// 	// console("Created user")
	//  //  }
	// }
	// else{
	// 	console.log("username already exists");
	// }
 //  })
 //  .catch((err) => {
	// console.log("found an error", err);
	// res.send(500, err);
 //  });

  UserDB.findOne(req.body)
  .then((user) => {
	// console.log("body", req.body)
	// console.log("found a user", user)
	// console.log("found a password", user.password)
	// console.log("html password: ", req.body.pword)

	// UserDB.registerNewUser(req.body).then((user) => {
	// 	console.log("user.js -> registerNewUser ");
 //  	});
 
	if (user === false) {
		UserDB.registerNewUser(req.body).then((user) => {
			console.log("user.js -> registerNewUser ");
  		});
	}
	else{
		console.log("user already exists");
	}
  })
  .catch((err) => {
	console.log("found an error", err);
	res.send(500, err);
  });

});


// // Wildcard route
// user.get('/*', function(req, res, next) {
//   res.render('index', { title: 'Chat App' });
// });

module.exports = user;

