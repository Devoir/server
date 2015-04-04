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
			//async:false,
		
			success: function(data1) {
			for (var d in data1){
				eventlist.push(
				{	title: data1[d].description,
					start: data1[d].start,
					allDay: false});
			}
			console.log("course populated");
			var course = {
				color: 'yellow',   // an option!
				textColor: 'black', // an option!
				events : eventlist
			};	
			$('#calendar').fullCalendar('addEventSource', course);
		}});
    }
     
     
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        
        
        eventSources:  []   
    });
   
	$('#addbutton').click(function(){
		console.log("add");
		//$('#calendar').fullCalendar('refetchEvents');
		var course = addCourse();
		
		console.log("after add");
    });
 
    
    

});
