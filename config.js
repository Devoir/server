var path = require('path');

console.error("TODO: setup configuration in config.js");
//Remove this line once config is setup.

var Config = {};

Config.passwordSalt = "TODO";
Config.tokenSalt = "TODO";


if (process.env.NODE_ENV == "dev") {

	Config.environment = "dev";
	Config.homeUrl = "http://localhost:3000";
	Config.dbUrl = "postgres://test:t3stm3@localhost:5432/devoirtest";

} else {

	Config.environment = "production";
	Config.homeUrl = "http://107.170.243.119:3000";
	Config.dbUrl = "postgres://dev:12dev34prod@localhost:5432/devoir";
}

Config.isLiveSite = function () {
	return Config.environment == "production";
};

module.exports = Config;
