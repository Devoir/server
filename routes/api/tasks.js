//Modules
var ical =		require('ical');
var ApiError = require('../../library/ApiError.js');

exports.getForCourse = function (req, res, next) {

	res.json({ not : 'implented'});
};

exports.create = function (req, res, next) {

	res.json({ not : 'implented'});
};

exports.importFromFeed = function (req, res, next) {
	var url = req.body.icalFeed;
	if (!url) {
		var err = new Error('icalFeed not provided');
		err.status = 400;
		return ApiError.handle(err, next);
	}

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

	res.json({ not : 'implented'});
};

exports.delete = function (req, res, next) {

	res.json({ not : 'implented'});
};