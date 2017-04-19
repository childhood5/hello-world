angular.module('shocola-operator', [])
	.controller('GridViewController', function($scope, $http, $window) {
		$http.get('/operator/gridview/get/' + $('#jsgrid-page').val() + '/' +  $('#jsgrid-limit').val()).success(function(data){
			GRIDVIEW.render(data.columns, data.data, data.pagination, $('#jgrid'));
		});
	});
