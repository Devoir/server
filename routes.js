//////////////////////
// LOAD DEPENDENCIES
//////////////////////

var express = require('express');
var ical = require('./library/ical.js');

module.exports = function (app, passport) {

///////////////
// MIDDLEWARE
///////////////

// var middleware = require('./routes/middleware.js');

/////////////////////
// ROUTE PARAMETERS
/////////////////////

// require('./routes/params.js')(app);


//////////////////
// STATIC ROUTES
//////////////////

app.get('/', function (req, res) {
	res.render('../templates/pages/home.ejs');
});

app.get('/login', function (req, res) {

});

app.get('/logout', function (req, res) {

});

app.get('/admin', function (req, res) {

});

//////////////////
// API
//////////////////

app.get('/calendar/:id', ical.fromId);

}; //module.exports
