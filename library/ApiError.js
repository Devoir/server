var errorProto = {
	madeByDevoir : true
}

/*
	Create one of these or an Error object and pass it along the callback chain when an error happens

	@param {Error} err		Create a new Error and pass it a message. Then we have a message and stack trace.
	@param {Object} options (Optional) any other info to consider in the error like user input etc.

*/
exports.create = function (err, options) {

	var apiError = Object.create(errorProto);

	if (err === undefined || err === null || err === "")
		err = new Error();

	var status = (options && options.status) ? options.status : 500;

	apiError.err 		= err;
	apiError.status		= err.code || err.status || status;
	apiError.message	= err.message || '(No message)';
	apiError.stack		= err.stack || new Error().stack;
	apiError.options	= options;

	return apiError;
}

exports.handle = function (err, next) {
	if (!err.madeByDevoir) {
		err = exports.create(err);
	}

	return next(err);
}