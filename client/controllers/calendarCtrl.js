var controllers = controllers || angular.module('controllers', ['ui.calendar','ui.bootstrap']);

//angular.module('MyApp', ['ui.calendar', 'ui.bootstrap']);

controllers.controller('calendarCtrl', ['$scope',$compile,uiCalendarConfig, '$http', function ($scope, $http, $compile, uiCalendarConfig) {
	console.log('calendarCtrl loaded');

//function CalendarCtrl($scope,$compile,uiCalendarConfig) {
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
   /* event source that contains custom events on the scope */
    $scope.events = [];/*
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];*/
    $scope.eventSources = [$scope.events];
    /* config object
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };*/
    //$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
    
}
