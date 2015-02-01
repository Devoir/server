//Models
var Course =	require('../../model/Courses.model.js');

exports.getForUser = function (req, res) {
	
	res.json({ not: 'implemented'});
};

exports.create = function (req, res) {
	var data = req.body;

	Course.create(data, function (err, course) {
		if (err) return res.status(500).send('Something broke!');

		res.json(course);
	});
};

exports.getOne = function (req, res) {
	
	res.json(req.course);
};

exports.update = function (req, res) {
	
	res.json({ not: 'implemented'});
};

exports.delete = function (req, res) {
	
	res.json({ not: 'implemented'});
};