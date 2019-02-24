//use the modules of node
var express = require('express');

var path = require('path');

var logger = require('morgan');
/*
Morgan is another HTTP request logger middleware for Node.js. It simplifies the process of 
logging requests to your application. You might think of Morgan as a helper that collects 
logs from your server, such as your request logs. It saves developers time because they 
don't have to manually create common logs.
*/

var bodyParser = require('body-parser'); /*body-parser extract the entire body portion of an incoming request stream and exposes it on req.body*/
var cookieParser = require('cookie-parser'); /*cookie-parser is a middleware which parses cookies attached to the client request object. */
var port = 3000; //specify the port number
var routes = require('./routes/index'); // determine the route
var user = require('./routes/user'); //requires user module from user.js
var app = express(); //a module framework used for Node and most commonly used as a web application for node js.
//use the modules
app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes);
app.use('/user', user);

//listen to the port
app.listen(port, function() {
  console.log('Listening in on port: ' + port);
  console.log('http://localhost:' + port + "/");
});

module.exports = app; /*module.exports is an object that the current module returns when it is "required" in another program or module*/