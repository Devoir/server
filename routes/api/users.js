// models
var User = require('../../model/Users.model.js');

exports.getAllUsers = function (req, res) {
	console.log(req.user, req.params);
	User.getAll(function (err, users) {
		res.json(users);
	});
};

exports.create = function (req, res) {

	res.json({ not: 'implemented'});
};

exports.getOne = function (req, res) {
	
	res.json(req.user);
};

exports.update = function (req, res) {

	res.json({ not: 'implemented'});
};