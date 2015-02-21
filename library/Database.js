var config = require('../config.js');
var Client = require('pg-native');


// var conStr = 'postgresql://user:password@host:5432/database?param=value';
var conStr = 'postgresql://' + 
	config.db.user + ':' + 
	config.db.password + '@' + 
	config.db.host + '/' + 
	config.db.name;


//callback function (err, client, done)
exports.getClient = function (callback) {
	var client = new Client();
	client.connect(conStr, function(err) {
		callback(err, client);
	});
};

