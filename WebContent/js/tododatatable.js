//To Do Datatable Js Code


var todoID;
var table = $('#todolist-datatable').DataTable( {
    "paging":   false,
    "ordering": false,
    "info":     false,
    "searching": true
} );
var todoStatus;

 $("#btn-todo-completed").hide();
 $("#btn-todo-notcompleted").hide();
 $("#btn-todo-delete").hide();
$('#todolist-datatable tbody').on('click', 'tr', function () {
	todoID = null;
	if ( $(this).hasClass('selected') ) {
		$(this).removeClass('selected');
	}
	else {
		table.$('tr.selected').removeClass('selected');
		$(this).addClass('selected');
		var data = table.row(this).data();
		if(data != null){
			todoID = data[1];
			todoStatus = this.attributes[1].value;
			
			$("#todoname").val(data[2]);
			$("#deadline").val(data[5]);
			$("#todoExp").val(data[3]);
			$("#newtodo").replaceWith("<button class='btn btn-warning waves-effect waves-light' id='update' onclick='UpdateToDo("+todoID+")'  type='button'>Update</button>");
			if(todoStatus == 1){
				 $("#btn-todo-completed").show();
				 $("#btn-todo-delete").show();
				 $("#btn-todo-notcompleted").hide();
			}else if(todoStatus == 2){
				 $("#btn-todo-completed").hide();
				 $("#btn-todo-delete").show();
				 $("#btn-todo-notcompleted").show();
			}
		}else{
			
		}
	}
} );