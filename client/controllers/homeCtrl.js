var controllers = controllers || angular.module('controllers', []);


controllers.controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {
	console.log('homeCtrl loaded');

	$scope.calendarId = 'https://learningsuite.byu.edu/iCalFeed/ical.php?courseID=GGC-K5hHAoZM';

	$scope.getCalendar = function () {
		var id = $scope.calendarId;
		var url = '/calendars/' + encodeURIComponent(id);

		$scope.loadingFeed = true;
		
		$http.get(url)
		.success(function(data, status, headers, config) {
			// this callback will be called asynchronously
			// when the response is available
			$scope.events = data;
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
	}
}]);