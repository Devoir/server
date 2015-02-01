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

//////////////////
// STATIC ROUTES
//////////////////

app.get('/', function (req, res) {
	res.render('../templates/pages/home.ejs');
});

//////////////////
// API
//////////////////

var api = express.Router();
require('./routes/params.js')(api);

// USERS

app.get('/login', function (req, res) {});
app.get('/logout', function (req, res) {});

api.get('/users/', users.getAllUsers);
api.post('/users/', users.create);
api.get('/users/:user', users.getOne);
api.put('/users/:user', users.update);

// COURSES

app.get('/calendars/:id', ical.fromId);

api.get('/courses/', courses.getForUser);
api.post('/courses/', courses.create);
api.get('/courses/:course', courses.getOne);
api.put('/courses/:course', courses.update);
api.delete('/courses/:course', courses.delete);

// TASKS


// ADMIN

app.get('/admin', function (req, res) {});

app.use('/api', api);

};//END MODULE