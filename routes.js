//////////////////////
// LOAD DEPENDENCIES
//////////////////////

var express		= require('express');
var ical		= require('./library/ical.js');

// controllers
var users		= require('./routes/api/users.js');
var tasks		= require('./routes/api/tasks.js');
var courses		= require('./routes/api/courses.js');

module.exports = function (app, passport) {

///////////////
// MIDDLEWARE
///////////////

// var middleware = require('./routes/middleware.js');

/////////////////////
// ROUTE PARAMETERS
/////////////////////

// require('./routes/params.js')(app);


//////////////////
// STATIC ROUTES
//////////////////

app.get('/', function (req, res) {
	res.render('../templates/pages/home.ejs');
});

//////////////////
// API
//////////////////

// USERS

app.get('/login', function (req, res) {});

app.get('/logout', function (req, res) {});

var usersApi = express.Router();

usersApi.get('/', users.getAllUsers);
usersApi.post('/', users.create);
usersApi.get('/:user', users.getOne);
usersApi.put('/:user', users.update);

app.use('/api/users', usersApi);

// COURSES

app.get('/calendars/:id', ical.fromId);

var coursesApi = express.Router();

app.use('/api/courses', coursesApi);

// TASKS

var tasksApi = express.Router();

app.use('/api/courses/:course/tasks', tasksApi);

// ADMIN

app.get('/admin', function (req, res) {});

};//END MODULE