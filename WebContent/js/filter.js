//To Do Filter Js	

var url = new URL(window.location.href);
$("#status-filter").on("change", function(){
	var status = $(this).val();
	var expire = url.searchParams.get("expire");
	if(expire != null){
		window.location = window.location.pathname+"?status="+ status+"&expire="+expire;
	}else{
		window.location = window.location.pathname+"?status="+ status;	
	}
	
	
});


$("#expire-filter").on("change", function(){
	var expire = $(this).val();
	var status = url.searchParams.get("status");
	if(status != null){
		window.location = window.location.pathname+"?status="+ status+"&expire="+expire;	
	}else{
		window.location = window.location.pathname+"?expire="+expire;	
	}
	
	
});


var statusValue = url.searchParams.get("status");
var expireValue = url.searchParams.get("expire");
if(statusValue != null){
	$("#status-filter").val(statusValue);
}else{
	$("#status-filter").val("0");
}

if(expireValue != null){
	$("#expire-filter").val(expireValue);
}else{
	$("#expire-filter").val("0");
}
