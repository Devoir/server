// models
var User = require('../../model/Users.model.js');
var ApiError = require('../../library/ApiError.js');

exports.getAllUsers = function (req, res, next) {
	console.log(req.user, req.params);
	User.getAll(function (err, users) {
		if (err) return ApiError.handle(err, next);
		
		res.json(users);
	});
};

exports.create = function (req, res, next) {

	res.json({ not: 'implemented'});
};

exports.getOne = function (req, res, next) {

	res.json(req.user);
};

exports.update = function (req, res, next) {

	res.json({ not: 'implemented'});
};