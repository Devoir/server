$(document).ready(function() {

    // page is now ready, initialize the calendar...
	
	
			 function addCourse() {
				var eventlist = [];
				var calendarId = 'https://learningsuite.byu.edu/iCalFeed/ical.php?courseID=HD832sKIIdzI';
				var courseId = 5;
                 $.ajax({
					 type:"POST",
					url: '/api/courses/' + courseId + '/tasks/import',
					data: {icalFeed : calendarId},
					async:false,
				
					success: function(data1) {
					for (var d in data1){
					//var task = {
					eventlist.push({	title: data1[d].description,
					//start: new Date(data1[d].start),
					start: data1[d].start,
					//end: new Date(data[d].end),
					allDay: false});
					//};
					//course.push(task);}
					}
					console.log("course populated");
					//$('#calendar').fullCalendar('refetchEvents');
				}});
					
					
					var course = {
						color: 'yellow',   // an option!
						textColor: 'black', // an option!
						events : eventlist
					};
            
            return course;
        }
     
     
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        
        
        eventSources:  []   
    });
   
$('#addbutton').click(function(){
		console.log("add");
		//$('#calendar').fullCalendar('refetchEvents');
		var course = addCourse();
		$('#calendar').fullCalendar('addEventSource', course);
		console.log("after add");
    });
 
    
    

});
