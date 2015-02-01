var GooglePlusStrategy = require('passport-google-plus');

var CLIENT_ID = "1067500941491-p7d6k8en78uc7bbnq5p05jfmir8qpmgk.apps.googleusercontent.com";
var CLIENT_SECRET = "2qfm2TD3tH3pJarT8nrLPhU0";
var REDIRECT_URL = "http://localhost:3000/taskview";

module.exports = function (passport, config){
	passport.use(new GooglePlusStrategy({
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET
		},
		function(tokens, profile, done) {
			// Create or update user, call done() when complete... 
			done(null, profile, tokens);
		}
	));

	passport.serializeUser(function(user, done) {
		//FUTURE
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		//FUTURE
		done(null, user);
	});
};

