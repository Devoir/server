var assert = require("chai").assert;
var db = require('../library/Database.js');
var User = require('../model/Users.model.js');

describe('Database', function () {
	describe('getClient', function () {
		it ('should connect to the db and give back the connection', function (done) {
			db.getClient(function (err, client) {
				assert(!err, err);
				assert(client);

				client.end();
				done();
			});
		});
	});
});

describe('User', function () {

	var newUserId;
	var newUserId2;

	describe('create', function() {
		it ('should create a user', function(done) {

			var data = {
				email: 'testa@email.com',
				display_name: 'A Test'
			};

			User.create(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				assert(result.id, 'Should have gotten back an id');

				newUserId = result.id;
				done();
			});
		});

		it ('should create another user', function(done) {

			var data = {
				email: 'testb@email.com',
				display_name: 'Bert Test'
			};

			User.create(data, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				assert(result.id, 'Should have gotten back an id');

				newUserId2 = result.id;
				done();
			});
		});
	});

	describe('getById', function () {
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
	});

	describe('delete', function() {
		it ('should delete the first user', function (done) {
			User.delete(newUserId, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				
				User.getById(newUserId, function(err, user) {
					assert.isNull(err, 'Error: ' + err);
					assert.isNull(user, 'First user was not deleted')
					done();
				});
			});
		});

		it ('should delete the second user', function (done) {

			User.delete(newUserId2, function(err, result) {
				assert.isNull(err, 'Error: ' + err);
				
				User.getById(newUserId2, function(err, user) {
					assert.isNull(err, 'Error: ' + err);
					assert.isNull(user, 'Second user was not deleted')
					done();
				});
			});
		});
	});
});