// var gOauth = require('../../library/googleOauth.js');

exports.home = function (req, res) {
	if (req.isAuthenticated())
		return res.redirect('/taskview');

	res.render('../templates/pages/home.ejs');
};

exports.taskView = function (req, res) {
	console.log('user', req.user);
	if (!req.isAuthenticated())
		return res.redirect('/');

	res.render('../templates/pages/taskView.ejs', req.user._json);
};