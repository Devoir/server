var db = require('../library/Database.js');

var UserPrototype = {
		// instance methods
		isAdmin : function () {
			//FUTURE
			return false;
		}
	},

	// user factory
	User = function (data) {
		var user = Object.create(UserPrototype);

		for (var key in data) {
			user[key] = data[key];
		}

		return user;
	};

////////////////
// PUBLIC
////////////////

exports.getById = function (id, callback) {

	var query = {
		name: 'Users getById',
		text: 'SELECT * FROM users WHERE id = $1',
		values: [id]
	}

	db.preparedQuery(query, function(err, rows) {

		if (err) {
			return callback(err);
		}

		var user = (rows.length) ? User(rows[0]) : null;
		callback(null, user);
	});
};

exports.getByEmail = function (email, callback) {

	var query = {
		name: 'Users getByEmail',
		text: 'SELECT * FROM users WHERE email = $1',
		values: [email]
	}
	
	db.preparedQuery(query, function(err, rows) {

		if (err) {
			return callback(err);
		}

		var user = (rows.length) ? User(rows[0]) : null;
		callback(null, user);
	});
};

exports.getAll = function (callback) {
	
	db.query('SELECT * FROM users', function(err, rows) {

		if (err) {
			return callback(err);
		}

		var users = rows.map(function(row) {
			return User(row);
		});

		callback(null, users);
	});
};

exports.create = function (data, callback) {

	//TODO: validate data

	var query = {
		name: 'Users create',
		text: 'INSERT INTO users (email, display_name) VALUES ( $1, $2 ) RETURNING id',
		values: [data.email, data.display_name]
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
		name: 'Users update',
		text: 'UPDATE users SET email = $1, display_name = $2 WHERE id = $3',
		values: [data.email, data.display_name, data.id]
	}

	db.preparedQuery(query, callback);
};

exports.delete = function (id, callback) {

	var query = {
		name: 'Users delete',
		text: 'DELETE FROM users WHERE id = $1',
		values: [id]
	}

	db.preparedQuery(query, callback);
};