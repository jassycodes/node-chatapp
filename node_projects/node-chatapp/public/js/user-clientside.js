$(document).ready(function(){

	$("#status").append("status placeholder");

		$.get('/user/successget', function(data) {
			$("#status").append(data);
			console.log(data);
		});

	var showMessages = true;

	function fetchall(){
		$.ajax({
			type: "GET",
					url: '/user/getchats',
					data: $('#successget').serialize(),
					success: function(response) {

						if(showMessages == true){
								$("#messages").empty();
								for (row = 0; row < response.length ; row++) {
									console.log(response[row].sender_username);
									console.log(response[row].message);
									$("#messages").append("<b>" + response[row].sender_username + "</b>" + ": " + response[row].message + "<br>");
								}
						}

						setTimeout(fetchall,1000);
					},
							error: function(error) {
									console.log(error);
					}
			});
	}

	fetchall();

	$("#clearMessages").click(function(e) {
			e.preventDefault();
			$("#messages").empty();
			showMessages = false;
	});

	$("#send").click(function(e) {
			e.preventDefault();
			showMessages = true;

			$.ajax({
			type: "POST",
					url: '/user/sendtochatbox',
					data: $('#chatform').serialize(),
					success: function(response) {
						// $("#messages").empty();
					},
							error: function(error) {
									console.log(error);
					}
			});
	});

	// getUsersList

	$("#getUsersList").click(function(e) {
			e.preventDefault();
			// alert("getUsersList");

			$.ajax({
			type: "GET",
					url: '/user/getuserlist',
					data: 'list',
					success: function(response) {
						// $("#messages").empty();
						// alert("#getUsersList Clicked");
						console.log(response);

						for (row = 0; row < response.length; row++) {
							console.log(response[row].username);
							if(row < response.length-1){
								$("#usersList").append(response[row].username + ", ");
							}
							else{
								$("#usersList").append(response[row].username);
							}
						}

					},
							error: function(error) {
									console.log(error);
					}
			});
	});

	$("#hideUsersList").click(function(e) {
			e.preventDefault();
			$("#usersList").empty();
	});


});

