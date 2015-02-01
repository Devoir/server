var CoursePrototype = {
		// instance methods
	},

	// factory
	Course = function (data) {
		var course = Object.create(CoursePrototype);
		for (var key in data)
			course[key] = data[key];
		return course;
	};

var fakeCourseData = {
	name: 'cs 498R',
	description: 'javascript',
	color: '#cccccc'
};

exports.getById = function (id, callback) {
	fakeCourseData.id = id;
	var fakeCourse = Course(fakeCourseData);
	console.log(fakeCourse);
	callback(null, fakeCourse);
};

exports.getAll = function (callback) {

};

exports.create = function (data, callback) {

	//validate the data

	//insert a row into the DB

	//return a Course object
	var newCourse = Course(data);

	callback(null, newCourse);
};

exports.update = function(id, callback) {

};

exports.delete = function (id, callback) {

};