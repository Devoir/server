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
				assert(!err);
				assert(client);

				console.log('\n', client);
				client.end();
				done();
			});
		});
	});
});

describe('User', function () {
	describe('getAll', function () {
		it ('should select all users from users table', function (done) {

			User.getAll(function(err, users) {
				assert(!err);
				console.log('\n', users);
				done();
			});
		});
	});
});