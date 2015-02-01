exports.authUser = function (req, res, next) {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
		next();
	} else {
		console.log('not logged in');
		res.redirect("/");
	}
};