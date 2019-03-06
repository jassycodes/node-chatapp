$(document).ready(function(){
// 	alert( "user-public.js!!!" );
//   alert( "testtt" );
  
//   var sum = 5 + 3;
// console.log(sum);
// alert(sum);



//   console.log("user-public.js");

//   alert( "test alert" );

	$("#status").append("status placeholder");

	// alert("hello");

// 	$.get( "/user/successget", function( data ) {
//   // $( ".result" ).html( data );
//   alert( "Load was performed." );
// });


    $.get('/user/successget', function(data) {
    	// alert(data);
    	$("#status").append(data);
    	console.log(data);
        // for (row = 0; row < data.length ; row++) {
        // 	console.log(data[row]);
        //         // a_message = messages[row][1]
        //         // console.log(a_message);
        //         // $("#messages").append(a_message + "<br>");
        // }
        // setTimeout(fetchall,1000);
    });

function fetchall(){
	$.ajax({
		type: "GET",
        url: '/user/getchats',
        data: $('#successget').serialize(),
        success: function(response) {
         	// $("#status").append("updated stats");
         	// console.log(response);
         	// $("#status").append(response);
         	$("#messages").empty();

	        for (row = 0; row < response.length ; row++) {
	        	console.log(response[row].sender_username);
	        	console.log(response[row].message);
	        	$("#messages").append("<b>" + response[row].sender_username + "</b>" + ": " + response[row].message + "<br>");
	        }
	        setTimeout(fetchall,1000);
        },
            error: function(error) {
                console.log(error);
        }
    });


       // for (row = 0; row < messages.length; row++) {
       //          a_message = messages[row][1]
       //          console.log(a_message);
       //          $("#messages").append(a_message + "<br>");
       //  }

    // alert('hi');
    // $("#status").append("status placeholder (1)");
    // setTimeout(fetchall,1000);
}

fetchall();


	// $("#success").click(function(e) {
	// 	e.preventDefault()

	// 	$.ajax({
	// 	  url: '/user/successget',
	// 	  data: 'string',
	// 	  success: function(response) {
	// 	  	alert("OK!");
	// 	  },
	// 	  dataType: 'string'
	// 	});
		// $.ajax({
		// 	type: "GET",
  //           url: '/user/successget',
  //           data: $('#successget').serialize(),
  //           success: function(response) {
  //           	$("#status").append("updated stats");
  //           	alert(response);
  //           },
  //           error: function(error) {
  //               console.log(error);
  //           }
  //   	});
 	// });





	// });

 	// $.get('/user/successget', function() {
  //       console.log('data');
  //       $("#status").append("status again");
  //   });

	// $.get({
	//   type: 'GET',
	//   url: "/successget",
	//   data: data,
	//   success: function (data) {
	//   	e.preventDefault();
	//     console.log("Success");
	//     $("#status").append("status again");
	//   },
	//   dataType: dataType
	// });

});

