// var gOauth = require('../../library/googleOauth.js');

exports.home = function (req, res) {
	// var data = {
	// 	url : gOauth.generateAuthUrl()
	// };
	res.render('../templates/pages/home.ejs');
};

exports.taskView = function (req, res) {
	console.log('user', req.user);
	res.render('../templates/pages/taskView.ejs');
};