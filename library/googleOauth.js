var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var CLIENT_ID = "1067500941491-p7d6k8en78uc7bbnq5p05jfmir8qpmgk.apps.googleusercontent.com";
var CLIENT_SECRET = "2qfm2TD3tH3pJarT8nrLPhU0";
var REDIRECT_URL = "http://localhost:3000/taskview";


var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
	'profile'
];

exports.generateAuthUrl = function () {
	return oauth2Client.generateAuthUrl({scope: scopes});
}

exports.getToken = function () {
	oauth2Client.getToken(code, function(err, tokens) {
		// Now tokens contains an access_token and an optional refresh_token. Save them.
		if(!err) {
			oauth2Client.setCredentials(tokens);
		}
	});
};
