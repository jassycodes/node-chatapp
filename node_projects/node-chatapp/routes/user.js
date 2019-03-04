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

  	console.log("user.js -> loadAllMessages")
  	// console.log("messages", messages);
  	// // messagesObj = messages ;
  	// console.log("messagesObj", messagesObj);
  	// console.log("typeof: ", typeof messagesObj);
  	// rand = 1;
  	// console.log("rand1: ", rand);


  	// console.log("messagesObj['RowDataPacket']: ", messagesObj['RowDataPacket']);
  	// console.log("json: ", JSON.parse(JSON.stringify(messages)));
  	messagesObj = JSON.parse(JSON.stringify(messages));
 //  	// console.log("typeof: ", typeof messagesObj);
 //  	size = Object.keys(messagesObj).length;
 //  	console.log("size: ", size);
 //  	// JSON.parse(JSON.stringify(messagesObj))
	// console.log("Starting FOR LOOP");
	// for (var index in messagesObj) {
	//     if (messagesObj.hasOwnProperty(index)) {
	//         console.log(index + " -> " + messagesObj[index].message);
	//     }
	// }

	// res.render('user', {currentUser: req.cookies.currentUser, messagesInfo: messagesObj});
	res.send(200, messagesObj);
	// console.log("typeof: ", typeof messagesObj);
	// res.status(200).send(messagesObj)
	// return messagesObj;
	// res.end(JSON.stringify(messagesObj));
	// res.send("hello");
 
  })
  .catch((err) => {
	console.log("found an error", err);
	res.send(500, err);
  });

  console.log('getting messages', messagesObj);

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
	// console.log("body", req.body)
	// console.log("found a user", user)
	// console.log("found a password", user.password)
	// console.log("html password: ", req.body.pword)

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


// // Wildcard route
// user.get('/*', function(req, res, next) {
//   res.render('index', { title: 'Chat App' });
// });

module.exports = user;

