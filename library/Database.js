var config = require('../config.js');
var Client = require('pg-native');

var connectionString = config.dbUrl;

exports.getClient = getClient;

exports.query = function (q, params, callback) {
	getClient(function(err, client) {
		if (err) return callback(err);

		client.query(q, params, function(err, rows) {
			
			callback(err, rows);
			//close up
			client.end();
		});
	});
}

function getClient (callback) {
	var client = new Client();
	client.connect(connectionString, function(err) {

		callback(err, client);
	});
};