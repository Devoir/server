var app = angular.module('app', [
	// 'services',
	'controllers',
	//'directives'
]);

$(document).ready(function() {

    // page is now ready, initialize the calendar...
	var courses= [];
	var courseBeingLoaded;
	var currentTask;
	
	
	 function addCourse() {
		var eventlist = [];
		//hardcoded courses for now, only allowing 2 for now
		if( courses.length == 2)
			return;
		//var calendarId = 'https://learningsuite.byu.edu/iCalFeed/ical.php?courseID=HD832sKIIdzI';
		//var calendarId = 'https://learningsuite.byu.edu/iCalFeed/ical.php?courseID=1k3dPM_6yUQq';
		var calendarId = 'https://learningsuite.byu.edu/iCalFeed/ical.php?courseID=H8fsBR7q0yZ7';
		if( courses.length == 1 ){
			calendarId = 'https://learningsuite.byu.edu/iCalFeed/ical.php?courseID=AJRz4eKuTIIY';
		}
		var courseId = 5;
        $.ajax({
			type:"POST",
			url: '/api/courses/' + courseId + '/tasks/import',
			data: {icalFeed : calendarId},
			//async:false,
		
			success: function(data1) {
			for (var d in data1){
				eventlist.push(
				{	title: data1[d].description,
					start: data1[d].start_date,
					allDay: false,
					completed: false
				});
			}
			var Color = "#44B8EA";
			if( courses.length == 1 ){
				Color = "#F77C36";
			}
			console.log("course populated");
			var n = 'Course ' + courses.length;
			var course = {
				color: Color,   
				textColor: 'black', 
				courseName: n,
				events : eventlist,
				id: courses.length,
				visible : true
			};	
			courseBeingLoaded = course;
			getCourseName(course);
			
		},
		error: function(){
			//inform user that the course failed to load
			alert("Course Failed to Load");
		}
	});
    }
    
    function getCourseName( course ){
		//inform user that course loaded successfully
		//prompt user to give a name for the course
		$('#loading').css("visibility", "hidden");
		$('#nameCourseDialog').css("visibility", "visible");
		$('#modalBackground').css("opacity", "0.5");
	};
    
    $('#nameCourseButton').click(function(){
		var name = $('#courseNameField').val();
		if( name == "" ) alert("Name cannot be empty");
		else{
			courseBeingLoaded.courseName = name;
			$('#courseNameField').val("");
			$('#nameCourseDialog').css("visibility", "hidden");
			$('#modalBackground').css("opacity", "0");
			addCourseToList(courseBeingLoaded);
			$('#calendar').fullCalendar('addEventSource', courseBeingLoaded);
			courses.push(courseBeingLoaded);
		}
	});
    
    function addCourseToList( course ){	
		var div = document.createElement("DIV");    
		var id = "course"+course.id;    
		div.id = id;
		div.title= course.id;
		div.className = "course";
		div.style.backgroundColor = course.color;
		div.style.paddingLeft = "5px";
		var t = document.createTextNode(course.courseName); 
		var box = document.createElement("INPUT");
		box.setAttribute("type", "checkbox");
		box.setAttribute("checked",true);
		box.id = "checkbox";
		box.style.float = "right";
		
		div.appendChild(t);
		div.appendChild(box);
		$('#loadedcourses').append(div);
	}
	
    $('#loadedcourses').click( function(event){
		
		console.log("clicked course "+event.target.title);
		if( event.target.type == 'checkbox' ){
		var id = parseInt(event.target.parentElement.title);
		var course = courses[id]; 
		if( course.visible ){
			$('#calendar').fullCalendar('removeEventSource',course);
			course.visible = false;
		}
		else{
			$('#calendar').fullCalendar('addEventSource',course);
			course.visible = true;
		}
	}
	 });
     
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		selectable: true,
		selectHelper: true,      
        eventSources:  [],
        eventClick: function(calEvent, jsEvent, view) {
			currentTask = calEvent;
			//call display task details
			displayTaskDetails(calEvent,jsEvent);
			// change the border color just for fun
			//$(this).css('border-color', 'red');

		}
    });
   
   function displayTaskDetails(calEvent, jsEvent){
	   $('#taskDetailsDialog').css("visibility","visible");
	   var str = '<h3 style="text-align:center">'+calEvent.source.courseName+'</h3>'; 
	   str+='<p>'+calEvent.title+'</p>';
	   $('#taskDetailsDiv').html( str );
	   var width = $('#taskDetailsDialog').css("width");
	   var height = $('#taskDetailsDialog').css("height");
	   
	   var taskX = jsEvent.pageX;
	   var taskY = jsEvent.pageY;
	   var w = parseInt(width);
	   var h = parseInt(height);
	   var w2 = w/2;
	   var left = taskX- parseInt(width)+parseInt(width)/2;
	   var top = taskY - parseInt(height)-10;
	   $('#taskDetailsDialog').css("top",top);
	   $('#taskDetailsDialog').css("left",left);
	   
	   //if completed, completed is deactivated, respectively the same for incomplete
	   if( calEvent.completed ){
		   $('#completionButton').removeClass("incomplete").addClass("complete");
		   $('#completionButton').html("Complete");
	   }
	   else{
		   $('#completionButton').removeClass("complete").addClass("incomplete");
		   $('#completionButton').html("Incomplete");
	   }
	   
   }
   
   $('#completionButton').click(function(){
	   currentTask.completed = !currentTask.completed;
	   if ( currentTask.completed ){
			currentTask.textColor= "green";
			currentTask.borderColor= "green";
			$('#completionButton').removeClass("incomplete").addClass("complete");
			$('#completionButton').html("Complete");
	   }
	   else{
		   currentTask.textColor= "black";
		   currentTask.borderColor= "";
		   $('#completionButton').removeClass("complete").addClass("incomplete");
		   $('#completionButton').html("Incomplete");
	   }
	   $('#calendar').fullCalendar('rerenderEvents');
   });
   
   
   $('#closeDetailsButton').click(function(){
		 $('#taskDetailsDialog').css("visibility","hidden");
   });
   
	$('#addbutton').click(function(){
		console.log("add");
		//ask if want to create a custom course or import an existing feed
		$('#addSongDialog').css("visibility", "visible");
		$('#modalBackground').css("opacity", "0.5");
		
		//var course = addCourse();
    });
    
    $('#importCourse').click(function(){
		$('#addSongDialog').css("visibility", "hidden");
		$('#loading').css("visibility", "visible");
		//display loading dialog
		var course = addCourse();
	});
	
	$('#closeAddSongButton').click(function(){
		$('#addSongDialog').css("visibility", "hidden");
		$('#modalBackground').css("opacity", "0");
	});
	
 
    
    

});

var controllers = controllers || angular.module('controllers', ['ui.calendar','ui.bootstrap']);

//angular.module('MyApp', ['ui.calendar', 'ui.bootstrap']);

controllers.controller('calendarCtrl', ['$scope','$compile','uiCalendarConfig', '$http', function ($scope, $compile, uiCalendarConfig, $http) {
	console.log('calendarCtrl loaded');

	var date = new Date();
    //var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    $scope.calendarId = 'https://learningsuite.byu.edu/iCalFeed/ical.php?courseID=HD832sKIIdzI';
	$scope.courses = [];
	
	$scope.getCalendar = function () {
		$scope.loadingFeed = true;
		var course = {
			color: '#f00',
			textcolor: "black",
			events: []
		};
		
		var courseId = 5;

		$http.post('/api/courses/' + courseId + '/tasks/import', {icalFeed : $scope.calendarId})
		.success(function(data, status, headers, config) {
			// this callback will be called asynchronously
			// when the response is available
			for (var d in data){
				//var task = {
				course.events.push({	title: data[d].description,
					start: new Date(data[d].start),
					//end: new Date(data[d].end),
					allDay: false});
				//};
				//course.events.push(task);
			}
			course.events.push({title: 'All Day Event',start: new Date(y, m, 1)});
			$scope.courses.push(course);
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
    
    //$scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com 
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };*/
    /* event source that contains custom events on the scope */
    $scope.events = [
      /*{title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}*/
    ];
    /* event source that calls a function on every view switch 
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [ 
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };*/
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     /*$scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    /*$scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    /*$scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    /*$scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    /*$scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
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
    };

    
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.courses];//, $scope.eventSource, $scope.eventsF];
    //$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}]);

var controllers = controllers || angular.module('controllers', []);


controllers.controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {
	console.log('homeCtrl loaded');
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
		$http.get('/api/courses/' + courseId + '/tasks/')
		.success(function(data, status, headers, config) {
			// this callback will be called asynchronously
			// when the response is available
			for (var d in data)
				$scope.events.push(data[d]);
			
			$scope.loadingFeed = false;
		})
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
