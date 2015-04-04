// models
var User = require('../../model/Users.model.js');
var ApiError = require('../../library/ApiError.js');
var User = require('../../model/Users.model.js');

exports.getFromEmail = function (req, res, next) {
	var email = req.body.email;

	User.getByEmail(email, function(err, result) {
		if (err) {
			return ApiError.handle(err, next);
		}

		res.json(result);
	});
};

exports.getAllUsers = function (req, res, next) {
	User.getAll(function (err, users) {
		if (err) {
			return ApiError.handle(err, next);
		}
		
		res.json(users);
	});
};

exports.getOne = function (req, res, next) {
	var id = req.userID;

	User.getById(id, function (err, user) {
	 	if (err) {
	 		return next(err);
	 	}

	 	res.json(user);
	});
};

exports.update = function (req, res, next) {
	var data = req.body;

	User.update(data, function(err, results) {
		if (err) {
			return ApiError.handle(err, next);
		}

		res.end();
	});
};