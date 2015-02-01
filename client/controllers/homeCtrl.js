var controllers = controllers || angular.module('controllers', []);


controllers.controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {
	console.log('homeCtrl loaded');

	var config = {
		clientid : '1067500941491-p7d6k8en78uc7bbnq5p05jfmir8qpmgk.apps.googleusercontent.com',
		cookiepolicy : 'single_host_origin',
		callback : signinCallback
	}

	function signinCallback (res) {
		console.log('auth response', res);

		if (res.status.signed_in) {
			//success
			$http.post('/login', {code: res.code})
			.success(function(data, status, headers, config) {
				window.location.href = '/taskView';
			})
			.error(function(data, status, headers, config) {

			});
		} else {
			//fail
		}
		$scope.disableSignIn = false;
	}

	$scope.login = function () {
		gapi.auth.signIn(config);
		$scope.disableSignIn = true;
	};


}]);