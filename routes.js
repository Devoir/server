//////////////////////
// LOAD DEPENDENCIES
//////////////////////
var express		= require('express');

// controllers
var users		= require('./routes/api/users.js');
var tasks		= require('./routes/api/tasks.js');
var courses		= require('./routes/api/courses.js');

var staticPages = require('./routes/static/public.js');

module.exports = function (app, passport) {

///////////////
// MIDDLEWARE
///////////////

var middleware = require('./routes/middleware.js');
var authUser = middleware.authUser;

//////////////////
// STATIC ROUTES
//////////////////

app.get('/', staticPages.home);
app.get('/taskview', staticPages.taskView);

//////////////////
// API
//////////////////

var api = express.Router();
require('./routes/params.js')(api);

app.get('/auth/google', passport.authenticate('google', 
	{ scope: [
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email'] }),
	function (req, res) {
	    // The request will be redirected to Google for authentication, so this
    	// function will not be called.
	}
);

app.get('/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/' }),
	function(req, res) {
		console.log("Google sent us something (get)");
		res.redirect('/taskview');
	}
);

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

// USERS

api.get('/users/', users.getAllUsers);
api.post('/users/', users.create);
api.get('/users/:user', users.getOne);
api.put('/users/:user', users.update);

// COURSES

api.get('/courses/', courses.getForUser);
api.post('/courses/', courses.create);
api.get('/courses/:course', courses.getOne);
api.put('/courses/:course', courses.update);
api.delete('/courses/:course', courses.delete);

// TASKS

api.get('/courses/:course/tasks', tasks.getForCourse);
api.post('/courses/:course/tasks', tasks.create);
api.post('/courses/:course/tasks/import', tasks.importFromFeed);

api.get('/tasks/:task', tasks.getOne);
api.put('/tasks/:task', tasks.update);
api.delete('/tasks/:task', tasks.delete);

// ADMIN

app.get('/admin', function (req, res) {});

app.use('/api', api);

};//END MODULE