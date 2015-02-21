var db = require('../library/Database.js');

//var User = require('../model/Users.model.js');

var assert = require("assert");

describe('Array', function(){
	describe('#indexOf()', function(){
		it('should return -1 when the value is not present', function(){
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
});

describe('Database', function () {
	it ('should connect to the db and give back the connection', function (done) {
		db.getClient(function (err, client) {
			assert(!err);
			assert(client);

			console.log(client);
			client.end();
			done();
		});
	})
});

describe('User', function () {
	describe('Select', function () {
		it ('should select all form users table', function (done) {
			
			db.getClient(function(err, client) {
				assert(!err);

				client.query('SELECT * FROM users', function(err, rows) {
					assert(!err);
					console.log(rows);

					client.end();
					done();
				});
			})
		});
	})
})