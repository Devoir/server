$(document).ready(function() {

    // page is now ready, initialize the calendar...
	var courses= [];
	
	 function addCourse() {
		var eventlist = [];
		//hardcoded courses for now, only allowing 2 for now
		if( courses.length == 2)
			return;
		var calendarId = 'https://learningsuite.byu.edu/iCalFeed/ical.php?courseID=HD832sKIIdzI';
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
					allDay: false});
			}
			var Color = 'yellow';
			if( courses.length == 1 ){
				Color = 'orange';
			}
			console.log("course populated");
			var course = {
				color: Color,   
				textColor: 'black', 
				
				events : eventlist,
				id: courses.length,
				visible : true
			};	
			$('#calendar').fullCalendar('addEventSource', course);
			courses.push(course);
			addCourseToList(course);
			//var list = $('#calendar').fullCalendar('getEventList');
			//$('#calendar').fullCalendar('refetchEvents');
			
		}});
    }
    
    function addCourseToList( course ){
		//var obj = $('#loadedcoursed');
		//var str = $('#loadedcourses').innerHTML;
		var div = document.createElement("DIV");    
		var id = "course"+course.id;    
		div.id = id;
		div.title= course.id;
		div.className = "course";
		div.style.backgroundColor = course.color;
		var s = 'Course '+course.id;
		var t = document.createTextNode(s); 
		
		div.appendChild(t);
		//var s = '<div id="course'+course.id+'" style="background-color:'+course.color+'"> Course '+course.id+'</div><br>';
		//str += s;
		$('#loadedcourses').append(div);
	}
	
    $('#loadedcourses').click( function(event){
		
		//REMOVES A COURSE, NEEDS TO BE ABLE TO TOGGLE THE COURSE
		console.log("clicked course "+event.target.title);
		var id = parseInt(event.target.title);
		var course = courses[id]; 
		if( course.visible ){
			$('#calendar').fullCalendar('removeEventSource',course);
			course.visible = false;
		}
		else{
			$('#calendar').fullCalendar('addEventSource',course);
			course.visible = true;
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
		editable: true,
		
        
        eventSources:  []
        //getEventList: function (){ return eventSources;}
    });
   
	$('#addbutton').click(function(){
		console.log("add");
		//$('#calendar').fullCalendar('refetchEvents');
		var course = addCourse();
		
		console.log("after add");
    });
 
    
    

});
