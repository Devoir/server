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
		for (var key in data)
			user[key] = data[key];
		return user;
	};

////////////////
// PUBLIC
////////////////

exports.getById = function (id, callback) {
	db.query('SELECT * FROM users WHERE id = $1', [id], function(err, rows) {
		if (err) return callback(err);

		var user = (rows.length) ? User(rows[0]) : null;

		callback(null, user);
	});
};

exports.getByEmail = function (email, callback) {
	db.query('SELECT * FROM users WHERE email = $1', [email], function(err, rows) {
		if (err) return callback(err);

		var user = (rows.length) ? User(rows[0]) : null;

		callback(null, user);
	});
};

exports.getAll = function (callback) {
	db.query('SELECT * FROM users', [], function(err, rows) {
		if (err) return callback(err);

		var users = rows.map(function(row) {
			return User(row);
		});

		callback(null, users);
	});
};

exports.create = function (data, callback) {

	var q = 'INSERT INTO users (email, display_name) VALUES ( $1, $2 ) RETURNING id';
	//FUTURE
	//if no email or displayName return an error
	var values = [data.email, data.displayName];
	db.query(q, values, function (err, result) {
		if (err) return callback(err);

		callback(null, result[0]);
	});
};

exports.update = function(id, callback) {

};

exports.delete = function (id, callback) {
	var q = 'DELETE FROM users WHERE id = $1';
	db.query(q, [id], callback);
};