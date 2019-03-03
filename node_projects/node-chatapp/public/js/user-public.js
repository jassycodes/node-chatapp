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

	function fetchall(){
    $.get('/user/successget', function(data) {
    	alert(data);
    	$("#status").append(data);
        // setTimeout(fetchall,1000);
    });
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
	// 	// $.ajax({
	// 	// 	type: "GET",
 //  //           url: '/user/successget',
 //  //           data: $('#successget').serialize(),
 //  //           success: function(response) {
 //  //           	$("#status").append("updated stats");
 //  //           	alert(response);
 //  //           },
 //  //           error: function(error) {
 //  //               console.log(error);
 //  //           }
 //  //   	});
 // 	});





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

