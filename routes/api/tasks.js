//Modules
var ical =		require('ical');
var ApiError = require('../../library/ApiError.js');
var Task = require('../../model/Tasks.model.js');

exports.getForCourse = function (req, res, next) {

	res.json({ not : 'implented'});
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

		var tempId;
		var userLastUpdated = new Date();
		var result = [];

		for (var property in data) {
			var item = data[property];
			
			var temp = {};
			temp.name = item.summary;
			temp.description = item.description;
			temp.start_date = new Date(Date.parse(item.start)).toISOString();
			
			if (item.end) {
				temp.end_date = new Date(Date.parse(item.end)).toISOString();
			}
			else {
				temp.end_date = item.end;
			}

			temp.complete = false;
			temp.visible = true;
			temp.user_last_updated = userLastUpdated.toISOString();
			temp.ical_last_updated = userLastUpdated.toISOString();
			temp.course_id = req.params.courseId;

			result.push(temp);
		}

		for (var i = 0; i < result.length; ++i) {

			Task.create(result[i], function(err, results) {
				if (err) {
					return ApiError.handle(err, next);
				}

				tempId = results.id;
			});

			result[i].id = tempId;
		}

		res.json(result);
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