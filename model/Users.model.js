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

// TODO get rid of this.  when we have a db...
var fakeUserData = {
	email : 'fake@email.com',
	displayName: 'fakey pants'
};

exports.getById = function (id, callback) {
	var fakeUser = User(fakeUserData);

	callback(null, fakeUser);
};

exports.getAll = function (callback) {
	db.query('SELECT * FROM users', function(err, rows) {
		if (err) return callback(err);

		var users = rows.map(function(row) {
			return User(row);
		});

		callback(null, users);
	});
};

exports.create = function (data, callback) {

};

exports.update = function(id, callback) {

};

exports.delete = function (id, callback) {

};