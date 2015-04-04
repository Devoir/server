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

	describe('getById', function () {
		it ('should return an empty object', function (done) {

			var expectedResult = {};

			request(app)
				.get('/api/users/' + -1)
				//.send(email)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert.deepEqual(res.body, expectedResult, 'Wrong object was returned');
					done();
				});
		});

		it ('should select the first user inserted', function (done) {

			var expectedResult = {
				id: newUserId,
				email: 'testa@email.com',
				display_name: 'Test A'
			};

			request(app)
				.get('/api/users/' + newUserId)
				//.send(email)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert.deepEqual(res.body, expectedResult, 'Wrong object was returned');
					done();
				});
		});

		it ('should select the second user inserted', function (done) {

			var expectedResult = {
				id: newUserId2,
				email: 'testb@email.com',
				display_name: 'Test B'
			};

			request(app)
				.get('/api/users/' + newUserId2)
				//.send(email)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert.deepEqual(res.body, expectedResult, 'Wrong object was returned');
					done();
				});
		});
	});

	describe('getAll', function () {
		it ('should select all users', function (done) {

			var expectedResult = [];
			expectedResult.push({id: newUserId, email: 'testa@email.com', display_name: 'Test A'});
			expectedResult.push({id: newUserId2, email: 'testb@email.com', display_name: 'Test B'});

			request(app)
				.get('/api/users/')
				//.send(email)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert.deepEqual(res.body, expectedResult, 'Wrong object was returned');
					done();
				});
		});
	});

	describe('update', function () {
		it ('should update the first user', function (done) {

			var data = {
				id: newUserId,
				email: 'updatetesta@email.com',
				display_name: 'Test A Update'
			};

			var expectedResult = data;

			request(app)
				.put('/api/users/' + newUserId)
				.send(data)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert.deepEqual(res.body, {}, 'Wrong object was returned');
					
					request(app)
						.get('/api/users/' + newUserId)
						//.send(email)
						.expect(200)
						.end(function(err, res) {
							assert.isNull(err, err);
							assert.deepEqual(res.body, expectedResult, 'Wrong object was returned');
							done();
						});
				});
		});

		it ('should update the second user', function (done) {

			var data = {
				id: newUserId2,
				email: 'updatetestb@email.com',
				display_name: 'Test B Update'
			};

			var expectedResult = data;

			request(app)
				.put('/api/users/' + newUserId2)
				.send(data)
				.expect(200)
				.end(function(err, res) {
					assert.isNull(err, err);
					assert.deepEqual(res.body, {}, 'Wrong object was returned');

					request(app)
						.get('/api/users/' + newUserId2)
						//.send(email)
						.expect(200)
						.end(function(err, res) {
							assert.isNull(err, err);
							assert.deepEqual(res.body, expectedResult, 'Wrong object was returned');
							done();
						});
				});
		});
	});
});
