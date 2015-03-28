//Models
var Course =	require('../../model/Courses.model.js');
var ApiError = require('../../library/ApiError.js');

/*
/	Returns all of the courses belonging to the specified user.
*/
exports.getForUser = function (req, res, next) {
	//TODO: check the userId matches the one in the cookie
	
	var id = req.body.userID || req.userID;

	Course.getByUserId(id, function(err, results) {
		if (err) {
			return ApiError.handle(err, next);
		}

		res.json(results);
	});
};

/*
/	Creates a new course.
*/
exports.create = function (req, res, next) {
	var data = req.body;

	Course.create(data, function (err, course) {
		if (err) {
			return ApiError.handle(err, next);
		}

		res.json(course);
	});
};

/*
/	Imports a course from an iCalender feed URL.
*/
/*exports.importFromFeed = function (req, res, next) {
	var data = req.body;

	var url = req.body.ical_feed_url;

	if (url) {
		// import ical feed
		ical.fromURL(url, {}, function(err, tasks) {
			
			if (err) {
				return ApiError.handle(err, next);
			}

			Course.create(data, function (err, courseID) {
				if (err) {
					return ApiError.handle(err, next);
				}

				data.id = courseID;

				var result = {};
				result.course = data;
				result.tasks = tasks;

				console.log(result);
				res.json(result);
			});
		});
	}
};*/

/*
/	Returns the course matching the given ID. See params.js.
*/
exports.getOne = function (req, res, next) {
	res.json(req.course);
};

/*
/	Updates the specified course.
*/
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

/*
/	Deletes the specified course.
*/
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