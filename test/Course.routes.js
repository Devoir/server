var assert = require("chai").assert;
var db = require('../library/Database.js');
var Course = require('../model/Courses.model.js');
var User = require('../model/Users.model.js');
var app = require('../server.js').app;
var request = require('supertest');

describe('Course Routes', function () {

	var newUserId;
	var newUserId2;
	var newCourseId;
	var newCourseId2;
	var newCourseId3;

	before(function(done) {

		var user1 = {
			email: 'testc@email.com',
			display_name: 'Test C'
		};

		var user2 = {
			email: 'testd@email.com',
			display_name: 'Test D'
		};

		User.create(user1, function(err, result) {
			assert.isNull(err, 'Error: ' + err);
			assert(result.id, 'Should have gotten back an id');
			newUserId = result.id;

			User.create(user2, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				assert(result.id, 'Should have gotten back an id');
				newUserId2 = result.id;
				done();
			});
		});
	});

	after(function(done) {
		User.delete(newUserId, function(err, result) {
			assert.isNull(err, 'Error: ' + err);

			User.delete(newUserId2, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				done();
			});
		});
	});

	describe('home page', function() {
		it ('should hit the home page', function(done) {
			request(app)
				.get('/')
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					done();
				});
		});
	});

	describe('create', function() {
		/*it ('should fail creating a course with invalid user', function(done) {

			var data = {
				name: 'Invalid User - Should Fail',
				color: '#cccccc',
				visible: true,
				ical_feed_url: "http://ical.com",
				user_id: -1
			};

			request(app)
				.post('/api/courses/')
				.send(data)
				.expect(500)
				.end(function(err, res) {
					assert.isNotNull(err);
					done();
				});
		});*/

		it ('should create a course', function(done) {

			var data = {
				name: 'CS 428',
				color: '#cccccc',
				visible: true,
				ical_feed_url: "http://ical.com",
				user_id: newUserId
			};

			request(app)
				.post('/api/courses/')
				.send(data)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert(res.body.id, 'Should have gotten back an id');
					newCourseId = res.body.id;
					done();
				});
		});

		it ('should create a second course', function(done) {

			var data = {
				name: 'CS 498R',
				color: '#cccccc',
				visible: false,
				ical_feed_url: "http://ical.com",
				user_id: newUserId
			};

			request(app)
				.post('/api/courses/')
				.send(data)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert(res.body.id, 'Should have gotten back an id');
					newCourseId2 = res.body.id;
					done();
				});
		});

		it ('should create a third course', function(done) {

			var data = {
				name: 'CS 5000',
				color: '#cccccc',
				visible: false,
				ical_feed_url: "http://ical.com",
				user_id: newUserId2
			};

			request(app)
				.post('/api/courses/')
				.send(data)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert(res.body.id, 'Should have gotten back an id');
					newCourseId3 = res.body.id;
					done();
				});
		});
	});

	describe('getById', function () {
		it ('should return an empty object', function (done) {

			request(app)
				.get('/api/courses/' + -1)
				//.send(data)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert.deepEqual(res.body, {}, 'An empty object should have been returned');
					done();
				});
		});

		it ('should select the first course inserted', function (done) {

			var expectedResult = {
				id: newCourseId,
				name: 'CS 428',
				color: '#cccccc',
				visible: true,
				ical_feed_url: "http://ical.com",
				user_id: newUserId
			};

			request(app)
				.get('/api/courses/' + newCourseId)
				//.send(data)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err);
					assert.equal(res.body.id, expectedResult.id, 'Incorrect ID');
					assert.equal(res.body.name, expectedResult.name, 'Incorrect name');
					assert.equal(res.body.color, expectedResult.color, 'Incorrect color');
					assert.equal(res.body.visible, expectedResult.visible, 'Incorrect visible');
					assert.equal(res.body.ical_feed_url, expectedResult.ical_feed_url, 'Incorrect ical feed url');
					assert.equal(res.body.user_id, expectedResult.user_id, 'Incorrect user id');
					done();
				});
		});

		it ('should select the second course inserted', function (done) {

			var expectedResult = {
				id: newCourseId2,
				name: 'CS 498R',
				color: '#cccccc',
				visible: false,
				ical_feed_url: "http://ical.com",
				user_id: newUserId
			};

			request(app)
				.get('/api/courses/' + newCourseId2)
				//.send(data)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err);
					assert.equal(res.body.id, expectedResult.id, 'Incorrect ID');
					assert.equal(res.body.name, expectedResult.name, 'Incorrect name');
					assert.equal(res.body.color, expectedResult.color, 'Incorrect color');
					assert.equal(res.body.visible, expectedResult.visible, 'Incorrect visible');
					assert.equal(res.body.ical_feed_url, expectedResult.ical_feed_url, 'Incorrect ical feed url');
					assert.equal(res.body.user_id, expectedResult.user_id, 'Incorrect user id');
					done();
				});
		});

		it ('should select the third course inserted', function (done) {

			var expectedResult = {
				id: newCourseId3,
				name: 'CS 5000',
				color: '#cccccc',
				visible: false,
				ical_feed_url: "http://ical.com",
				user_id: newUserId2
			};

			request(app)
				.get('/api/courses/' + newCourseId3)
				//.send(data)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err);
					assert.equal(res.body.id, expectedResult.id, 'Incorrect ID');
					assert.equal(res.body.name, expectedResult.name, 'Incorrect name');
					assert.equal(res.body.color, expectedResult.color, 'Incorrect color');
					assert.equal(res.body.visible, expectedResult.visible, 'Incorrect visible');
					assert.equal(res.body.ical_feed_url, expectedResult.ical_feed_url, 'Incorrect ical feed url');
					assert.equal(res.body.user_id, expectedResult.user_id, 'Incorrect user id');
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
	});

	describe('getAll', function () {
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
	});

	describe('update', function () {
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
		it ('should delete the first course', function (done) {
			request(app)
				.delete('/api/courses/' + newCourseId)
				//.send(data)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err);

					Course.getById(newCourseId, function(err, course) {
						assert.isNull(err, 'Error: ' + err);
						assert.isNull(course, 'First course was not deleted')
						done();
					});
				});
		});

		it ('should delete the second course', function (done) {

			request(app)
				.delete('/api/courses/' + newCourseId2)
				//.send(data)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err);

					Course.getById(newCourseId2, function(err, course) {
						assert.isNull(err, 'Error: ' + err);
						assert.isNull(course, 'Second course was not deleted')
						done();
					});
				});
		});

		it ('should delete the third course', function (done) {

			request(app)
				.delete('/api/courses/' + newCourseId3)
				//.send(data)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err);

					Course.getById(newCourseId3, function(err, course) {
						assert.isNull(err, 'Error: ' + err);
						assert.isNull(course, 'Third course was not deleted')
						done();
					});
				});
		});
	});
});