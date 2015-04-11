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
		   //$('#complete').prop("disabled",true);
		   $('#complete').addClass("completeButtonDisabled");
		   //$('#incomplete').prop("disabled",false);
		   $('#incomplete').removeClass("incompleteButtonDisabled");
	   }
	   else{
		   //$('#complete').prop("disabled",false);
		   $('#complete').removeClass("completeButtonDisabled");
		   //$('#incomplete').prop("disabled",true);
		   $('#incomplete').addClass("incompleteButtonDisabled");
	   }
	   
   }
   
   $('#complete').click(function(){
	   currentTask.completed = true;
	   currentTask.textColor= "white";
	   currentTask.borderColor= "green";
	   $('#calendar').fullCalendar('rerenderEvents');
	   //$('#complete').prop("disabled",true);
	   $('#complete').addClass("completeButtonDisabled");
	   //$('#incomplete').prop("disabled",false);
	   $('#incomplete').removeClass("incompleteButtonDisabled");
   });
   
   $('#incomplete').click(function(){
	   currentTask.completed = false;
	   currentTask.textColor = "black";
	   currentTask.borderColor= "";
	   $('#calendar').fullCalendar('rerenderEvents');
	   //$('#complete').prop("disabled",false);
	   $('#complete').removeClass("completeButtonDisabled");
	   //$('#incomplete').prop("disabled",true);
	   $('#incomplete').addClass("incompleteButtonDisabled");
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
