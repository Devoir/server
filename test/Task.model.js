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
	var dateStringUpdated = '2015/05/05';
	var dateObjectUpdated = new Date("May 5, 2015 00:00:00");

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

			Task.getById(-1, function(err, task) {
				assert.isNull(err, 'Error: ' + err);
				assert.isNull(task, 'No task should have been returned')
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

		it ('should select the third task inserted', function (done) {

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

	describe('getByCourseId', function () {
		it ('should select all tasks for the specified course', function (done) {

			var expectedResult = [];
			
			expectedResult.push({
				id: newTaskId,
				name: 'homework1',
				description: 'boring stuff',
				start_date: dateObject,
				end_date: dateObject,
				complete: false,
				visible: false,
				user_last_updated: dateObject,
				ical_last_updated: dateObject,
				course_id: newCourseId
			});

			expectedResult.push({
				id: newTaskId2,
				name: 'homework2',
				description: 'boring stuff',
				start_date: dateObject,
				end_date: dateObject,
				complete: true,
				visible: true,
				user_last_updated: dateObject,
				ical_last_updated: dateObject,
				course_id: newCourseId
			});

			Task.getByCourseId(newCourseId, function(err, tasks) {
				assert.isNull(err, 'Error: ' + err);
				assert.equal(tasks.length, expectedResult.length, 'Incorrect number of tasks returned');

				assert.equal(tasks[0].name, expectedResult[0].name, 'Incorrect name for first task');
				assert.equal(tasks[0].description, expectedResult[0].description, 'Incorrect description for first task');
				assert.equal(tasks[0].start_date.getTime(), expectedResult[0].start_date.getTime(), 'Incorrect start date for first task');
				assert.equal(tasks[0].end_date.getTime(), expectedResult[0].end_date.getTime(), 'Incorrect end date for first task');
				assert.equal(tasks[0].complete, expectedResult[0].complete, 'Incorrect complete for first task');
				assert.equal(tasks[0].visible, expectedResult[0].visible, 'Incorrect visible for first task');
				assert.equal(tasks[0].user_last_updated.getTime(), expectedResult[0].user_last_updated.getTime(), 'Incorrect user last updated for first task');
				assert.equal(tasks[0].ical_last_updated.getTime(), expectedResult[0].ical_last_updated.getTime(), 'Incorrect ical last updated for first task');
				assert.equal(tasks[0].course_id, expectedResult[0].course_id, 'Incorrect course id for first task');

				assert.equal(tasks[1].name, expectedResult[1].name, 'Incorrect name for second task');
				assert.equal(tasks[1].description, expectedResult[1].description, 'Incorrect description for second task');
				assert.equal(tasks[1].start_date.getTime(), expectedResult[1].start_date.getTime(), 'Incorrect start date for second task');
				assert.equal(tasks[1].end_date.getTime(), expectedResult[1].end_date.getTime(), 'Incorrect end date for second task');
				assert.equal(tasks[1].complete, expectedResult[1].complete, 'Incorrect complete for second task');
				assert.equal(tasks[1].visible, expectedResult[1].visible, 'Incorrect visible for second task');
				assert.equal(tasks[1].user_last_updated.getTime(), expectedResult[1].user_last_updated.getTime(), 'Incorrect user last updated for second task');
				assert.equal(tasks[1].ical_last_updated.getTime(), expectedResult[1].ical_last_updated.getTime(), 'Incorrect ical last updated for second task');
				assert.equal(tasks[1].course_id, expectedResult[1].course_id, 'Incorrect course id for second task');

				done();
			});
		});
	});

	describe('getAll', function () {
		it ('should select all tasks', function (done) {

			var expectedResult = [];
			
			expectedResult.push({
				id: newTaskId,
				name: 'homework1',
				description: 'boring stuff',
				start_date: dateObject,
				end_date: dateObject,
				complete: false,
				visible: false,
				user_last_updated: dateObject,
				ical_last_updated: dateObject,
				course_id: newCourseId
			});

			expectedResult.push({
				id: newTaskId2,
				name: 'homework2',
				description: 'boring stuff',
				start_date: dateObject,
				end_date: dateObject,
				complete: true,
				visible: true,
				user_last_updated: dateObject,
				ical_last_updated: dateObject,
				course_id: newCourseId
			});

			expectedResult.push({
				id: newTaskId3,
				name: 'homework3',
				description: 'boring stuff',
				start_date: dateObject,
				end_date: dateObject,
				complete: true,
				visible: false,
				user_last_updated: dateObject,
				ical_last_updated: dateObject,
				course_id: newCourseId2
			});

			Task.getAll(function(err, tasks) {
				assert.isNull(err, 'Error: ' + err);
				assert.equal(tasks.length, expectedResult.length, 'Incorrect number of tasks returned');

				assert.equal(tasks[0].name, expectedResult[0].name, 'Incorrect name for first task');
				assert.equal(tasks[0].description, expectedResult[0].description, 'Incorrect description for first task');
				assert.equal(tasks[0].start_date.getTime(), expectedResult[0].start_date.getTime(), 'Incorrect start date for first task');
				assert.equal(tasks[0].end_date.getTime(), expectedResult[0].end_date.getTime(), 'Incorrect end date for first task');
				assert.equal(tasks[0].complete, expectedResult[0].complete, 'Incorrect complete for first task');
				assert.equal(tasks[0].visible, expectedResult[0].visible, 'Incorrect visible for first task');
				assert.equal(tasks[0].user_last_updated.getTime(), expectedResult[0].user_last_updated.getTime(), 'Incorrect user last updated for first task');
				assert.equal(tasks[0].ical_last_updated.getTime(), expectedResult[0].ical_last_updated.getTime(), 'Incorrect ical last updated for first task');
				assert.equal(tasks[0].course_id, expectedResult[0].course_id, 'Incorrect course id for first task');

				assert.equal(tasks[1].name, expectedResult[1].name, 'Incorrect name for second task');
				assert.equal(tasks[1].description, expectedResult[1].description, 'Incorrect description for second task');
				assert.equal(tasks[1].start_date.getTime(), expectedResult[1].start_date.getTime(), 'Incorrect start date for second task');
				assert.equal(tasks[1].end_date.getTime(), expectedResult[1].end_date.getTime(), 'Incorrect end date for second task');
				assert.equal(tasks[1].complete, expectedResult[1].complete, 'Incorrect complete for second task');
				assert.equal(tasks[1].visible, expectedResult[1].visible, 'Incorrect visible for second task');
				assert.equal(tasks[1].user_last_updated.getTime(), expectedResult[1].user_last_updated.getTime(), 'Incorrect user last updated for second task');
				assert.equal(tasks[1].ical_last_updated.getTime(), expectedResult[1].ical_last_updated.getTime(), 'Incorrect ical last updated for second task');
				assert.equal(tasks[1].course_id, expectedResult[1].course_id, 'Incorrect course id for second task');

				assert.equal(tasks[2].name, expectedResult[2].name, 'Incorrect name for third task');
				assert.equal(tasks[2].description, expectedResult[2].description, 'Incorrect description for third task');
				assert.equal(tasks[2].start_date.getTime(), expectedResult[2].start_date.getTime(), 'Incorrect start date for third task');
				assert.equal(tasks[2].end_date.getTime(), expectedResult[2].end_date.getTime(), 'Incorrect end date for third task');
				assert.equal(tasks[2].complete, expectedResult[2].complete, 'Incorrect complete for third task');
				assert.equal(tasks[2].visible, expectedResult[2].visible, 'Incorrect visible for third task');
				assert.equal(tasks[2].user_last_updated.getTime(), expectedResult[2].user_last_updated.getTime(), 'Incorrect user last updated for third task');
				assert.equal(tasks[2].ical_last_updated.getTime(), expectedResult[2].ical_last_updated.getTime(), 'Incorrect ical last updated for third task');
				assert.equal(tasks[2].course_id, expectedResult[2].course_id, 'Incorrect course id for third task');

				done();
			});
		});
	});

	describe('update', function () {
		it ('should update the first task', function (done) {

			var data = {
				id: newTaskId,
				name: 'homework1 updated',
				description: 'boring stuff updated',
				start_date: dateStringUpdated,
				end_date: dateStringUpdated,
				complete: true,
				visible: false,
				user_last_updated: dateStringUpdated,
				ical_last_updated: dateStringUpdated,
				course_id: newCourseId2
			};

			Task.update(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);

				var expectedResult = {
					id: newTaskId,
					name: 'homework1 updated',
					description: 'boring stuff updated',
					start_date: dateObjectUpdated,
					end_date: dateObjectUpdated,
					complete: true,
					visible: false,
					user_last_updated: dateObjectUpdated,
					ical_last_updated: dateObjectUpdated,
					course_id: newCourseId2
				};

				Task.getById(newTaskId, function(err, task) {
					assert.isNull(err, 'Error: ' + err);
					assert.equal(task.id, expectedResult.id, 'Incorrect id');
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

		it ('should update the second task', function (done) {

			var data = {
				id: newTaskId2,
				name: 'homework2 updated',
				description: 'boring stuff updated',
				start_date: dateStringUpdated,
				end_date: dateStringUpdated,
				complete: false,
				visible: true,
				user_last_updated: dateStringUpdated,
				ical_last_updated: dateStringUpdated,
				course_id: newCourseId
			};

			Task.update(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);

				var expectedResult = {
					id: newTaskId2,
					name: 'homework2 updated',
					description: 'boring stuff updated',
					start_date: dateObjectUpdated,
					end_date: dateObjectUpdated,
					complete: false,
					visible: true,
					user_last_updated: dateObjectUpdated,
					ical_last_updated: dateObjectUpdated,
					course_id: newCourseId
				};

				Task.getById(newTaskId2, function(err, task) {
					assert.isNull(err, 'Error: ' + err);
					assert.equal(task.id, expectedResult.id, 'Incorrect id');
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

		it ('should update the third task', function (done) {

			var data = {
				id: newTaskId3,
				name: 'homework3 updated',
				description: 'boring stuff updated',
				start_date: dateStringUpdated,
				end_date: dateStringUpdated,
				complete: true,
				visible: false,
				user_last_updated: dateStringUpdated,
				ical_last_updated: dateStringUpdated,
				course_id: newCourseId2
			};

			Task.update(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);

				var expectedResult = {
					id: newTaskId3,
					name: 'homework3 updated',
					description: 'boring stuff updated',
					start_date: dateObjectUpdated,
					end_date: dateObjectUpdated,
					complete: true,
					visible: false,
					user_last_updated: dateObjectUpdated,
					ical_last_updated: dateObjectUpdated,
					course_id: newCourseId2
				};

				Task.getById(newTaskId3, function(err, task) {
					assert.isNull(err, 'Error: ' + err);
					assert.equal(task.id, expectedResult.id, 'Incorrect id');
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
	});

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