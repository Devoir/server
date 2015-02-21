var path = require('path');

console.error("TODO: setup configuration in config.js");
//Remove this line once config is setup.

var Config = {};

Config.passwordSalt = "TODO";
Config.tokenSalt = "TODO";


if (process.env.NODE_ENV == "dev") {

	Config.environment = "dev";
	Config.homeUrl = "http://localhost:3000";

	Config.db = {
		host: "localhost:5432",
		name: "devoir",
		user: "postgres",
		password: ""
	};

} else {

	Config.environment = "production";
	Config.homeUrl = "http://107.170.243.119:3000";

	Config.db = {
		host: "localhost",
		name: "TODO",
		user: "TODO",
		password: "TODO"
	};	
}

Config.isLiveSite = function () {
	return Config.environment == "production";
};

module.exports = Config;
