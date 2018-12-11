<%@ include file = "header.jsp" %>
<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<%@page import="util.Tools"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.List"%>
<%@page import="org.hibernate.criterion.Restrictions"%>
<%@page import="entities.Todo"%>
<%@page import="org.hibernate.Criteria"%>
<%@page import="org.hibernate.Session"%>
<%@page import="entities.Users"%>
<%@page import="org.hibernate.cfg.Configuration"%>
<%@page import="org.hibernate.SessionFactory"%>
    <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="ISO-8859-1"%>

        <div class="wrapper">
            <div class="container">
                <div class="row">
					<div class="col-lg-4">
                        <div class="card-box">
                            <h4 class="header-title m-t-0 m-b-30">New To Do</h4>
						
                            <div>
                                <div class="form-group">
                                    <label>To Do Name</label>
                                    <input type="text" name="todoName"  required="" placeholder="Enter To Do Name" class="form-control" id="todoname" data-parsley-id="4">
                                </div>
                                <div class="form-group">
                                    <label>To Do Explanation</label>
                                	 <textarea class="form-control" id ="todoExp"  rows="5"></textarea>
                                </div>
                               	<div class="input-group">
                               		 <label>Deadline</label>
                                     <input type="text" class="form-control" placeholder="dd/mm/yyyy" id="deadline">
                                </div>

                                <div class="form-group text-right m-b-0">
                                    <button class="btn btn-primary waves-effect waves-light" id="newtodo" type="button">
                                        Save
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card-box">
                        	<h4 class="header-title m-t-0 m-b-30">To Do List</h4>
                       		<div class="col-md-12">
								<div class="row">
									<div class="col-md-10 col-sm-12" style="margin-bottom: 20px!important;" >
										<button type="button" id="btn-todo-completed"  	class="btn-todo-completed col-md-2 col-sm-2 col-xs-12 btn btn-success btn-xs btn-bordred waves-effect w-md waves-light m-b-5 "> Completed</button>
										<button type="button"  id="btn-todo-notcompleted"  	class="btn-todo-notcompleted col-md-2 col-sm-2 col-xs-12 btn btn-warning btn-xs btn-bordred waves-effect w-md waves-light m-b-5 "> Not Complete</button>
										<button type="button"  id="btn-todo-delete"  style='margin-left:10px;' 	class="btn-todo-delete col-md-2 col-sm-2 col-xs-12 btn btn-danger btn-xs btn-bordred waves-effect w-md waves-light m-b-5 "> Delete</button>
									</div>
								</div>
							</div>
							<div class="form-group clearfix col-md-4">
								<label class="col-sm-3 control-label">Status Filter</label>
								<div class="col-sm-8">
									<select class="form-control" id="status-filter">
										<option value="0">All</option>
										<option value="2">Completed</option>
										<option value="1">Not Complete</option>
									</select>
								</div>
							</div>
							<div class="form-group clearfix col-md-4">
								<label class="col-sm-3 control-label">Expire Filter</label>
								<div class="col-sm-8">
									<select class="form-control" id="expire-filter">
										<option value="0">All</option>
										<option value="1">Deadline</option>
									</select>
								</div>
							</div>
                            <div class="table table-responsive">
                                <table class="table table-bordered" id="todolist-datatable">
                                    <thead>
	                                    <tr>
	                                        <th>#</th>
	                                        <th class="hidden"></th>
	                                        <th>To Do Name</th>
	                                        <th>To Do Explanation</th>
	                                        <th>Create Date</th>
	                                        <th>Deadline</th>
	                                        <th>Status</th>
	                                    </tr>
                                    </thead>
                                    <tbody>
                                    <%
	                                    String filterStatus = request.getParameter("status");
                                    	String filterExpire = request.getParameter("expire");
                                   		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
                                   		
	                                  	int userId = Tools.getUserId(username);
	                                  	
                              			Criteria criteriaTodo = Tools.getTodo(userId);
                              			criteriaTodo.add(Restrictions.eq("todoUserFK", userId));
                              			if(filterStatus != null){
                              				if(filterStatus.equals("1") || filterStatus.equals("2")){
                                  				criteriaTodo.add(Restrictions.eq("todoStatus", Integer.parseInt(filterStatus)));
                                  			}
                              			}
                              			if(filterExpire != null && filterExpire.equals("1")){
                              			    Date date = new Date(); 
                                   			criteriaTodo.add(Restrictions.lt("todoDeadline", date));
                                   		}
                              			
                              			List todoResult = criteriaTodo.list();
                              			int i = 1;
                              			for(Object object : todoResult){
                              				Todo todo = (Todo)object;
                              				String status = "";
                              				if(todo.getTodoStatus() == 1){
                              					status = "Not Complate";
                              					out.print("<tr class='trhover' data-status='1'>"+
	                                                    "<td>"+i+"</td>"+
	                                                    "<td class='hidden'>"+todo.getTodoId()+"</td>"+
	                                                    "<td>"+todo.getTodoName()+"</td>"+
	                                                    "<td>"+todo.getTodoExp()+"</td>"+
	                                                    "<td>"+sdf.format(todo.getTodoCreatedAt())+"</td>"+
	                                                    "<td>"+sdf.format(todo.getTodoDeadline())+"</td>"+
	                                                    "<td data-id='not"+todo.getTodoId()+"'><span class='label label-warning'>"+status+"</span></td>"+
	                                                "</tr>");
                              				}else if(todo.getTodoStatus() == 2){
                              					status = "Complete";
                              					out.print("<tr class='trhover' data-status='2'>"+
	                                                    "<td>"+i+"</td>"+
	                                                    "<td class='hidden'></>"+todo.getTodoId()+"</td>"+
	                                                    "<td>"+todo.getTodoName()+"</td>"+
	                                                    "<td>"+todo.getTodoExp()+"</td>"+
	                                                    "<td>"+sdf.format(todo.getTodoCreatedAt())+"</td>"+
	                                                    "<td>"+sdf.format(todo.getTodoDeadline())+"</td>"+
	                                                    "<td data-id='done"+todo.getTodoId()+"'><span class='label label-success'>"+status+"</span></td>"+
	                                                "</tr>");
                              				}
                             				
                              				i++;
                              			}
                              			
                                    %>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    
		<script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>

		
		 <!-- Plugins Js -->
        <script type="text/javascript" src="assets/plugins/multiselect/js/jquery.multi-select.js"></script>
        <script type="text/javascript" src="assets/plugins/jquery-quicksearch/jquery.quicksearch.js"></script>
        <script src="assets/plugins/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js" type="text/javascript"></script>
        <script src="assets/plugins/bootstrap-inputmask/bootstrap-inputmask.min.js" type="text/javascript"></script>
     	<script src="assets/plugins/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
		
		
		<script src="assets/plugins/bootstrap-datepicker/dist/locales/bootstrap-datepicker.tr.min.js"></script>
		
		<!-- Editable js -->
	    <script src="assets/plugins/magnific-popup/dist/jquery.magnific-popup.min.js"></script>
	    <script src="assets/plugins/jquery-datatables-editable/jquery.dataTables.js"></script>
	    <script src="assets/plugins/datatables/dataTables.bootstrap.js"></script>
		<!-- Datatables-->
        <script src="assets/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="assets/plugins/datatables/dataTables.bootstrap.js"></script>
		
		<!-- Datatable init js -->
        <script src="assets/pages/datatables.init.js"></script>
		
		
		
		 <!-- Sweet Alert js -->
        <script src="assets/plugins/bootstrap-sweetalert/sweet-alert.min.js"></script>
        <script src="assets/pages/jquery.sweet-alert.init.js"></script>
        

   		 

    </body>
</html>

<script src="js/tododatatable.js"></script>
<script src="js/filter.js"></script>
<script src="js/todotransaction.js"></script>

<script type="text/javascript">

	jQuery('#deadline')
	.datepicker({
		autoclose: true,
		todayHighlight: true,
		format: 'dd/mm/yyyy',
		language: 'tr'
	});

	
	$('#logout').on("click", function(){
		var request = $.ajax({
			url: "login",
			method: "POST",
			data: {
				msg : "logout"
			},
			dataType: "html"
		});
		 
		request.done(function( msg ) {
			if(msg == "true"){
				window.location.href = "login.jsp";
				
			}
		});
	 
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
	});

    </script>