var app = angular.module('app', [
	// 'services',
	'controllers',
	// 'directives'
]);
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
var controllers = controllers || angular.module('controllers', []);


controllers.controller('taskViewCtrl', ['$scope', '$http', function ($scope, $http) {
	console.log('taskViewCtrl loaded');

	$scope.calendarId = 'https://learningsuite.byu.edu/iCalFeed/ical.php?courseID=HD832sKIIdzI';

	$scope.getCalendar = function () {
		$scope.loadingFeed = true;
		$scope.events = [];
		
		var courseId = 5;

		$http.post('/api/courses/' + courseId + '/tasks/import', {icalFeed : $scope.calendarId})
		.success(function(data, status, headers, config) {
			// this callback will be called asynchronously
			// when the response is available
			for (var d in data)
				$scope.events.push(data[d]);
			
			$scope.loadingFeed = false;
		})
		.error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			$scope.error = {
				data : data,
				status : status
			};
			$scope.loadingFeed = false;
		});
	};

	$scope.checkOff = function (event) {
		event.done = !event.done;
	};


	//////////////////
	// TEMP DATA
	//////////////////

	$scope.courses = [
		{
			name: 'Course',
			color: '#ccc'
		},
		{
			name: 'Course',
			color: '#ccc'
		},
		{
			name: 'Course',
			color: '#ccc'
		},
		{
			name: 'Course',
			color: '#ccc'
		},
		{
			name: 'Course',
			color: '#ccc'
		},
	];
}]);