//Models
var Course =	require('../../model/Courses.model.js');
var ApiError = require('../../library/ApiError.js');

exports.getForUser = function (req, res, next) {
	
	res.json({ not: 'implemented'});
};

exports.create = function (req, res, next) {
	var data = req.body;

	Course.create(data, function (err, course) {
		if (err) return ApiError.handle(err, next);

		res.json(course);
	});
};

exports.getOne = function (req, res, next) {
	
	res.json(req.course);
};

exports.update = function (req, res, next) {
	var data = req.body;

	Course.update(data, function(err, results) {
		if (err) return ApiError.handle(err, next);

		res.end();
	});
};

exports.delete = function (req, res, next) {
	var id = req.params.courseId;
	
	Course.delete(id, function (err, results) {
		if (err) return ApiError.handle(err, next);

		res.end();
	});
};