var CLIENT_ID = "1067500941491-p7d6k8en78uc7bbnq5p05jfmir8qpmgk.apps.googleusercontent.com";
var CLIENT_SECRET = "2qfm2TD3tH3pJarT8nrLPhU0";

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../model/Users.model.js');

module.exports = function (passport, config){
	var REDIRECT_URL = config.homeUrl + '/auth/google/callback';

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

			// check if they are in the db
			var email = profile._json.email;
			User.getByEmail(email, function(err, user) {
				if (err) return done(err);

				if (!user){
					var newUser = {
						email: email, 
						displayName: profile._json.name
					}

					return createUser(newUser, profile._json.name);
				}

				returnUser(user);
			});

			function createUser (newUser, displayName) {
				User.create(newUser, function(err, newUser) {
					if (err) return done(err);
					newUser.display_name = displayName;
					returnUser(newUser);
				})
			}

			function returnUser (user) {
				var data = profile._json;
				data.id = user.id;
				data.displayName = user.display_name;

				return done(null, data);
			}
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