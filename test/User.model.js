var assert = require("assert");

var db = require('../library/Database.js');

var User = require('../model/Users.model.js');


describe('Array', function(){
	describe('#indexOf()', function(){
		it('should return -1 when the value is not present', function(){
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
});

describe('Database', function () {
	describe('getClient', function () {
		it ('should connect to the db and give back the connection', function (done) {
			db.getClient(function (err, client) {
				assert(!err, err);
				assert(client);

				console.log('\n', client);
				client.end();
				done();
			});
		});
	});
});

describe('User', function () {


	var newUserId;

	describe('create', function() {
		it ('should create a user named', function(done) {

			var data = {
				email: 'fake@email.com',
				displayName: 'fake_user'
			}

			User.create(data, function(err, newUser) {
				assert(!err, err);

				assert(newUser.id, 'we did not get back an id');
				
				newUserId = newUser.id;
				console.log('\n', newUser);
				done();
			})
		});
	});

	describe('getById', function () {
		it ('should select one default user in the DB', function (done) {

			User.getById(newUserId, function(err, user) {
				assert(!err, err);
				console.log('\n', user);
				done();
			});
		});
	});

	describe('delete', function() {
		it ('should delete a user', function (done) {

			User.delete(newUserId, function(err, result) {
				assert(!err, err);
				console.log(result);
				done();
			})
		});
	})

	describe('getAll', function () {
		it ('should select all users from users table', function (done) {

			User.getAll(function(err, users) {
				assert(!err, err);
				console.log('\n', users);
				done();
			});
		});
	});
});