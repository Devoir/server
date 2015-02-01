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

	var fakeUser = User(fakeUserData);
	
	callback(null, [fakeUser]);
};

exports.create = function (callback) {

};

exports.update = function(id, callback) {

};

exports.delete = function (id, callback) {

};