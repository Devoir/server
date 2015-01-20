//Modules
var ical = require('ical');

var Ical = {};

Ical.fromId = function (req, res) {
	var id = decodeURIComponent(req.params.id);

	// https://learningsuite.byu.edu/iCalFeed/ical.php?courseID=GGC-K5hHAoZM
	var url = id;

	console.log('ical url', url);

	ical.fromURL(url, {}, function(err, data) {
		if (err) {
			return res.status(500).send({ error: 'something blew up' });
		}

		res.json(data);
	});
};

module.exports = Ical;