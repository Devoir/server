var TaskPrototype = {
		// instance methods
	},

	// factory
	Task = function (data) {
		var task = Object.create(TaskPrototype);
		for (var key in data)
			task[key] = data[key];
		return task;
	};

exports.getById = function (id, callback) {

};

exports.getAll = function (callback) {

};

exports.create = function (callback) {

};

exports.update = function(id, callback) {

};

exports.delete = function (id, callback) {

};