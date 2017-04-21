angular.module("sampleApp", [])
.controller("ajax_controller", function($scope, $http){
	
	$http.get("/api/invoices").then(function(response){
		
		$scope.information = response.data;
	});
});


$('#create').on('click', function(){
	
	var customer_id = $('#customer_id').text();
	$('#id_form').attr('action', '/api/invoices/' + customer_id + '/items').submit();
	
});

