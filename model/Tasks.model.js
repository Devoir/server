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

var fakeTaskData = {
	name: 'homework',
	description: 'boring stuff',
	start: 'today',
	end: 'tomorrow'
};

exports.getById = function (id, callback) {
	var fakeTask = Task(fakeTaskData);
	callback(null, fakeTask);
};

exports.getAll = function (callback) {

};

exports.create = function (callback) {

};

exports.update = function(id, callback) {

};

exports.delete = function (id, callback) {

};