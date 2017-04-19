sampleApp.controller("SampleController", function($scope){
	$scope.title = "TITLE";
	$scope.name = "MODULE";
});

sampleApp.controller("reset_data", function($scope){
	$scope.reset = function(){
		$scope.firstname="child";
		$scope.lastname="hood";
		$scope.email="foreverchildhood@gmail.com";
	}
});

sampleApp.controller("ajax_controller", function($scope, $http){
	
	$http.get("/nodejs/hello-world/angularJS/js/test.txt").then(function(response){
		
		$scope.information = response.data;
	});
	
});