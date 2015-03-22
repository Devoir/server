//Models
var Course =	require('../../model/Courses.model.js');
var ApiError = require('../../library/ApiError.js');

exports.getForUser = function (req, res, next) {
	//TODO: check the userId matches the one in the cookie

	var data = req.body.userID;

	Course.getByUserId(data, function(err, results) {
		if (err) {
			return ApiError.handle(err, next);
		}

		res.json(results);
	});
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
	//TODO: make sure the userID matches the one in the cookie

	var data = req.body;

	Course.update(data, function(err, results) {
		if (err) {
			return ApiError.handle(err, next);
		}

		res.end();
	});
};

exports.delete = function (req, res, next) {
	//TODO: make sure the userID matches the one in the cookie

	var id = req.params.courseId;
	
	Course.delete(id, function (err, results) {
		if (err) {
			return ApiError.handle(err, next);
		}

		res.end();
	});
};