var ApiError = require('./ApiError.js');

exports.checkForRequiredParams = function (requiredParamas, data) {

	var missingParams = requiredParamas.filter(function (param) {
		if (! (param in data)) return true;

		return false;
	});

	if (missingParams.length)
		return ApiError.create('Missing params: ' + missingParams.join(','), 400);

	return false;
}