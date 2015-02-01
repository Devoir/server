// models
var User = require('../../model/Users.model.js');

exports.getAllUsers = function (req, res) {
	User.getAll(function (err, users) {
		res.json(users);
	});
};

exports.create = function (req, res) {

};

exports.getOne = function (req, res) {

};

exports.update = function (req, res) {

};