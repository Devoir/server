var config = require('../config.js');
var pg = require('pg').native;

var connectionString = config.dbUrl;

exports.query = function (queryString, params, callback) {

	pg.connect(connectionString, function(err, client, done) {
	
		if (err) {
			return callback(err);
		}

		client.query(queryString, params, function(err, result) {
			
			if (err) {
				return callback(err);
			}

			callback(err, result.rows);
			done();
		});
	});
}