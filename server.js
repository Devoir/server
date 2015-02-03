//////////////////////
// LOAD DEPENDENCIES
//////////////////////

//Basic modules
var express			= require('express');
var path			= require('path');

//Express middleware
var methodOverride	= require('method-override');
var cookieParser	= require('cookie-parser');
var bodyParser		= require('body-parser');
var logger			= require('morgan');

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler());
}

var errorHandler	= require('errorhandler');

//User auth/sessions
var passport	= require('passport');
var session		= require('express-session');

//Our configuration and modules
var config = require('./config.js');
require('./config/passport.js')(passport, config);

//////////////////////
// CONFIGURE EXPRESS
//////////////////////

var app = express();

app.set('env', config.environment);
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//////////////////////////////
// SETUP PERSISTENT SESSIONS
//////////////////////////////

//TODO: Setup persistent sessions
/*
var sessionMiddleware = session({
	resave: true,
	saveUninitialized: true,
	secret: config.userTokenSalt,
	store: new MongoStore({
		db: mongoose.connection.db,
		auto_reconnect: true
	})
});
app.use(sessionMiddleware);

*/
app.use(session({
	resave: true,
	saveUninitialized: true,
	// FUTURE come up with a hash or something for the the secret
	secret: 'devoir secrets are golden stuff'
}));
app.use(passport.initialize());
app.use(passport.session());

//////////////////////
// LOAD OUR ROUTES
//////////////////////

require('./routes.js')(app, passport);

/////////////////////
// START THE SERVER
/////////////////////

var server = app.listen(3000, function () {

	var port = server.address().port;
	console.log('Server listening on port %s', port);
});


//////////////////////
// HANDLE EXCEPTIONS
//////////////////////

process.on('uncaughtException', function (err) {
	console.error("");
	console.error(new Date().toString(), "UNCAUGHT EXCEPTION:", err);
	console.error(err.stack);
	console.error("");

	if (config.isLiveSite()) {
		//Send an email to the admins.
		AdminEmails.error(err, function () {});
	}
});
