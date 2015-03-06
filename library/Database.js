var config = require('../config.js');
var pg = require('pg').native;

var connectionString = config.dbUrl;

exports.query = function (query, callback) {

	pg.connect(connectionString, function(err, client, done) {
	
		if (err) {
			return callback(err);
		}

		client.query(query, function(err, result) {
			
			if (err) {
				return callback(err);
			}

			callback(err, result.rows);
			done();
		});
	});
}

exports.parameterizedQuery = function (query, params, callback) {

	pg.connect(connectionString, function(err, client, done) {
	
		if (err) {
			return callback(err);
		}

		client.query(query, params, function(err, result) {
			
			if (err) {
				return callback(err);
			}

			callback(err, result.rows);
			done();
		});
	});
}

exports.preparedQuery = function (query, callback) {

	pg.connect(connectionString, function(err, client, done) {
	
		if (err) {
			return callback(err);
		}

		client.query(query, function(err, result) {
			
			if (err) {
				return callback(err);
			}

			callback(err, result.rows);
			done();
		});
	});
}