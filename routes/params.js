// models 
var User =		require('../model/Users.model.js');
var Task =		require('../model/Tasks.model.js');
var Course =	require('../model/Courses.model.js');

module.exports = function (app) {

	app.param('user', function (req, res, next, id) {
		User.getById(id, function (err, user) {
			if (err) return next(err);
			req.user = user;
			next();
		});
	});

	app.param('task', function (req, res, next, id) {
		Task.getById(id, function (err, task) {
			if (err) return next(err);
			req.task = task;
			next();
		});
	});

	app.param('course', function (req, res, next, id) {
		Course.getById(id, function (err, course) {
			if (err) return next(err);
			req.course = course;
			next();
		});
	});
};