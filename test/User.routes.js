var assert = require("chai").assert;
var db = require('../library/Database.js');
var User = require('../model/Users.model.js');
var app = require('../server.js').app;
var request = require('supertest');

describe('User Routes', function () {

	var newUserId;
	var newUserId2;

	before(function(done) {

		var user1 = {
			email: 'testa@email.com',
			display_name: 'Test A'
		};

		var user2 = {
			email: 'testb@email.com',
			display_name: 'Test B'
		};

		User.create(user1, function(err, result) {
			assert.isNull(err, err);
			assert(result.id, 'Should have gotten back an id');
			newUserId = result.id;

			User.create(user2, function(err, result) {
				assert.isNull(err, err);
				assert(result.id, 'Should have gotten back an id');
				newUserId2 = result.id;
				done();
			});
		});
	});

	after(function(done) {
		User.delete(newUserId, function(err, result) {
			assert.isNull(err, err);

			User.delete(newUserId2, function(err, result) {
				assert.isNull(err, err);
				done();
			});
		});
	});

	describe('getByEmail', function() {
		it ('should return an empty object', function (done) {

			var email = {'email': 'invalid@email.com'};

			var expectedResult = {};

			request(app)
				.post('/api/login')
				.send(email)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert.deepEqual(res.body, expectedResult, 'An empty object should have been returned');
					done();
				});
		});

		it ('should select the first user', function(done) {

			var email = {'email': 'testa@email.com'};

			var expectedResult = {
				id: newUserId,
				email: 'testa@email.com',
				display_name: 'Test A'
			};

			request(app)
				.post('/api/login')
				.send(email)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert.deepEqual(res.body, expectedResult, 'Wrong object was returned');
					done();
				});
		});


		it ('should select the second user', function (done) {

			var email = {'email': 'testb@email.com'};

			var expectedResult = {
				id: newUserId2,
				email: 'testb@email.com',
				display_name: 'Test B'
			};

			request(app)
				.post('/api/login')
				.send(email)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert.deepEqual(res.body, expectedResult, 'Wrong object was returned');
					done();
				});
		});
	});

	/*describe('getById', function () {
		it ('should return null', function (done) {

			User.getById(-1, function(err, user) {
				assert.isNull(err, 'Error: ' + err);
				assert.isNull(user, 'No user should have been returned')
				done();
			});
		});

		it ('should select the first user inserted', function (done) {

			var expectedResult = {
				id: newUserId,
				email: 'testa@email.com',
				display_name: 'A Test'
			};

			User.getById(newUserId, function(err, user) {
				assert.isNull(err, 'Error: ' + err);
				assert.equal(user.id, expectedResult.id, 'Incorrect id');
				assert.equal(user.email, expectedResult.email, 'Incorrect email');
				assert.equal(user.display_name, expectedResult.display_name, 'Incorrect display_name');
				done();
			});
		});

		it ('should select the second user inserted', function (done) {

			var expectedResult = {
				id: newUserId2,
				email: 'testb@email.com',
				display_name: 'Bert Test'
			};

			User.getById(newUserId2, function(err, user) {
				assert.isNull(err, 'Error: ' + err);
				assert.equal(user.id, expectedResult.id, 'Incorrect id');
				assert.equal(user.email, expectedResult.email, 'Incorrect email');
				assert.equal(user.display_name, expectedResult.display_name, 'Incorrect display_name');
				done();
			});
		});
	});

	describe('getByEmail', function () {
		it ('should return null', function (done) {

			User.getByEmail('blah@email.com', function(err, user) {
				assert.isNull(err, 'Error: ' + err);
				assert.isNull(user, 'No user should have been returned')
				done();
			});
		});

		it ('should select the first user inserted', function (done) {

			var expectedResult = {
				id: newUserId,
				email: 'testa@email.com',
				display_name: 'A Test'
			};

			User.getByEmail('testa@email.com', function(err, user) {
				assert.isNull(err, 'Error: ' + err);
				assert.equal(user.id, expectedResult.id, 'Incorrect id');
				assert.equal(user.email, expectedResult.email, 'Incorrect email');
				assert.equal(user.display_name, expectedResult.display_name, 'Incorrect display_name');
				done();
			});
		});

		it ('should select the second user inserted', function (done) {

			var expectedResult = {
				id: newUserId2,
				email: 'testb@email.com',
				display_name: 'Bert Test'
			};

			User.getByEmail('testb@email.com', function(err, user) {
				assert.isNull(err, 'Error: ' + err);
				assert.equal(user.id, expectedResult.id, 'Incorrect id');
				assert.equal(user.email, expectedResult.email, 'Incorrect email');
				assert.equal(user.display_name, expectedResult.display_name, 'Incorrect display_name');
				done();
			});
		});
	});

	describe('getAll', function () {
		it ('should select all users', function (done) {

			var expectedResult = [];
			expectedResult.push({id: newUserId, email: 'testa@email.com', display_name: 'A Test'});
			expectedResult.push({id: newUserId2, email: 'testb@email.com', display_name: 'Bert Test'});

			User.getAll(function(err, users) {
				assert.isNull(err, 'Error: ' + err);
				assert.equal(users.length, expectedResult.length, 'Incorrect number of users returned');

				assert.equal(users[0].id, expectedResult[0].id, 'Incorrect id for first user');
				assert.equal(users[0].email, expectedResult[0].email, 'Incorrect email for first user');
				assert.equal(users[0].display_name, expectedResult[0].display_name, 'Incorrect display_name for first user');

				assert.equal(users[1].id, expectedResult[1].id, 'Incorrect id for second user');
				assert.equal(users[1].email, expectedResult[1].email, 'Incorrect email for second user');
				assert.equal(users[1].display_name, expectedResult[1].display_name, 'Incorrect display_name for second user');

				done();
			});
		});
	});

	describe('update', function () {
		it ('should update the first user', function (done) {

			var data = {
				id: newUserId,
				email: 'updatetesta@email.com',
				display_name: 'Update A Test'
			};

			User.update(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);

				var expectedResult = data;

				User.getById(newUserId, function(err, user) {
					assert.isNull(err, 'Error: ' + err);
					assert.equal(user.id, expectedResult.id, 'Incorrect id');
					assert.equal(user.email, expectedResult.email, 'Incorrect email');
					assert.equal(user.display_name, expectedResult.display_name, 'Incorrect display_name');
					done();
				});
			});
		});

		it ('should update the second user', function (done) {

			var data = {
				id: newUserId2,
				email: 'updatetestb@email.com',
				display_name: 'Update Bert Test'
			};

			User.update(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);

				var expectedResult = data;

				User.getById(newUserId2, function(err, user) {
					assert.isNull(err, 'Error: ' + err);
					assert.equal(user.id, expectedResult.id, 'Incorrect id');
					assert.equal(user.email, expectedResult.email, 'Incorrect email');
					assert.equal(user.display_name, expectedResult.display_name, 'Incorrect display_name');
					done();
				});
			});
		});
	});*/
});