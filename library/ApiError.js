/*
	Create one of these or an Error object and pass it along the callback chain when an error happens

	@param {Error} err		Create a new Error and pass it a message. Then we have a message and stack trace.
	@param {Object} options (Optional) any other info to consider in the error like user input etc.

*/
exports.create = function (err, status) {
	var apiError;
	if ( !(err instanceof Error) ) {
		//create an instance of an error
		apiError = new Error('(no message)');
		apiError.data = err;
	} else {
		apiError = err;
	}

	apiError.status = apiError.status || status || 500;

	return apiError;
}

exports.handle = function (err, next, status) {
	err = exports.create(err, status);

	return next(err);
}