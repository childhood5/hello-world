angular.module("sampleApp", []).controller("ajax_controller", function($scope, $http){
	
	$http.get("/api/invoices").then(function(response){
		
		$scope.information = response.data;
	});
	
});