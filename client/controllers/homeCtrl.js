var controllers = controllers || angular.module('controllers', []);


controllers.controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {
	console.log('homeCtrl loaded');
}]);