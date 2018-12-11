$(document).keypress(function(e) {
		if(e.which == 13) {
			register();
		}
	});
	
        
	$( "#register" ).click(function() {
		register();
		
	});
	
	function register(){
		var email = $("#email").val();
		var username = $("#username").val();
		var password = $("#password").val();
		
		if(username.length >= 3){
			if(password.length >= 3){
				var request = $.ajax({
					url: "login",
					method: "POST",
					data : {
						email: email,
						username: username,
						password: password,
						msg: "register"
					},
					dataType: "html"
				});
			 
				request.done(function( msg ) {
					var msgSplit = msg.split(":");
					if(msgSplit[0] == "true"){
						swal("Info",msgSplit[1], "success");
						setTimeout(function(){
							window.location.href = "login.jsp";
							}, 2000);
						
					}else{
						swal("Info",msgSplit[1], "error");
					}
				});
			 
				request.fail(function( jqXHR, textStatus ) {
					alert( "Request failed: " + textStatus );
				});	
			}else{
				swal("Info","Your password must have at least three characters", "error");
			}
		}else{
			swal("Info","Your username must have at least three characters", "error");
		}
			
		
	}