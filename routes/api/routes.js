//////////////////
// API
//////////////////

var express = require('express');
var users = require('./users.js');
var tasks = require('./tasks.js');
var courses = require('./courses.js');

module.exports = function (app) {

	var api = express.Router();
	require('../params.js')(api);

	// AUTHENTICATION
	// api.use(function (req, res, next) {
	// 	if (req.isAuthenticated()) return next();
		
	// 	res.statusCode = 401;
	// 	res.end();
	// });

	// USERS

	api.get('/users/', users.getAllUsers);
	// api.post('/users/', users.create);
	api.get('/users/:user', users.getOne);
	api.put('/users/:user', users.update);

	// COURSES

	api.get('/courses/', courses.getForUser);
	api.post('/courses/', courses.create);
	api.get('/courses/:course', courses.getOne);
	api.put('/courses/:course', courses.update);
	api.delete('/courses/:courseId', courses.delete);

	// TASKS

	api.get('/courses/:course/tasks', tasks.getForCourse);
	api.post('/courses/:course/tasks', tasks.create);
	api.post('/courses/:course/tasks/import', tasks.importFromFeed);

	api.get('/tasks/:task', tasks.getOne);
	api.put('/tasks/:task', tasks.update);
	api.delete('/tasks/:taskId', tasks.delete);

	// ADMIN

	// ERROR HANDLING MIDDLEWARE
	api.use(function (err, req, res, next) {
		console.log('//-----------------Error-----------------//');
		console.error(err);
		console.error(err.stack);
		console.log('^-----------------------------------------^');
		//TODO email the admins
		//TODO get more creative here.
		var status = err.status || 500;
		res.status(status).send(err.message || 'Something broke!');
	});

	app.use('/api', api);
}