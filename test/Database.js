var assert = require("chai").assert;
var db = require('../library/Database.js');

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