var db = require('../library/Database.js');

var CoursePrototype = {
		// instance methods
	},

	// factory
	Course = function (data) {
		var course = Object.create(CoursePrototype);
		
		for (var key in data) {
			course[key] = data[key];
		}
		
		return course;
	};

exports.getById = function (id, callback) {
	db.query('SELECT * FROM courses WHERE id = $1', [id], function(err, rows) {

		if (err) {
			return callback(err);
		}

		var course = (rows.length) ? Course(rows[0]) : null;
		callback(null, course);
	});
};

exports.getByUserId = function (user_id, callback) {
	db.query('SELECT * FROM courses WHERE user_id = $1', [user_id], function(err, rows) {
		
		if (err) {
			return callback(err);
		}

		var courses = rows.map(function(row) {
			return Course(row);
		});

		callback(null, courses);
	});
};

exports.getAll = function (callback) {
	db.query('SELECT * FROM courses', [], function(err, rows) {
		
		if (err) {
			return callback(err);
		}

		var courses = rows.map(function(row) {
			return Course(row);
		});

		callback(null, courses);
	});
};

exports.create = function (data, callback) {

	//TODO: validate data
	
	var q = 'INSERT INTO courses (name, color, visible, ical_feed_url, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id';
	var values = [data.name, data.color, data.visible, data.ical_feed_url, data.user_id];
	
	db.query(q, values, function (err, result) {

		if (err) {
			return callback(err);
		}

		callback(null, result[0]);
	});
};

exports.update = function(data, callback) {
	var query = 'UPDATE courses SET name = $1, color = $2, visible = $3, ical_feed_url = $4, user_id = $5 WHERE id = $6';
	var values = [data.name, data.color, data.visible, data.ical_feed_url, data.user_id, data.id];
	db.query(query, values, callback);
};

exports.delete = function (id, callback) {
	var query = 'DELETE FROM courses WHERE id = $1';
	db.query(query, [id], callback);
};