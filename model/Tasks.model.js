var db = require('../library/Database.js');

var TaskPrototype = {
		// instance methods
	},

	// factory
	Task = function (data) {
		var task = Object.create(TaskPrototype);

		for (var key in data) {
			task[key] = data[key];
		}

		return task;
	};

exports.getById = function (id, callback) {

	var query = {
		name: 'Tasks getById',
		text: 'SELECT * FROM tasks WHERE id = $1',
		values: [id]
	}

	db.preparedQuery(query, function(err, rows) {

		if (err) {
			return callback(err);
		}

		var task = (rows.length) ? Task(rows[0]) : null;
		callback(null, task);
	});
};

exports.getByCourseId = function (course_id, callback) {

	var query = {
		name: 'Tasks getByCourseId',
		text: 'SELECT * FROM tasks WHERE course_id = $1',
		values: [course_id]
	}

	db.preparedQuery(query, function(err, rows) {
		
		if (err) {
			return callback(err);
		}

		var tasks = rows.map(function(row) {
			return Task(row);
		});

		callback(null, tasks);
	});
};

/*exports.getByUserId = function (id, callback) {

};*/

exports.getAll = function (callback) {
	
	db.query('SELECT * FROM tasks', function(err, rows) {
		
		if (err) {
			return callback(err);
		}

		var tasks = rows.map(function(row) {
			return Task(row);
		});

		callback(null, tasks);
	});
};

exports.create = function (data, callback) {
	
	//TODO: validate data

	var query = {
		name: 'Tasks create',
		text: 'INSERT INTO tasks (name, description, start_date, end_date, complete, visible, user_last_updated, ical_last_updated, course_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
		values: [data.name, data.description, data.start_date, data.end_date, data.complete, data.visible, data.user_last_updated, data.ical_last_updated, data.course_id]
	}
	
	db.preparedQuery(query, function (err, result) {

		if (err) {
			return callback(err);
		}

		callback(null, result[0]);
	});
};

exports.update = function(data, callback) {

	var query = {
		name: 'Tasks update',
		text: 'UPDATE tasks SET name = $1, description = $2, start_date = $3, end_date = $4, complete = $5, visible = $6, user_last_updated = $7, ical_last_updated = $8, course_id = $9 WHERE id = $10',
		values: [data.name, data.description, data.start_date, data.end_date, data.complete, data.visible, data.user_last_updated, data.ical_last_updated, data.course_id, data.id]
	}

	db.preparedQuery(query, callback);
};

exports.delete = function (id, callback) {

	var query = {
		name: 'Tasks delete',
		text: 'DELETE FROM tasks WHERE id = $1',
		values: [id]
	}

	db.preparedQuery(query, callback);
};