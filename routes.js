
// LOAD DEPENDENCIES
var express		= require('express');

// controllers
var users		= require('./routes/api/users.js');
var tasks		= require('./routes/api/tasks.js');
var courses		= require('./routes/api/courses.js');

var staticPages = require('./routes/static/public.js');

module.exports = function (app, passport) {


// STATIC ROUTES

app.get('/', staticPages.home);
app.get('/taskview', staticPages.taskView);
// app.get('/admin', function (req, res) {});
app.get('/calendar',staticPages.calendar);


// AUTHENTICATION

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


// API

require('./routes/api/routes.js')(app);


};//END MODULE
