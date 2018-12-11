$(document).keypress(function(e) {
		if(e.which == 13) {
			login();
		}
	});
	
        
	$( "#login" ).click(function() {
		login();
		
	});
	
	function login(){
		var userName = $("#username").val();
		var password = $("#password").val();
			
		var request = $.ajax({
			url: "login",
			method: "POST",
			data : {
				username: userName,
				password: password,
				msg: "login"
			},
			dataType: "html"
		});
	 
		request.done(function( msg ) {
			var msgSplit = msg.split(":");
			if(msgSplit[0] == "true"){
				swal("Info",msgSplit[1], "success");
				setTimeout(function(){
					window.location.href = "index.jsp";
					}, 2000);
				
			}else{
				swal("Info",msgSplit[1], "error");
			}
		});
	 
		request.fail(function( jqXHR, textStatus ) {
			alert( "Request failed: " + textStatus );
		});	
	}