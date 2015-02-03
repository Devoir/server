var CLIENT_ID = "1067500941491-p7d6k8en78uc7bbnq5p05jfmir8qpmgk.apps.googleusercontent.com";
var CLIENT_SECRET = "2qfm2TD3tH3pJarT8nrLPhU0";

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (passport, config){
	var REDIRECT_URL = config.homeUrl + 'auth/google/callback';

	//example: https://github.com/jaredhanson/passport-google-oauth/blob/master/examples/oauth2/app.js
	passport.use(new GoogleStrategy({
			clientID: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			callbackURL: REDIRECT_URL
		},
		function(accessToken, refreshToken, profile, done) {
			console.log('accessToken', accessToken);
			console.log('refreshToken', refreshToken);
			console.log('profile', profile);

			return done(null, profile);
		}
	));

	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.  However, since this example does not
	//   have a database of user records, the complete Google profile is
	//   serialized and deserialized.
	passport.serializeUser(function(user, done) {
		//FUTURE
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		//FUTURE
		done(null, user);
	});
};