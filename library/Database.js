var config = require('../config.js');
var Client = require('pg-native');


// var conStr = 'postgresql://user:password@host:5432/database?param=value';
var conStr = 'postgresql://' + 
	config.db.user + ':' + 
	config.db.password + '@' + 
	config.db.host + '/' + 
	config.db.name;


exports.getClient = getClient;

exports.query = function (q, callback) {
	getClient(function(err, client) {
		if (err) return callback(err);

		client.query(q, function(err, rows) {
			
			callback(err, rows);
			//close up
			client.end();
		});
	});
}

function getClient (callback) {
	var client = new Client();
	client.connect(conStr, function(err) {

		callback(err, client);
	});
};