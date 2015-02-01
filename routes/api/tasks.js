//Modules
var ical =		require('ical');

exports.getForCourse = function (req, res) {

	res.json({ not : 'implented'});
};

exports.create = function (req, res) {

	res.json({ not : 'implented'});
};

exports.importFromFeed = function (req, res) {
	var url = req.body.icalFeed;
	if (!url) {
		res.status(400).send('icalFeed not provided');
	}

	// import ical feed
	ical.fromURL(url, {}, function(err, data) {
		if (err) return res.status(500).send('Something broke!');
		res.json(data);
	});
};

exports.getOne = function (req, res) {

	res.json(req.task);
};

exports.update = function (req, res) {

	res.json({ not : 'implented'});
};

exports.delete = function (req, res) {

	res.json({ not : 'implented'});
};