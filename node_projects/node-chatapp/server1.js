const express = require('express'); //calls for the express node package
const app = express();
const port = 3000; //port we're using. http://127.0.0.1:3000/

// app.get('/', (req, res) => res.send('Hello World!')); //sending "Hello World to / route"
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); //logs to the console (terminal)