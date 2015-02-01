var UserPrototype = {
		//instance methods
		isAdmin : function () {
			//FUTURE
			return false;
		}
	},

	User = function (email, displayName) {
		var user = Object.create(UserPrototype);
		user.email = email;
		user.displayName = displayName;
		return user;
	};

////////////////
//PUBLIC
////////////////

exports.getById = function (id) {

};

exports.getAll = function (callback) {
	var newUser = User('fake@email.com', 'fakey pants');
	console.log(newUser.isAdmin());
	callback(null, [newUser]);
};

exports.create = function () {

};

exports.update = function(id) {

};

exports.delete = function (id) {

};