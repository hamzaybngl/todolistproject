$("#btn-todo-completed").on("click", function(){
		
		if(todoID == null){
			alert("Please Select a Row From The Table");
		}else{
			var request = $.ajax({
				url: "ToDoTransaction",
				method: "POST",
				data : {
					todoID: todoID,
					msg: "completed"
				},
				dataType: "html"
			});
		 
			request.done(function( msg ) {
				if(msg== "true"){
					swal("Info","Success", "success");
					setTimeout(function(){
						  location.reload();
						}, 2000);
				}else{
					swal("Info","Error", "error");
				}
			});
		 
			request.fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});	
		}
		
	});
	
	$("#btn-todo-notcompleted").on("click", function(){
		
		if(todoID == null){
			alert("Please Select a Row From The Table");
		}else{
			var request = $.ajax({
				url: "ToDoTransaction",
				method: "POST",
				data : {
					todoID: todoID,
					msg: "notcompleted"
				},
				dataType: "html"
			});
		 
			request.done(function( msg ) {
				if(msg== "true"){
					swal("Info","Success", "success");
					setTimeout(function(){
					  location.reload();
					}, 2000);
				}else{
					swal("Info","Error", "error");
				}
			});
		 
			request.fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});	
		}
		
	});
	
	$("#btn-todo-delete").on("click", function(){
		
		if(todoID == null){
			alert("Please Select a Row From The Table");
		}else{
			var request = $.ajax({
				url: "ToDoTransaction",
				method: "POST",
				data : {
					todoID: todoID,
					msg: "deleteToDo"
				},
				dataType: "html"
			});
		 
			request.done(function( msg ) {
				if(msg== "true"){
					swal("Info","Success", "success");
					setTimeout(function(){
					  location.reload();
					}, 2000);
				}else{
					swal("Info","Error", "error");
				}
			});
		 
			request.fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});	
		}
		
	});
	
	



	$(document).keypress(function(e) {
		if(e.which == 13) {
			NewToDo();
		}
	});
	
        
	$("#newtodo" ).click(function() {
		NewToDo();
	});
	function NewToDo(){
		var toDoName = $("#todoname").val();
		var toDoDeadline = $("#deadline").val();
		var todoExp = $("#todoExp").val();
			
		var request = $.ajax({
			url: "ToDoTransaction",
			method: "POST",
			data : {
				toDoName: toDoName,
				toDoDeadline: toDoDeadline,
				todoExp: todoExp,
				msg: "newToDo"
			},
			dataType: "html"
		});
	 
		request.done(function( msg ) {
			if(msg== "true"){
				swal("Info","Registration Successful", "success");
				setTimeout(function(){
				  location.reload();
				}, 2000);
			}else{
				swal("Info","Registration Failed", "error");
			}
		});
	 
		request.fail(function( jqXHR, textStatus ) {
			alert( "Request failed: " + textStatus );
		});	
	}
	function UpdateToDo(todoId){
		var toDoName = $("#todoname").val();
		var toDoDeadline = $("#deadline").val();
		var todoExp = $("#todoExp").val();
			
		var request = $.ajax({
			url: "ToDoTransaction",
			method: "POST",
			data : {
				toDoName: toDoName,
				toDoDeadline: toDoDeadline,
				todoExp: todoExp,
				todoId: todoId,
				msg: "updateToDo"
			},
			dataType: "html"
		});
	 
		request.done(function( msg ) {
			if(msg== "true"){
				swal("Info","Updated Successful", "success");
				setTimeout(function(){
				  location.reload();
				}, 2000);
			}else{
				swal("Info","Update Failed", "error");
			}
		});
	 
		request.fail(function( jqXHR, textStatus ) {
			alert( "Request failed: " + textStatus );
		});	
	}
    