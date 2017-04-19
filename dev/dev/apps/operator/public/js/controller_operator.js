angular.module('shocola-operator', [])
	.controller('operator_login', function($scope, $http, $window) {
		$scope.login = function(){
        	$scope.user.login_password = Sha1.hash($scope.user.login_password);
        	$http.post('/operator/login', $scope.user).success(function(data){
            	COMMON.ERROR.clear();
        		COMMON.ERROR.add(data.message);
        		
            	if(parseInt(data.status, 10) == 0){
            		$scope.user = null;
            		COMMON.ERROR.showSuccess();
                    //setTimeout(function(){
                    window.location = data.data.redirect;
                        //window.location = '/service-request';
                   // }, COMMON.ERROR.delay);
            	}
                else{            		
            		COMMON.ERROR.show();
            		$scope.user.login_password = '';
            		
            	}
            	$('#hklogin').attr('disabled',false);
            }).error(function(data){
                //redirect to error page
            	
            });
        };
	});
