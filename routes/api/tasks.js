//Modules
var ical =		require('ical');
var ApiError = require('../../library/ApiError.js');
var Task = require('../../model/Tasks.model.js');

exports.getForCourse = function (req, res, next) {

	if (!req.course)
		return ApiError.handle(new Error('invalid course id'), next, 400);

	var id = req.course.id;

	Task.getByCourseId(id, function(err, results) {
		if (err) {
			return ApiError.handle(err, next);
		}

		res.json(results);
	});
};

exports.create = function (req, res, next) {

	var data = req.body;

	Task.create(data, function(err, task) {
		if (err) return ApiError.handle(err, next);
		
		res.json(task);
	});
};

exports.importFromFeed = function (req, res, next) {
	var url = req.body.icalFeed;

	if (!url)
		return ApiError.handle(new Error('ical Feed not provided'), next, 400);

	// import ical feed
	ical.fromURL(url, {}, function(err, data) {
		if (err) return ApiError.handle(err, next);
		res.json(data);
	});
};

exports.getOne = function (req, res, next) {

	res.json(req.task);
};

exports.update = function (req, res, next) {
	var data = req.body;

	Task.update(data, function(err, results) {
		if (err) return ApiError.handle(err, next);
		res.end();
	});
};

exports.delete = function (req, res, next) {

	var id = req.params.taskId;
	
	Task.delete(id, function (err, results) {
		if (err) return ApiError.handle(err, next);

		res.end();
	});
};