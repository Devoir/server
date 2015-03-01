var assert = require("chai").assert;
var db = require('../library/Database.js');
var Task = require('../model/Tasks.model.js');
var Course = require('../model/Courses.model.js');
var User = require('../model/Users.model.js');

describe('Task', function () {

	var newUserId;
	var newCourseId;
	var newCourseId2;
	var newTaskId;
	var newTaskId2;
	var newTaskId3;
	var dateString = '2015/01/01';
	var dateObject = new Date("January 1, 2015 00:00:00");

	before(function(done) {
		var user = {
			email: 'teste@email.com',
			display_name: 'Test E'
		};

		User.create(user, function(err, result) {
			assert.isNull(err, 'Error: ' + err);
			assert(result.id, 'Should have gotten back an id');
			newUserId = result.id;

			var course1 = {
				name: 'CS 4000',
				color: '#cccccc',
				visible: true,
				ical_feed_url: "http://ical.com",
				user_id: newUserId
			};

			var course2 = {
				name: 'CS 5000',
				color: '#cccccc',
				visible: true,
				ical_feed_url: "http://ical.com",
				user_id: newUserId
			};

			Course.create(course1, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				assert(result.id, 'Should have gotten back an id');
				newCourseId = result.id;

				Course.create(course2, function(err, result) {
					assert.isNull(err, 'Error: ' + err);
					assert(result.id, 'Should have gotten back an id');
					newCourseId2 = result.id;

					done();
				});
			});
		});
	});

	after(function(done) {
		Course.delete(newCourseId, function(err, result) {
			assert.isNull(err, 'Error: ' + err);

			Course.delete(newCourseId2, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				
				User.delete(newUserId, function(err, result) {
					assert.isNull(err, 'Error: ' + err);
					
					done();
				});
			});
		});
	});

	describe('create', function() {
		it ('should fail creating a task with invalid course', function(done) {

			var data = {
				name: 'homework1',
				description: 'boring stuff',
				start_date: dateString,
				end_date: dateString,
				complete: false,
				visible: false,
				user_last_updated: dateString,
				ical_last_updated: dateString,
				course_id: -1
			};

			Task.create(data, function(err, result) {
				assert.isNotNull(err, 'Error: ' + err);
				done();
			});
		});

		it ('should create a task', function(done) {

			var data = {
				name: 'homework1',
				description: 'boring stuff',
				start_date: dateString,
				end_date: dateString,
				complete: false,
				visible: false,
				user_last_updated: dateString,
				ical_last_updated: dateString,
				course_id: newCourseId
			};

			Task.create(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				assert(result.id, 'Should have gotten back an id');

				newTaskId = result.id;
				done();
			});
		});

		it ('should create a second task', function(done) {

			var data = {
				name: 'homework2',
				description: 'boring stuff',
				start_date: dateString,
				end_date: dateString,
				complete: true,
				visible: true,
				user_last_updated: dateString,
				ical_last_updated: dateString,
				course_id: newCourseId
			};

			Task.create(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				assert(result.id, 'Should have gotten back an id');

				newTaskId2 = result.id;
				done();
			});
		});

		it ('should create a third task', function(done) {

			var data = {
				name: 'homework3',
				description: 'boring stuff',
				start_date: dateString,
				end_date: dateString,
				complete: true,
				visible: false,
				user_last_updated: dateString,
				ical_last_updated: dateString,
				course_id: newCourseId2
			};

			Task.create(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				assert(result.id, 'Should have gotten back an id');
				
				newTaskId3 = result.id;
				done();
			});
		});
	});

	describe('getById', function () {
		it ('should return null', function (done) {

			Task.getById(-1, function(err, course) {
				assert.isNull(err, 'Error: ' + err);
				assert.isNull(course, 'No task should have been returned')
				done();
			});
		});

		it ('should select the first task inserted', function (done) {

			var expectedResult = {
				name: 'homework1',
				description: 'boring stuff',
				start_date: dateObject,
				end_date: dateObject,
				complete: false,
				visible: false,
				user_last_updated: dateObject,
				ical_last_updated: dateObject,
				course_id: newCourseId
			};

			Task.getById(newTaskId, function(err, task) {
				assert.isNull(err, 'Error: ' + err);
				assert.equal(task.name, expectedResult.name, 'Incorrect name');
				assert.equal(task.description, expectedResult.description, 'Incorrect description');
				assert.equal(task.start_date.getTime(), expectedResult.start_date.getTime(), 'Incorrect start date');
				assert.equal(task.end_date.getTime(), expectedResult.end_date.getTime(), 'Incorrect end date');
				assert.equal(task.complete, expectedResult.complete, 'Incorrect complete');
				assert.equal(task.visible, expectedResult.visible, 'Incorrect visible');
				assert.equal(task.user_last_updated.getTime(), expectedResult.user_last_updated.getTime(), 'Incorrect user last updated');
				assert.equal(task.ical_last_updated.getTime(), expectedResult.ical_last_updated.getTime(), 'Incorrect ical last updated');
				assert.equal(task.course_id, expectedResult.course_id, 'Incorrect course id');
				done();
			});
		});

		it ('should select the second task inserted', function (done) {

			var expectedResult = {
				name: 'homework2',
				description: 'boring stuff',
				start_date: dateObject,
				end_date: dateObject,
				complete: true,
				visible: true,
				user_last_updated: dateObject,
				ical_last_updated: dateObject,
				course_id: newCourseId
			};

			Task.getById(newTaskId2, function(err, task) {
				assert.isNull(err, 'Error: ' + err);
				assert.equal(task.name, expectedResult.name, 'Incorrect name');
				assert.equal(task.description, expectedResult.description, 'Incorrect description');
				assert.equal(task.start_date.getTime(), expectedResult.start_date.getTime(), 'Incorrect start date');
				assert.equal(task.end_date.getTime(), expectedResult.end_date.getTime(), 'Incorrect end date');
				assert.equal(task.complete, expectedResult.complete, 'Incorrect complete');
				assert.equal(task.visible, expectedResult.visible, 'Incorrect visible');
				assert.equal(task.user_last_updated.getTime(), expectedResult.user_last_updated.getTime(), 'Incorrect user last updated');
				assert.equal(task.ical_last_updated.getTime(), expectedResult.ical_last_updated.getTime(), 'Incorrect ical last updated');
				assert.equal(task.course_id, expectedResult.course_id, 'Incorrect course id');
				done();
			});
		});

		it ('should select the third course inserted', function (done) {

			var expectedResult = {
				name: 'homework3',
				description: 'boring stuff',
				start_date: dateObject,
				end_date: dateObject,
				complete: true,
				visible: false,
				user_last_updated: dateObject,
				ical_last_updated: dateObject,
				course_id: newCourseId2
			};

			Task.getById(newTaskId3, function(err, task) {
				assert.isNull(err, 'Error: ' + err);
				assert.equal(task.name, expectedResult.name, 'Incorrect name');
				assert.equal(task.description, expectedResult.description, 'Incorrect description');
				assert.equal(task.start_date.getTime(), expectedResult.start_date.getTime(), 'Incorrect start date');
				assert.equal(task.end_date.getTime(), expectedResult.end_date.getTime(), 'Incorrect end date');
				assert.equal(task.complete, expectedResult.complete, 'Incorrect complete');
				assert.equal(task.visible, expectedResult.visible, 'Incorrect visible');
				assert.equal(task.user_last_updated.getTime(), expectedResult.user_last_updated.getTime(), 'Incorrect user last updated');
				assert.equal(task.ical_last_updated.getTime(), expectedResult.ical_last_updated.getTime(), 'Incorrect ical last updated');
				assert.equal(task.course_id, expectedResult.course_id, 'Incorrect course id');
				done();
			});
		});
	});

	/*describe('getByUserId', function () {
		it ('should select all courses for the specified user', function (done) {

			var expectedResult = [];
			
			expectedResult.push({
				id: newCourseId,
				name: 'CS 428',
				color: '#cccccc',
				visible: true,
				ical_feed_url: "http://ical.com",
				user_id: newUserId
			});

			expectedResult.push({
				id: newCourseId2,
				name: 'CS 498R',
				color: '#cccccc',
				visible: false,
				ical_feed_url: "http://ical.com",
				user_id: newUserId
			});

			Course.getByUserId(newUserId, function(err, courses) {
				assert.isNull(err, 'Error: ' + err);
				assert.equal(courses.length, expectedResult.length, 'Incorrect number of courses returned');

				assert.equal(courses[0].id, expectedResult[0].id, "Incorrect course id for first course");
				assert.equal(courses[0].name, expectedResult[0].name, 'Incorrect name for first course');
				assert.equal(courses[0].color, expectedResult[0].color, 'Incorrect color for first course');
				assert.equal(courses[0].visible, expectedResult[0].visible, 'Incorrect visible for first course');
				assert.equal(courses[0].ical_feed_url, expectedResult[0].ical_feed_url, 'Incorrect ical feed url for first course');
				assert.equal(courses[0].user_id, expectedResult[0].user_id, 'Incorrect user id for first course');

				assert.equal(courses[1].id, expectedResult[1].id, "Incorrect course id for second course");
				assert.equal(courses[1].name, expectedResult[1].name, 'Incorrect name for second course');
				assert.equal(courses[1].color, expectedResult[1].color, 'Incorrect color for second course');
				assert.equal(courses[1].visible, expectedResult[1].visible, 'Incorrect visible for second course');
				assert.equal(courses[1].ical_feed_url, expectedResult[1].ical_feed_url, 'Incorrect ical feed url for second course');
				assert.equal(courses[1].user_id, expectedResult[1].user_id, 'Incorrect user id for second course');

				done();
			});
		});
	});*/

	/*describe('getAll', function () {
		it ('should select all courses', function (done) {

			var expectedResult = [];
			
			expectedResult.push({
				id: newCourseId,
				name: 'CS 428',
				color: '#cccccc',
				visible: true,
				ical_feed_url: "http://ical.com",
				user_id: newUserId
			});

			expectedResult.push({
				id: newCourseId2,
				name: 'CS 498R',
				color: '#cccccc',
				visible: false,
				ical_feed_url: "http://ical.com",
				user_id: newUserId
			});

			expectedResult.push({
				id: newCourseId3,
				name: 'CS 5000',
				color: '#cccccc',
				visible: false,
				ical_feed_url: "http://ical.com",
				user_id: newUserId2
			});

			Course.getAll(function(err, courses) {
				assert.isNull(err, 'Error: ' + err);
				assert.equal(courses.length, expectedResult.length, 'Incorrect number of courses returned');

				assert.equal(courses[0].id, expectedResult[0].id, "Incorrect course id for first course");
				assert.equal(courses[0].name, expectedResult[0].name, 'Incorrect name for first course');
				assert.equal(courses[0].color, expectedResult[0].color, 'Incorrect color for first course');
				assert.equal(courses[0].visible, expectedResult[0].visible, 'Incorrect visible for first course');
				assert.equal(courses[0].ical_feed_url, expectedResult[0].ical_feed_url, 'Incorrect ical feed url for first course');
				assert.equal(courses[0].user_id, expectedResult[0].user_id, 'Incorrect user id for first course');

				assert.equal(courses[1].id, expectedResult[1].id, "Incorrect course id for second course");
				assert.equal(courses[1].name, expectedResult[1].name, 'Incorrect name for second course');
				assert.equal(courses[1].color, expectedResult[1].color, 'Incorrect color for second course');
				assert.equal(courses[1].visible, expectedResult[1].visible, 'Incorrect visible for second course');
				assert.equal(courses[1].ical_feed_url, expectedResult[1].ical_feed_url, 'Incorrect ical feed url for second course');
				assert.equal(courses[1].user_id, expectedResult[1].user_id, 'Incorrect user id for second course');

				assert.equal(courses[2].id, expectedResult[2].id, "Incorrect course id for third course");
				assert.equal(courses[2].name, expectedResult[2].name, 'Incorrect name for third course');
				assert.equal(courses[2].color, expectedResult[2].color, 'Incorrect color for third course');
				assert.equal(courses[2].visible, expectedResult[2].visible, 'Incorrect visible for third course');
				assert.equal(courses[2].ical_feed_url, expectedResult[2].ical_feed_url, 'Incorrect ical feed url for third course');
				assert.equal(courses[2].user_id, expectedResult[2].user_id, 'Incorrect user id for third course');

				done();
			});
		});
	});*/

	/*describe('update', function () {
		it ('should update the first course', function (done) {

			var data = {
				id: newCourseId,
				name: 'CS 428 Updated',
				color: '#cccccc updated',
				visible: false,
				ical_feed_url: "http://ical.com updated",
				user_id: newUserId2
			};

			Course.update(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);

				var expectedResult = data;

				Course.getById(newCourseId, function(err, course) {
					assert.isNull(err, 'Error: ' + err);
					assert.equal(course.id, expectedResult.id, 'Incorrect id');
					assert.equal(course.name, expectedResult.name, 'Incorrect name');
					assert.equal(course.color, expectedResult.color, 'Incorrect color');
					assert.equal(course.visible, expectedResult.visible, 'Incorrect visible');
					assert.equal(course.ical_feed_url, expectedResult.ical_feed_url, 'Incorrect ical feed url');
					assert.equal(course.user_id, expectedResult.user_id, 'Incorrect user id');
					done();
				});
			});
		});

		it ('should update the second course', function (done) {

			var data = {
				id: newCourseId2,
				name: 'CS 498R upated',
				color: '#cccccc updated',
				visible: false,
				ical_feed_url: "http://ical.com updated",
				user_id: newUserId
			};

			Course.update(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);

				var expectedResult = data;

				Course.getById(newCourseId2, function(err, course) {
					assert.isNull(err, 'Error: ' + err);
					assert.equal(course.id, expectedResult.id, 'Incorrect id');
					assert.equal(course.name, expectedResult.name, 'Incorrect name');
					assert.equal(course.color, expectedResult.color, 'Incorrect color');
					assert.equal(course.visible, expectedResult.visible, 'Incorrect visible');
					assert.equal(course.ical_feed_url, expectedResult.ical_feed_url, 'Incorrect ical feed url');
					assert.equal(course.user_id, expectedResult.user_id, 'Incorrect user id');
					done();
				});
			});
		});

		it ('should update the third course', function (done) {

			var data = {
				id: newCourseId3,
				name: 'CS 5000 updated ',
				color: '#cccccc updated',
				visible: false,
				ical_feed_url: "http://ical.com Updated",
				user_id: newUserId2
			};

			Course.update(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);

				var expectedResult = data;

				Course.getById(newCourseId3, function(err, course) {
					assert.isNull(err, 'Error: ' + err);
					assert.equal(course.id, expectedResult.id, 'Incorrect id');
					assert.equal(course.name, expectedResult.name, 'Incorrect name');
					assert.equal(course.color, expectedResult.color, 'Incorrect color');
					assert.equal(course.visible, expectedResult.visible, 'Incorrect visible');
					assert.equal(course.ical_feed_url, expectedResult.ical_feed_url, 'Incorrect ical feed url');
					assert.equal(course.user_id, expectedResult.user_id, 'Incorrect user id');
					done();
				});
			});
		});
	});*/

	describe('delete', function() {
		it ('should delete the first task', function (done) {
			Task.delete(newTaskId, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				
				Task.getById(newTaskId, function(err, task) {
					assert.isNull(err, 'Error: ' + err);
					assert.isNull(task, 'First task was not deleted')
					done();
				});
			});
		});

		it ('should delete the second task', function (done) {

			Task.delete(newTaskId2, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				
				Task.getById(newTaskId2, function(err, task) {
					assert.isNull(err, 'Error: ' + err);
					assert.isNull(task, 'Second task was not deleted')
					done();
				});
			});
		});

		it ('should delete the third task', function (done) {

			Task.delete(newTaskId3, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				
				Task.getById(newTaskId3, function(err, task) {
					assert.isNull(err, 'Error: ' + err);
					assert.isNull(task, 'Third task was not deleted')
					done();
				});
			});
		});
	});
});